import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import Proptypes from 'prop-types';
import RoutineManager from '../model/RoutineManager';

import { RoutineItem } from './RoutineItem';
import { setLoading } from '../store/loading/actions';
import { setPublicRoutines, setPublicRoutineStats } from '../store/routines/actions';
import { loadPublicRoutineStats, loadCategoryPublicRoutines } from '../api/firebase';
import Colors from '../constants/Colors';

export default function CategoryRoutineList({ navigation, categoryId }) {
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.routines.categories);
  const ownRoutines = useSelector((state) => state.routines.routines);
  const publicRoutines = useSelector((state) => state.routines.publicRoutines);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const initAsync = async () => {
      const categoryRoutines = await loadCategoryPublicRoutines(categoryId);
      dispatch(setPublicRoutines(categoryRoutines));
      const initPublicRoutineStats = await loadPublicRoutineStats(Object.keys(categoryRoutines));
      dispatch(setPublicRoutineStats(initPublicRoutineStats));
    };
    initAsync();
  }, []);

  const ownedtoPublicRoutineIdMap = {};
  Object.values(ownRoutines)
    .filter((routine) => !routine.is_deleted)
    .forEach((routine) => {
      ownedtoPublicRoutineIdMap[routine.public_id] = routine.id;
    });
  if (!categoryId) {
    return null;
  }
  const routineManager = new RoutineManager(user.uid, dispatch);

  const category = categories[categoryId];
  const catRoutines = Object.keys(publicRoutines)
    .map(
      (routineId) =>
        publicRoutines[routineId].category_id === categoryId && publicRoutines[routineId]
    )
    .filter((r) => r);

  const handleRoutineAction = (selectedRoutine) => {
    dispatch(setLoading(true));
    setTimeout(async () => {
      if (ownedtoPublicRoutineIdMap[selectedRoutine.id]) {
        const ownRoutine = ownRoutines[ownedtoPublicRoutineIdMap[selectedRoutine.id]];
        await routineManager.removeRoutine(ownRoutine);
      } else {
        navigation.push('RoutineAdder', { selectedRoutine });
      }
      dispatch(setLoading(false));
    });
  };
  return (
    <View>
      {catRoutines.map((routine, routineMapIndex) => {
        let style = {};
        if (routineMapIndex < category.counter - 1) {
          style = { borderBottomWidth: 1, borderBottomColor: Colors.lightGrey };
        }
        const hasRoutine = ownedtoPublicRoutineIdMap[routine.id];
        return (
          <RoutineItem
            key={routine.id}
            name={routine.name}
            desc={routine.added || 0}
            style={style}
            icon={category.icon_name}
            dotColor={category.colors.light}
            decoration={hasRoutine ? 'remove' : 'add'}
            repeatType={routine.repeat_type}
            repeatEvery={routine.checkin_count}
            textColor={Colors.charcoal}
            subTextColor={Colors.lightCharcoal}
            onDotPress={() => {
              handleRoutineAction(routine);
            }}
          />
        );
      })}
    </View>
  );
}
CategoryRoutineList.propTypes = {
  categoryId: Proptypes.string.isRequired,
};
