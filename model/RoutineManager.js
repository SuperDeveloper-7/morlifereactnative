import moment from 'moment';

import {
  addRoutines,
  deleteRoutine,
  addRoutinesScheduledStats,
  saveRoutine,
} from '../api/firebase';

import {
  deleteRoutine as reduxDeleteRoutine,
  addRoutine as reduxAddRoutine,
  setRoutines,
} from '../store/routines/actions';

import { minutesFromMidnight } from '../util/date_util';

class RoutineManager {
  constructor(uid, reduxDispatch) {
    this.uid = uid;
    this.reduxDispatch = reduxDispatch;
  }

  convertPublicRoutine = (publicRoutine) => {
    const routine = { ...publicRoutine };
    delete routine.id;
    delete routine.user_id;
    routine.public_id = publicRoutine.id;
    routine.is_deleted = false;
    routine.created_at = new Date();
    if (routine.rank === undefined) {
      routine.rank = minutesFromMidnight(routine.start_time);
    }
    return routine;
  };

  addPublicRoutine = async (publicRoutine) => {
    return this.addPublicRoutines([publicRoutine]);
  };

  addPublicRoutines = async (publicRoutines) => {
    const routines = publicRoutines.map((publicRoutine) =>
      this.convertPublicRoutine(publicRoutine)
    );
    return this.addRoutines(routines);
  };

  addRoutine = async (routine) => {
    return this.addRoutines([routine]);
  };

  addRoutines = async (routines) => {
    const newRoutineIds = await addRoutines(this.uid, routines);
    for (let i = 0; i < routines.length; i += 1) {
      const routine = routines[i];
      routine.id = newRoutineIds[i];
      // Firebase does not return a Date object, but a FirebaseDate object with a .toDate() function
      // Simulate the same effect by using a moment object, which has a .toDate() function
      routine.created_at = moment();
      this.reduxDispatch(reduxAddRoutine(routine));
    }
    return addRoutinesScheduledStats(this.uid, new Date(), routines, 1);
  };

  removeRoutine = async (routine) => {
    const timestamp = moment();
    this.reduxDispatch(reduxDeleteRoutine(routine.id, timestamp));
    await deleteRoutine(this.uid, routine.id, timestamp);
    return addRoutinesScheduledStats(this.uid, new Date(), [routine], -1);
  };

  saveRoutine = async (routine) => {
    await saveRoutine(this.uid, routine.id, routine);
    this.reduxDispatch(setRoutines([routine]));
  };
}

export default RoutineManager;
