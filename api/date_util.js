const getCurrentYear = () => {
  const now = new Date();
  return now.getUTCFullYear();
};

const getFirstDateOfYear = () => {
  return new Date(Date.UTC(getCurrentYear(), 0, 1));
};

const getLastDateOfYear = () => {
  return new Date(Date.UTC(getCurrentYear() + 1, 0, 1));
};

const getDayOfYear = (date) => {
  const start = getFirstDateOfYear();
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

const getCurrentDayOfYear = (currentDate) => {
  const date = new Date(
    Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
  );
  return getDayOfYear(date);
};

const getLastDayOfYear = () => {
  const lastDate = getLastDateOfYear();
  return getDayOfYear(lastDate);
};

exports.getCurrentDayOfYear = getCurrentDayOfYear;
exports.getLastDayOfYear = getLastDayOfYear;
