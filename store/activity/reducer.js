import { SET_ACTIVITY_FEED } from './types';
import { SIGN_OUT } from '../user/types';

const INIT_STATE = {
  feed: {},
};

const activityFeed = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return INIT_STATE;
    case SET_ACTIVITY_FEED:
      return {
        ...state,
        feed: {
          ...state.feed,
          ...action.feed,
        },
      };
    default:
      return state;
  }
};

export default activityFeed;
