import { cannonicalDate, fromCannonicalDate } from '../util/date_util';

class RoutineCompletion {
  constructor(
    routineId,
    date,
    createdAt = new Date(),
    id = null,
    customRepeatType = null,
    customRepeatTimePeriod
  ) {
    this.id = id;
    this.date = date;
    this.routineId = routineId;
    this.createdAt = createdAt;
    this.customRepeatType = customRepeatType;
    this.customRepeatTimePeriod = customRepeatTimePeriod;
  }

  toString() {
    return `{ ${this.id}, ${this.routineId}, ${this.createdAt} }`;
  }
}

export default RoutineCompletion;

export const RoutineCompletionConverter = {
  toFirestore: (obj) => ({
    routine_id: obj.routineId,
    date: cannonicalDate(obj.date).toDate(),
    created_at: cannonicalDate(obj.createdAt).toDate(),
    c_repeat_type: obj.customRepeatType,
    c_repeat_time_period: obj.customRepeatTimePeriod,
  }),
  fromFirestore: (doc, options) => {
    const data = doc.data(options);
    return new RoutineCompletion(
      data.routine_id,
      fromCannonicalDate(data.date.toDate()).toDate(),
      fromCannonicalDate(data.created_at.toDate()).toDate(),
      doc.id,
      data.c_repeat_type,
      data.c_repeat_time_period
    );
  },
};
