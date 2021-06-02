import React, { useRef, useState } from 'react';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import Proptypes from 'prop-types';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import MorIcon from '../components/shapes/MorIcon';

import {
  styles,
  marginToHide,
  lineColor,
  refreshColor,
  refreshSIZE,
} from '../styles/screens/DayView';
import Colors from '../constants/Colors';

import {
  getRoutineCompletionsForDay,
  loadRoutinesContent,
  loadRoutinesForDay,
  addRoutineCompletion,
  removeRoutineCompletions,
  getDailies,
} from '../api/firebase';
import { setDailies, setRoutines, setRoutinesContent } from '../store/routines/actions';
import {
  addDayScheduleCompletion,
  resetDayScheduleCompletion,
  setDayScheduleCompletions,
  setDayScheduleScheduled,
} from '../store/schedule/actions';
import { RoutineItem, LastMenuItem, MenuItem } from '../components/RoutineItem';
import '@firebase/firestore';
import {
  getShortDate,
  isPastDay,
  strTime,
  fromCannonicalDate,
  cannonicalDate,
  weekKey,
  monthKey,
} from '../util/date_util';
import NavigationButton from '../components/NavigationButton';

import ContentManager from '../components/ContentManager';
import SwipeListViewWithMenu from '../components/SwipeListViewWithMenu';
import { routineIsValidDateRange, routinesByRank, isRoutineScheduled } from '../util/routine';
import RoutineCompletion from '../model/RoutineCompletion';
import RoutineManager from '../model/RoutineManager';
import { timeKeys } from '../constants/HardcodedTexts';
import { setLoading } from '../store/loading/actions';
import ModalDaily from '../components/daily/ModalDaily';

const routineIdWakeup = 'cat-wakeup';
const routineIdBedtime = 'cat-bedtime';
const wakeupBedtimeRoutines = [routineIdWakeup, routineIdBedtime];

const EmptyState = ({ date, onPressReset }) => (
  <View style={styles.container}>
    <View style={styles.empty}>
      <Text style={styles.emptyHeading}>
        There wasn&apos;t anything on your calendar on{' '}
        {date.toLocaleDateString('en', { month: 'long', day: 'numeric' })}
      </Text>
      <NavigationButton text="JUMP TO TODAY" style={styles.emptyButton} onPress={onPressReset} />
    </View>
  </View>
);

EmptyState.propTypes = {
  date: Proptypes.instanceOf(Date).isRequired,
  onPressReset: Proptypes.func.isRequired,
};
export default function DayView({
  navigation,
  currentDate,
  onDateReset,
  onDiscardModal,
  handleAlertBox,
}) {
  const shortDate = getShortDate(currentDate);
  const shortWeekDate = weekKey(currentDate);
  const shortMonthDate = monthKey(currentDate);
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.routines.categories);
  const routines = useSelector((state) => state.routines.routines);
  const daySchedule = useSelector((state) => state.schedule.daySchedule);
  const publicRoutines = useSelector((state) => state.routines.publicRoutines);
  let publicIdMap = Object.values(routines)
    .filter((r) => !r.is_deleted)
    .map((r) => r.public_id);
  const dispatch = useDispatch();
  const routineManager = new RoutineManager(user.uid, dispatch);
  const [suggested, setSuggested] = useState([]);
  const [modalRoutine, setModalRoutine] = useState();
  const isWakeupOrBedtime = (routine) => wakeupBedtimeRoutines.indexOf(routine.category_id) !== -1;
  const modalDaily = useRef();

  React.useEffect(() => {
    publicIdMap = Object.values(routines)
      .filter((r) => !r.is_deleted)
      .map((r) => r.public_id);
    setSuggested(
      Object.keys(publicRoutines)
        .map((routineId) => publicRoutines[routineId])
        .filter((r) => publicIdMap.indexOf(r.id) === -1 && !isWakeupOrBedtime(r))
        .slice(0, 3)
    );
  }, [routines]);
  function getDateKey(routine) {
    if (routine.repeat_type === 'repeat_custom') {
      if (routine.c_repeat_type === 'custom_week') {
        return shortWeekDate;
      }
      if (routine.c_repeat_type === 'custom_month') {
        return shortMonthDate;
      }
    }
    return shortDate;
  }

  React.useEffect(() => {
    if (!currentDate) {
      return;
    }
    const initAsync = async (loadDate) => {
      const initRoutines = await loadRoutinesForDay(user.uid, loadDate);
      dispatch(setRoutines(initRoutines));
      const completions = await getRoutineCompletionsForDay(user.uid, loadDate);
      dispatch(setDayScheduleCompletions(completions));
      const publicRoutineIds = Object.values(initRoutines)
        .map((r) => r.public_id)
        .filter((id) => id);
      const routinesContent = await loadRoutinesContent(user.uid, publicRoutineIds, loadDate);
      dispatch(setRoutinesContent(routinesContent));
      return ContentManager.preload(routinesContent);
    };
    initAsync(currentDate);
  }, [currentDate]);

  React.useEffect(() => {
    const currentDayRoutines = Object.values(routines || {}).filter((routine) =>
      routineIsValidDateRange(routine, currentDate, currentDate)
    );
    const schedualedRoutiesFLAT = {};
    const scheduledRoutines = currentDayRoutines.reduce((sc, routine) => {
      if (!isRoutineScheduled(routine, currentDate)) {
        return sc;
      }
      schedualedRoutiesFLAT[routine.id] = true;
      const dkey = getDateKey(routine);
      return {
        ...sc,
        [dkey]: {
          ...sc[dkey],
          ...{ [routine.id]: true },
        },
      };
    }, {});

    dispatch(setDayScheduleScheduled(scheduledRoutines));
  }, [routines]);

  let currentDaySchedule = daySchedule[shortDate] || {};
  React.useEffect(() => {
    currentDaySchedule = daySchedule[shortDate] || {};
  }, [daySchedule]);

  if (currentDaySchedule.isEmpty) {
    return <EmptyState date={currentDate} onPressReset={onDateReset} />;
  }

  const weeksSchedule = Object.keys(
    (daySchedule[shortWeekDate] ? daySchedule[shortWeekDate].scheduled : {}) || {}
  ).map((ri) => routines[ri]);
  const monthSchedule = Object.keys(
    (daySchedule[shortMonthDate] ? daySchedule[shortMonthDate].scheduled : {}) || {}
  ).map((ri) => routines[ri]);
  const daysSchedule = Object.keys(
    (currentDaySchedule ? currentDaySchedule.scheduled : {}) || {}
  ).map((routineId) => routines[routineId]);
  const scheduledRoutines = daysSchedule
    .concat(monthSchedule)
    .concat(weeksSchedule)
    .filter((e) => e)
    .sort(routinesByRank);
  const completedRoutines = currentDaySchedule.completed || {};
  const completedWeekRoutines =
    (daySchedule[shortWeekDate] ? daySchedule[shortWeekDate].completed : {}) || {};
  const completedMonthRoutines =
    (daySchedule[shortMonthDate] ? daySchedule[shortMonthDate].completed : {}) || {};

  function getCompletedCount(routine) {
    if (routine.repeat_type === 'repeat_custom') {
      if (routine.c_repeat_type === 'custom_week') {
        return completedWeekRoutines[routine.id];
      }
      if (routine.c_repeat_type === 'custom_month') {
        return completedMonthRoutines[routine.id];
      }
    }
    return completedRoutines[routine.id];
  }
  const removedCompletedRoutineIds = [];
  Object.keys(completedRoutines).forEach((id) => {
    if (!currentDaySchedule.scheduled[id] || !routines[id]) {
      removedCompletedRoutineIds.push(id);
    }
  });
  removedCompletedRoutineIds.forEach((id) => delete completedRoutines[id]);

  const handleAddCompletion = async (routine) => {
    ContentManager.deliver(routine.public_id);
    const timestamp = new Date();
    const completionId = await addRoutineCompletion(user.uid, routine, currentDate, timestamp);
    dispatch(
      addDayScheduleCompletion(
        getDateKey(routine),
        routine.id,
        new RoutineCompletion(
          routine.id,
          currentDate,
          timestamp,
          completionId,
          routine.c_repeat_type,
          routine.c_repeat_time_period
        )
      )
    );
  };

  const handleResetCompletion = (routine) => {
    removeRoutineCompletions(user.uid, routine, getCompletedCount(routine));
    dispatch(resetDayScheduleCompletion(getDateKey(routine), routine.id));
  };

  const handleRemoveRoutine = async (routine) => {
    if (isPastDay(currentDate)) {
      Alert.alert('Remove', 'Cannot remove routines from the past!');
      return;
    }
    const removeFn = async () => {
      if (handleAlertBox) {
        const category = categories[routine.category_id];
        handleAlertBox(category, routine);
      } else {
        return routineManager.removeRoutine(routine);
      }
    };
    Alert.alert(
      'Remove',
      'All future instances of this routine will be removed from your calendar',
      [{ text: 'Cancel' }, { text: 'Remove', style: 'destructive', onPress: removeFn }]
    );
  };

  const handleNavigateToEdit = (routine) => {
    if (isWakeupOrBedtime(routine)) {
      navigation.push('SetTimes', {
        routineId: routine.public_id,
        routineName: routine.name,
        routineCategoryId: routine.category_id,
        routineStartTime: strTime(routine.start_time),
        routineStartTimeWeekend: strTime(_.get(routine, 'start_time_config.weekend')),
        saveRoutineId: routine.id,
      });
    } else {
      navigation.push('EditRoutine', { routineId: routine.id });
    }
  };
  const handleLongPress = (routine, action) => {
    if (onDiscardModal) {
      onDiscardModal(routine);
    }
    action(routine);
  };

  const openDaily = async (routine) => {
    setModalRoutine(routine);
    dispatch(setLoading(true));
    try {
      const dailies = await getDailies(user.uid, routine.id);
      dispatch(setDailies(dailies));
      dispatch(setLoading(false));
      modalDaily.current.onOpen();
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  const renderRoutine = (routine) => {
    const category = categories[routine.category_id];
    if (!category) {
      return null;
    }
    const setupNeeded = !routine.start_time && isWakeupOrBedtime(routine);
    const setupClick = () => {
      handleNavigateToEdit(routine);
    };
    const completedCount = (getCompletedCount(routine) || []).length;
    const isCompleted = completedCount >= routine.checkin_count;
    const action = isCompleted ? handleResetCompletion : handleAddCompletion;
    const shortPressAction = isCompleted ? openDaily : handleAddCompletion;
    let desc = category.name;
    if (routine.start_time) {
      desc = cannonicalDate(routine.start_time).format('h:mm a');
    }
    let progressPercent = 0;
    if (routine.checkin_count > 1) {
      progressPercent = Math.round((completedCount / routine.checkin_count) * 100);
    }
    let repeatType = routine.repeat_type;
    if (isWakeupOrBedtime(routine)) {
      const dayNumber = moment(currentDate).utc(true).day();
      const isWeekday = dayNumber > 0 && dayNumber < 6;
      const repeatTypeKey = fromCannonicalDate(
        isWeekday || !routine.start_time_config
          ? routine.start_time
          : routine.start_time_config.weekend
      ).format('HH:mm');
      repeatType = timeKeys[repeatTypeKey];
    }

    let repeatTypeText =
      routine.repeat_type === 'repeat_custom' ? routine.c_repeat_type : repeatType;
    let repeatEvery = routine.checkin_count;
    let dotColor = isCompleted ? category.colors.dark : category.colors.highContrast;
    if (setupNeeded) {
      repeatTypeText = 'Tap to add to your calendar';
      dotColor = category.colors.mutedMid;
      repeatEvery = '';
    }
    const Routine = () => (
      <RoutineItem
        key={routine.id}
        name={routine.name}
        desc={desc}
        icon={category.icon_name}
        color={category.colors.light}
        dotColor={dotColor}
        progressColor={isCompleted ? 'transparent' : category.colors.highContrast}
        progressPercent={progressPercent}
        decoration={isCompleted ? 'completed' : null}
        style={styles.routineListItem}
        repeatType={repeatTypeText}
        repeatEvery={repeatEvery}
        onDotPress={() => shortPressAction(routine)}
        onLongPress={() => handleLongPress(routine, action)}
      />
    );
    if (setupNeeded) {
      return <TouchableOpacity onPress={() => setupClick()}>{Routine()}</TouchableOpacity>;
    }
    return Routine();
  };

  const renderMenu = (routine, row) => (
    <View style={styles.renderMenu}>
      <MenuItem
        color={Colors.lightCharcoal}
        onPress={() => {
          handleNavigateToEdit(routine);
          row.closeRow();
        }}
      />
      <LastMenuItem
        color={Colors.red}
        onPress={() => handleRemoveRoutine(routine)}
        disabled={isWakeupOrBedtime(routine)}
      />
    </View>
  );

  const handleAction = (routine) => {
    dispatch(setLoading(true));
    setTimeout(async () => {
      navigation.push('RoutineAdder', { selectedRoutine: routine });
      dispatch(setLoading(false));
    }, 0);
  };
  const updateSuggested = () => {
    setSuggested(
      Object.keys(publicRoutines)
        .map((routineId) => publicRoutines[routineId])
        .filter(
          (r) =>
            publicIdMap.indexOf(r.id) === -1 && suggested.filter((s) => s.id === r.id).length === 0
        )
        .slice(0, 3)
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <SwipeListViewWithMenu
            items={scheduledRoutines.map((r) => ({ ...r, key: r.id }))}
            renderItem={renderRoutine}
            renderMenu={renderMenu}
            marginToHide={marginToHide}
          />
          <View style={styles.suggestedLine} />

          <View style={styles.suggestedBox}>
            <Text style={styles.suggestedTitle}>Suggested</Text>
            <TouchableOpacity onPress={updateSuggested}>
              <Text style={styles.suggestedMore}>
                <MorIcon
                  style={styles.suggestedRefresh}
                  name="refresh"
                  size={refreshSIZE}
                  color={refreshColor}
                />
                {'  '}
                Show&nbsp;3&nbsp;More
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.suggestedRoutine}>
            {suggested.map((routine, routineMapIndex) => {
              let style = {};
              if (routineMapIndex < 2) {
                style = styles.routineBorder;
              }
              return (
                <RoutineItem
                  key={routine.id}
                  name={routine.name}
                  desc={routine.added || 0}
                  style={style}
                  icon="ios-people"
                  dotColor={
                    categories &&
                    categories[routine.category_id] &&
                    categories[routine.category_id].colors.light
                  }
                  decoration="add"
                  repeatType={routine.repeat_type}
                  repeatEvery={routine.repeat_every}
                  textColor={Colors.charcoal}
                  subTextColor={Colors.charcoal}
                  onDotPress={() => {
                    handleAction(routine);
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ModalDaily ref={modalDaily} routine={modalRoutine} />
    </>
  );
}
DayView.defaultProps = {
  onDiscardModal: undefined,
  handleAlertBox: undefined,
};

DayView.propTypes = {
  currentDate: Proptypes.instanceOf(Date).isRequired,
  onDateReset: Proptypes.func.isRequired,
  onDiscardModal: Proptypes.func,
  handleAlertBox: Proptypes.func,
};
