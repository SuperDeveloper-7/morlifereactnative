import { combineReducers } from 'redux';

import activityReducer from './activity/reducer';
import routinesReducer from './routines/reducer';
import scheduleReducer from './schedule/reducer';
import { userReducer } from './user';
import loadingReducer from './loading/reducer';

export default combineReducers({
  activity: activityReducer,
  routines: routinesReducer,
  schedule: scheduleReducer,
  user: userReducer,
  loading: loadingReducer,
});
