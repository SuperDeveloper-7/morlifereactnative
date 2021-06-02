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

export const setCategories = (categories) => ({ type: SET_CATEGORIES, categories });
export const setPublicRoutines = (publicRoutines) => ({
  type: SET_PUBLIC_ROUTINES,
  publicRoutines,
});
export const setRoutines = (routines) => ({ type: SET_ROUTINES, routines });
export const setRoutinesContent = (content) => ({ type: SET_ROUTINES_CONTENT, content });
export const setRoutinesFeed = (feed) => ({ type: SET_ROUTINES_FEED, feed });
export const setupConfigs = (iSetupConfigs) => ({ type: SETUP_CONFIGS, iSetupConfigs });
export const deleteRoutine = (routineId, timestamp) => ({
  type: DELETE_ROUTINE,
  routineId,
  timestamp,
});
export const addRoutine = (routine) => ({ type: ADD_ROUTINE, routine });
export const setPublicRoutineStats = (publicRoutineStats) => ({
  type: SET_PUBLIC_ROUTINE_STATS,
  publicRoutineStats,
});
export const setDailies = (dailies) => ({ type: SET_DAILIES, dailies });
