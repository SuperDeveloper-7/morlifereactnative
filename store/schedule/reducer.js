import _ from 'lodash';

import {
  SET_DAY_SCHEDULE_COMPLETIONS,
  SET_DAY_SCHEDULE_SCHEDULED,
  ADD_DAY_SCHEDULE_COMPLETION,
  RESET_DAY_SCHEDULE_COMPLETION,
} from './types';
import { SIGN_OUT } from '../user/types';

const INIT_STATE = {
  daySchedule: {},
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return INIT_STATE;
    case SET_DAY_SCHEDULE_COMPLETIONS:
      let newState = { ...state };
      Object.keys(action.completions).forEach((dateKey) => {
        const completed = {};
        action.completions[dateKey].forEach(
          (c) => (completed[c.routineId] = [...(completed[c.routineId] || []), c])
        );
        newState = {
          ...newState,
          daySchedule: {
            ...newState.daySchedule,
            [dateKey]: {
              ...(newState.daySchedule[dateKey] || {}),
              completed,
            },
          },
        };
      });
      return newState;
    case SET_DAY_SCHEDULE_SCHEDULED:
      let _newState = { ...state };
      Object.keys(action.scheduled).forEach((dateKey) => {
        const scheduled = action.scheduled[dateKey] || [];
        const isEmpty = scheduled.length === 0;
        _newState = {
          ..._newState,
          daySchedule: {
            ..._newState.daySchedule,
            [dateKey]: {
              ...(_newState[dateKey] || {}),
              ...{
                scheduled,
                isEmpty,
              },
            },
          },
        };
      });
      return _newState;
    case ADD_DAY_SCHEDULE_COMPLETION:
      return {
        ...state,
        daySchedule: {
          ...state.daySchedule,
          [action.dateKey]: {
            ...state.daySchedule[action.dateKey],
            completed: {
              ...state.daySchedule[action.dateKey].completed,
              [action.routineId]: [
                ..._.get(state.daySchedule[action.dateKey].completed, action.routineId, []),
                action.completion,
              ],
            },
          },
        },
      };
    case RESET_DAY_SCHEDULE_COMPLETION:
      return {
        ...state,
        daySchedule: {
          ...state.daySchedule,
          [action.day]: {
            ...state.daySchedule[action.day],
            completed: {
              ...state.daySchedule[action.day].completed,
              [action.routineId]: [],
            },
          },
        },
      };
    default:
      return state;
  }
};

export default userReducer;
