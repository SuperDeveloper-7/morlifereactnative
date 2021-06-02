import * as firebase from 'firebase';
import * as axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import '@firebase/firestore';
import '@firebase/storage';
import '@firebase/functions';
import {
  getShortDateRange as getShortDatePrevRange,
  cannonicalDate,
  weekKey,
  monthKey,
  getShortDate,
} from '../util/date_util';
import { ACTIVITY_ADD } from '../constants/Routine';
import RoutineCompletion, {
  RoutineCompletionConverter,
} from '../model/RoutineCompletion';
import { isRoutineScheduled } from '../util/routine';

const FIREBASE_MAX_BATCH_SIZE = 10;

const routineFromDoc = (doc) => {
  const weekend =
    doc.data().start_time_config && doc.data().start_time_config.weekend;
  const obj = {
    id: doc.id,
    ...doc.data(),
    start_time: doc.data().start_time && doc.data().start_time.toDate(),
  };
  if (weekend) {
    obj.start_time_config = { weekend: weekend.toDate() };
  }
  return obj;
};

const newActivityLog = (uid, routineId, activityType) => ({
  user_id: uid,
  routine_id: routineId,
  // TODO: (marius): Fix UTC Time
  timestamp: new Date(),
  activity_type: activityType,
});

const addRoutineCompletedStats = async (uid, date, routineId, delta) => {
  const db = firebase.firestore();
  const year = moment(date).format('YYYY');
  const month = moment(date).format('M');
  const statsRef = db.doc(`users/${uid}/stats/${year}/monthly/${month}`);
  const increment = firebase.firestore.FieldValue.increment(delta);
  await statsRef.set(
    {
      routines_completed: increment,
      [`routines.${routineId}.completed`]: increment,
    },
    { merge: true }
  );
};

export const createActivityLog = async (objs) => {
  const db = firebase.firestore();
  const batch = db.batch();

  objs.forEach((obj) => {
    const ref = db.collection('activity_log').doc();
    batch.set(ref, obj);
  });
  return batch.commit();
};

export const incrementRoutineStats = async (routineIds, stat, delta) => {
  const db = firebase.firestore();
  let batch = db.batch();
  routineIds.forEach((routineId) =>
    db.doc(`public_routines_stats/${routineId}`).set({}, { merge: true })
  );
  await batch.commit();

  batch = db.batch();
  routineIds.forEach((routineId) =>
    db.doc(`public_routines_stats/${routineId}`).update({
      [stat]: firebase.firestore.FieldValue.increment(delta),
    })
  );
  return batch.commit();
};

export const createNewProfile = async (uid, email, displayName, photoURL) => {
  const db = firebase.firestore();
  const docRef = db.collection('users').doc(uid);
  return docRef.set({
    initialized: false,
    email,
    displayName,
    photoURL,
  });
};

export const loadUserProfile = async (uid) => {
  const db = firebase.firestore();
  const docRef = db.collection('users').doc(uid);
  const doc = await docRef.get();
  return doc.data();
};

export const onUserProfileChanged = (uid, onChange) => {
  const db = firebase.firestore();
  db.collection('users')
    .doc(uid)
    .onSnapshot((doc) => {
      const profile = doc.data();
      onChange(profile);
    });
};

export const verifyAndSetUsername = async (uid, username) => {
  const db = firebase.firestore();
  const querySnapshot = await db
    .collection('users')
    .where('username', '==', username)
    .get();
  if (!querySnapshot.empty) {
    let valid = true;
    querySnapshot.forEach((doc) => {
      if (doc.id !== uid) {
        valid = false;
      }
    });
    if (!valid) {
      return { error: 'username already exists' };
    }
  }
  return db
    .doc(`users/${uid}`)
    .set({ username }, { merge: true })
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: 'unknown error' };
    });
};

export const setFullName = async (uid, firstName, lastName) => {
  const db = firebase.firestore();
  return db
    .doc(`users/${uid}`)
    .set({ firstName, lastName }, { merge: true })
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: 'unknown error' };
    });
};

export const setProfilePhoto = async (uid, photoURL) => {
  const db = firebase.firestore();
  return db
    .doc(`users/${uid}`)
    .set({ photoURL }, { merge: true })
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: 'unknown error' };
    });
};

export const setZipCode = async (uid, zipCode) => {
  const db = firebase.firestore();
  return db.doc(`users/${uid}`).set({ zipCode }, { merge: true });
};

export const loadCategories = async () => {
  const db = firebase.firestore();
  const querySnapshot = await db.collection('categories').get();
  const categories = {};
  querySnapshot.forEach((doc) => {
    const category = doc.data();
    category.id = doc.id;
    categories[doc.id] = category;
  });
  return categories;
};

export const loadCategoryPublicRoutines = async (categoryId) => {
  const db = firebase.firestore();
  const querySnapshot = await db
    .collection('public_routines_all')
    .where('category_id', '==', categoryId)
    .get();
  const routines = {};
  querySnapshot.forEach((doc) => {
    const category = doc.data();
    category.id = doc.id;
    routines[doc.id] = category;
  });
  return routines;
};

export const loadInitialSetup = async () => {
  const db = firebase.firestore();
  const initialSetup = await db
    .collection('public_routines_trending')
    .doc('initial_setup')
    .get();
  return initialSetup.data();
};

export const loadRoutinesFeed = async () => {
  const db = firebase.firestore();
  const feed = await db
    .collection('public_routines_trending')
    .doc('feed')
    .get();
  return feed.data();
};

const loadPublicRoutinesBatch = async (routineIds) => {
  const db = firebase.firestore();
  const querySnapshot = await db
    .collection('public_routines_all')
    .where(firebase.firestore.FieldPath.documentId(), 'in', routineIds)
    .get();
  const routines = {};
  querySnapshot.forEach((doc) => {
    const routineData = doc.data();
    routines[doc.id] = {
      id: doc.id,
      ...routineData,
      // TODO: (marius): Create routine converter
      start_time: routineData.start_time && routineData.start_time.toDate(),
    };
  });
  return routines;
};

export const loadDocumentsBatched = async (docIds, loadBatch) => {
  const results = [];
  const batches = _.chunk(docIds, FIREBASE_MAX_BATCH_SIZE).filter(
    (e) => e && e.length
  );
  for (let batchIdx = 0; batchIdx < batches.length; batchIdx += 1) {
    const batch = batches[batchIdx];
    results.push(loadBatch(batch));
  }
  const docs = await Promise.all(results);
  return docs.reduce((a, c) => ({ ...a, ...c }), {});
};

export const loadPublicRoutines = async (routineIds) =>
  loadDocumentsBatched(routineIds, loadPublicRoutinesBatch);

const loadPublicRoutinesStatsBatch = async (routineIds) => {
  const db = firebase.firestore();
  const querySnapshot = await db
    .collection('public_routines_stats')
    .where(firebase.firestore.FieldPath.documentId(), 'in', routineIds)
    .get();
  const routines = {};
  querySnapshot.forEach((doc) => {
    routines[doc.id] = routineFromDoc(doc);
  });
  return routines;
};

export const loadPublicRoutineStats = async (routineIds) =>
  loadPublicRoutinesStatsBatch(routineIds, loadPublicRoutinesBatch);

const loadRoutinesContentBatch = async (uid, routineIds) => {
  if (!routineIds || !routineIds.length) {
    return {};
  }
  const db = firebase.firestore();
  const querySnapshot = await db
    .collection('public_routines_content')
    .where(firebase.firestore.FieldPath.documentId(), 'in', routineIds)
    .get();
  const routineContent = {};
  querySnapshot.forEach((doc) => {
    const content = doc.data();
    if (!content) {
      return;
    }
    routineContent[doc.id] = content;
  });
  return routineContent;
};

export const loadRoutinesContent = async (uid, routineIds, currentDate) => {
  const results = [];
  const batches = _.chunk(routineIds, FIREBASE_MAX_BATCH_SIZE).filter(
    (e) => e && e.length
  );
  for (let batchIdx = 0; batchIdx < batches.length; batchIdx += 1) {
    const batch = batches[batchIdx];
    results.push(loadRoutinesContentBatch(uid, batch, currentDate));
  }
  const content = await Promise.all(results);
  return content.reduce((a, c) => ({ ...a, ...c }), {});
};

const loadRoutinesBatch = async (uid, routineIds, all) => {
  const db = firebase.firestore();
  let query = db
    .collection('users')
    .doc(uid)
    .collection('routines')
    .where('is_deleted', '==', false);
  if (!all) {
    query = query.where(
      firebase.firestore.FieldPath.documentId(),
      'in',
      routineIds
    );
  }
  const routines = {};
  const querySnapshot = await query.get();
  querySnapshot.forEach((doc) => {
    routines[doc.id] = routineFromDoc(doc);
  });
  return routines;
};

export const loadAllRoutines = async (uid) => {
  return loadRoutinesBatch(uid, [], true);
};

const loadRoutinesByDate = async (uid, startDate) => {
  const start = cannonicalDate(startDate).endOf('day').toDate();
  const db = firebase.firestore();

  const routines = {};
  const queryDeletedLater = await db
    .collection(`users/${uid}/routines`)
    .where('deleted_at', '>', start)
    .get();
  queryDeletedLater.forEach((doc) => {
    routines[doc.id] = routineFromDoc(doc);
  });

  const queryNotDeleted = await db
    .collection('users')
    .doc(uid)
    .collection('routines')
    .where('is_deleted', '==', false)
    .get();
  queryNotDeleted.forEach((doc) => {
    routines[doc.id] = routineFromDoc(doc);
  });
  return routines;
};

export const loadRoutinesForDay = async (uid, currentDate) => {
  return loadRoutinesByDate(uid, currentDate, currentDate);
};

export const addRoutines = async (uid, routines) => {
  const db = firebase.firestore();
  const batch = db.batch();
  const routineIds = [];
  routines.forEach((routine) => {
    const newRoutineRef = db
      .collection('users')
      .doc(uid)
      .collection('routines')
      .doc();
    batch.set(newRoutineRef, routine);
    routineIds.push(newRoutineRef.id);
  });
  return batch.commit().then(() => {
    const publicIds = routines
      .map((routine) => routine.public_id)
      .filter((id) => !!id);
    const objs = publicIds.map((id) => newActivityLog(uid, id, ACTIVITY_ADD));
    setTimeout(() => {
      createActivityLog(objs);
      incrementRoutineStats(publicIds, 'added', 1);
    });
    return routineIds;
  });
};

export const completeUserSetup = async (uid) => {
  const db = firebase.firestore();
  return db
    .collection('users')
    .doc(uid)
    .set({ initialized: true }, { merge: true });
};

export const scheduleRoutines = async (routineIds) => {
  const functions = firebase.functions();
  const scheduleRoutinesCall = functions.httpsCallable('scheduleRoutines');
  const currentDate = new Date().toISOString();
  return scheduleRoutinesCall({ currentDate, routineIds });
};

export const descheduleRoutines = async (routineIds) => {
  const functions = firebase.functions();
  const descheduleRoutinesCall = functions.httpsCallable('descheduleRoutines');
  const currentDate = new Date().toISOString();
  return descheduleRoutinesCall({ currentDate, routineIds });
};

export const deleteRoutine = async (uid, routineId, timestamp) => {
  const db = firebase.firestore();
  return db.doc(`users/${uid}/routines/${routineId}`).set(
    {
      is_deleted: true,
      deleted_at: cannonicalDate(timestamp).toDate(),
    },
    {
      merge: true,
    }
  );
};

export const saveRoutine = async (uid, routineId, routine) => {
  const db = firebase.firestore();
  return db.doc(`users/${uid}/routines/${routineId}`).set(routine, {
    merge: true,
  });
};

const GetCustomRepeatPeriod = (date, type) => {
  if (type === 'custom_week') {
    return weekKey(date);
  }
  if (type === 'custom_month') {
    return monthKey(date);
  }
  return null;
};
export const addRoutineCompletion = async (uid, routine, date, createdAt) => {
  const db = firebase.firestore();
  const doc = await db
    .collection(`users/${uid}/routine_completions`)
    .withConverter(RoutineCompletionConverter)
    .add(
      new RoutineCompletion(
        routine.id,
        date,
        createdAt,
        null,
        routine.c_repeat_type,
        GetCustomRepeatPeriod(date, routine.c_repeat_type)
      )
    );
  await addRoutineCompletedStats(uid, date, routine.id, 1);
  return doc.id;
};

export const removeRoutineCompletions = async (
  uid,
  routine,
  routineCompletions
) => {
  const db = firebase.firestore();
  const batch = db.batch();
  routineCompletions.forEach((completion) =>
    batch.delete(db.doc(`users/${uid}/routine_completions/${completion.id}`))
  );
  await batch.commit();
  return addRoutineCompletedStats(
    uid,
    new Date(),
    routine.id,
    routineCompletions.length
  );
};

const getRoutineCompletionsForWeekAndMonth = async (uid, currentDate) => {
  const db = firebase.firestore();

  const CurrentWeekKey = weekKey(currentDate);
  const weeklyCompletions = [];
  const weeklyQuery = await db
    .collection(`users/${uid}/routine_completions`)
    .where('c_repeat_type', '==', 'custom_week')
    .where('c_repeat_time_period', '==', CurrentWeekKey)
    .withConverter(RoutineCompletionConverter)
    .get();
  weeklyQuery.forEach((doc) => weeklyCompletions.push(doc.data()));

  const CurrentMonthKey = monthKey(currentDate);
  const monthlyCompletions = [];
  const monthlyQuery = await db
    .collection(`users/${uid}/routine_completions`)
    .where('c_repeat_type', '==', 'custom_month')
    .where('c_repeat_time_period', '==', CurrentMonthKey)
    .withConverter(RoutineCompletionConverter)
    .get();
  monthlyQuery.forEach((doc) => monthlyCompletions.push(doc.data()));

  return {
    [CurrentWeekKey]: weeklyCompletions,
    [CurrentMonthKey]: monthlyCompletions,
  };
};

export const getRoutineCompletionsForDay = async (uid, currentDate) => {
  const db = firebase.firestore();
  const start = cannonicalDate(currentDate).startOf('day').toDate();
  const end = cannonicalDate(currentDate).endOf('day').toDate();
  const query = await db
    .collection(`users/${uid}/routine_completions`)
    .where('date', '>=', start)
    .where('date', '<=', end)
    .withConverter(RoutineCompletionConverter)
    .get();
  const dayCompletions = [];
  query.forEach((doc) => dayCompletions.push(doc.data()));
  const weekandmonth = await getRoutineCompletionsForWeekAndMonth(
    uid,
    currentDate
  );
  return {
    ...weekandmonth,
    ...{ [getShortDate(currentDate)]: dayCompletions },
  };
};

export const getActivityFeed = async (startDate, count) => {
  const db = firebase.firestore();
  const dateKeys = getShortDatePrevRange(startDate, count);

  const query = db
    .collection('activity_feed')
    .where(firebase.firestore.FieldPath.documentId(), 'in', dateKeys);
  const feedItems = {};
  const querySnapshot = await query.get();
  querySnapshot.forEach((doc) => {
    feedItems[doc.id] = doc.data();
  });
  return feedItems;
};

export const initRoutinesStats = async (uid) => {
  const db = firebase.firestore();
  const batch = db.batch();
  for (let year = 2021; year < 2023; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      const statsRef = db.doc(`users/${uid}/stats/${year}/monthly/${month}`);
      batch.set(statsRef, {}, { merge: true });
    }
  }
  return batch.commit();
};

export const addRoutinesScheduledStats = async (uid, date, routines, delta) => {
  const year = moment(date).format('YYYY');
  const end = moment(date).endOf('year').toDate();

  let loopDate = date;
  const stats = {};
  while (loopDate <= end) {
    const month = moment(loopDate).format('M');
    // eslint-disable-next-line no-loop-func
    routines.forEach((routine) => {
      if (isRoutineScheduled(routine, loopDate)) {
        if (!stats[month]) {
          stats[month] = { total: 0, routines: {} };
        }
        stats[month].total += delta;
        stats[month].routines[routine.id] =
          stats[month].routines[routine.id] + delta || delta;
      }
    });
    loopDate = moment(loopDate).add(1, 'days');
  }
  const db = firebase.firestore();
  const batch = db.batch();

  Object.entries(stats).forEach(([month, monthStats]) => {
    const data = {
      routines_scheduled: firebase.firestore.FieldValue.increment(
        monthStats.total
      ),
      routines: {},
    };
    Object.entries(monthStats.routines).forEach(([routineId, routineVal]) => {
      data.routines[routineId] = {
        scheduled: firebase.firestore.FieldValue.increment(routineVal),
      };
    });
    const statsRef = db.doc(`users/${uid}/stats/${year}/monthly/${month}`);
    batch.set(statsRef, data, { merge: true });
  });
  return batch.commit();
};

export const getDailies = async (uid, idMove) => {
  try {
    await axios.post(
      'https://us-central1-dash-91d7d.cloudfunctions.net/completeMove',
      {
        move_id: idMove,
        user_id: uid,
      }
    );
  } catch (er) {
  } finally {
    const db = firebase.firestore();
    const dailyRef = db
      .collection('users')
      .doc(uid)
      .collection('routines')
      .doc(idMove)
      .collection('dailys');
    const firstTenDailys = await dailyRef.orderBy('added_time').limit(10).get();
    const dailiesReturn = [];
    if (firstTenDailys.empty) {
      return [];
    }
    firstTenDailys.forEach((doc) => {
      dailiesReturn.push(doc.data());
    });
    return dailiesReturn;
  }
};
