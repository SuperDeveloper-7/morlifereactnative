import moment from 'moment';

export const getShortDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const getShortDateRange = (startDate, count) => {
  const range = [];
  for (let i = 0; i < count; i += 1) {
    const dateKey = moment(startDate).add(-i, 'days').format('YYYY-MM-DD');
    range.push(dateKey);
  }
  return range;
};

export const cannonicalDate = (date) => moment(date).utc(true);

export const fromCannonicalDate = (date) => moment.utc(date).local(true);

export const isPastDay = (date) => {
  return moment(date).startOf('day').toDate() < moment().startOf('day').toDate();
};

export const minutesFromMidnight = (timestamp) => {
  const mmt = timestamp ? moment(timestamp) : moment();
  const mmtMidnight = mmt.clone().startOf('day');
  return mmt.diff(mmtMidnight, 'minutes');
};

export const strTime = (firebaseTime, hasAM) =>
  firebaseTime &&
  moment
    .utc(firebaseTime)
    .local(true)
    .format(hasAM ? 'hh:mm A' : 'HH:mm');

export const weekKey = (date) => {
  const momentDate = cannonicalDate(date);
  return `w-${momentDate.isoWeek()}-${momentDate.year()}`;
};

export const monthKey = (date) => {
  const momentDate = cannonicalDate(date);
  return `m-${momentDate.month()}-${momentDate.year()}`;
};
