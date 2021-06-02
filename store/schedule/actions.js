import {
  SET_DAY_SCHEDULE_COMPLETIONS,
  SET_DAY_SCHEDULE_SCHEDULED,
  ADD_DAY_SCHEDULE_COMPLETION,
  RESET_DAY_SCHEDULE_COMPLETION,
} from './types';

export const setDayScheduleCompletions = (completions) => ({
  type: SET_DAY_SCHEDULE_COMPLETIONS,
  completions,
});
export const setDayScheduleScheduled = (scheduled) => ({
  type: SET_DAY_SCHEDULE_SCHEDULED,
  scheduled,
});
export const addDayScheduleCompletion = (dateKey, routineId, completion) => ({
  type: ADD_DAY_SCHEDULE_COMPLETION,
  dateKey,
  routineId,
  completion,
});
export const resetDayScheduleCompletion = (day, routineId) => ({
  type: RESET_DAY_SCHEDULE_COMPLETION,
  day,
  routineId,
});
