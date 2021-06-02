function filterBy(object, value) {
  const arrayKeys = Object.keys(object);
  const arrayReturn = [];

  arrayKeys.map((key) => {
    if (object[key].repeat_type === value) arrayReturn.push(object[key]);
  });
  return arrayReturn;
}

export const getMyRoutines = (state) => {
  const moves = state.routines?.routines;
  const movesToShow = [];
  movesToShow.push({ timeofDay: '', moves: filterBy(moves, 'repeat_day') });
  return movesToShow;
};
