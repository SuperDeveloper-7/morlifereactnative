import moment from 'moment';
import _ from 'lodash';
import { cannonicalDate } from './date_util';

export const routineIsValidDateRange = (routine, startDate, endDate) => {
  const startCannon = cannonicalDate(startDate);
  const endCannon = cannonicalDate(endDate);
  const start = startCannon.endOf('day').toDate();
  const end = endCannon.endOf('day').toDate();

  // console.log('check', routine.name, routine.created_at && routine.created_at.toDate(), routine.deleted_at && routine.deleted_at.toDate())

  // TODO: (marius): We are translating these to UTC times. This might be inaccurate if the user
  // has created a routine in a different timezone than where we are currently in.
  const deletedAt = routine.deleted_at && moment(routine.deleted_at.toDate()).utc(true).toDate();
  const createdAt = routine.created_at && moment(routine.created_at.toDate()).utc(true).toDate();

  return (!deletedAt || deletedAt > start) && (!createdAt || createdAt <= end);
};

export const routinesByRank = (a, b) => {
  return _.get(a, 'rank', 1) - _.get(b, 'rank', 1);
};

export const isRoutineScheduled = (routine, currentDate) => {
  const type = routine.repeat_type;
  if (type === 'repeat_day') {
    return true;
  }
  if (type === 'repeat_weekly') {
    const daySet = new Set(routine.w_repeat_day_of_week || []);
    const dayOfWeek = moment(currentDate).isoWeekday();
    return daySet.has(dayOfWeek);
  }
  if (type === 'repeat_custom') {
    return true;
  }
  // TODO: (marius): implemetn rest
  return false;
};

export const dedupePublicRoutines = (routines) => {
  const publicRoutinesMap = {};
  routines.forEach((routine, i) => {
    const publicId = routine.public_id;
    publicRoutinesMap[publicId] = i;
  });
  const dedupedRoutines = [];
  routines.forEach((routine, i) => {
    const publicId = routine.public_id;
    if (!publicId || publicRoutinesMap[publicId] === i) {
      dedupedRoutines.push(routine);
    }
  });
  return dedupedRoutines;
};
