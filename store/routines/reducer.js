import {
  SET_CATEGORIES,
  SET_PUBLIC_ROUTINES,
  SET_ROUTINES,
  SET_ROUTINES_CONTENT,
  SET_ROUTINES_FEED,
  DELETE_ROUTINE,
  SETUP_CONFIGS,
  ADD_ROUTINE,
  SET_PUBLIC_ROUTINE_STATS,
  SET_DAILIES,
} from './types';
import { SIGN_OUT } from '../user/types';

const INIT_STATE = {
  categories: {},
  publicRoutines: {},
  routines: {},
  content: {},
  feed: {},
  setupConfigs: {},
  publicRoutineStats: {},
  dailies: {},
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return INIT_STATE;
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_PUBLIC_ROUTINES:
      return {
        ...state,
        publicRoutines: {
          ...state.publicRoutines,
          ...action.publicRoutines,
        },
      };
    case SET_ROUTINES:
      return {
        ...state,
        routines: {
          ...state.routines,
          ...action.routines,
        },
      };
    case SET_ROUTINES_CONTENT:
      return {
        ...state,
        content: {
          ...state.content,
          ...action.content,
        },
      };
    case SET_ROUTINES_FEED:
      return {
        ...state,
        feed: action.feed,
      };
    case DELETE_ROUTINE:
      return {
        ...state,
        routines: {
          ...state.routines,
          [action.routineId]: {
            ...state.routines[action.routineId],
            is_deleted: true,
            deleted_at: action.timestamp,
          },
        },
      };
    case ADD_ROUTINE:
      return {
        ...state,
        routines: {
          ...state.routines,
          [action.routine.id]: action.routine,
        },
      };
    case SETUP_CONFIGS:
      return {
        ...state,
        setupConfigs: {
          ...state.setupConfigs,
          ...action.setupConfigs,
        },
      };
    case SET_PUBLIC_ROUTINE_STATS:
      return {
        ...state,
        publicRoutineStats: {
          ...state.publicRoutineStats,
          ...action.publicRoutineStats,
        },
      };
    case SET_DAILIES:
      return {
        ...state,
        dailies: action.dailies,
      };
    default:
      return state;
  }
};

export default userReducer;
