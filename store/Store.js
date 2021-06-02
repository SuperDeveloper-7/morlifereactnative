import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import logger from 'redux-logger';
import moment from 'moment';

import rootReducer from './rootReducer'; // Root reducer
import rootSaga from './rootSaga';

const migrations = (state) => {
  if (state.routines && state.routines.routines) {
    const routines = state.routines.routines;
    for (const key in routines) {
      const routine = routines[key];
      routine.created_at && (routine.created_at = moment(routine.created_at));
      routine.deleted_at && (routine.deleted_at = moment(routine.deleted_at));
    }
  }
  return Promise.resolve(state);
};

/** Redux-Persist */

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    migrate: migrations,
    transforms: [createBlacklistFilter('loading', ['spinner'])],
  },
  rootReducer
);

/** Saga */

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (__DEV__) {
  middlewares.push(logger);
}

const enhancers = [applyMiddleware(...middlewares)];

/** Create Store */

export const store = createStore(persistedReducer, compose(...enhancers));

/** Redux-Persist + Store */

export const persistor = persistStore(store);

/** Run Saga */

sagaMiddleware.run(rootSaga);
