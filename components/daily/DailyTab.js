import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import DailyCard from './DailyCard';

const DailyTab = ({ routine }) => {
  const categories = useSelector((state) => state.routines.categories);
  const dailies = useSelector((state) => state.routines.dailies);
  const categorySelected = categories[routine?.category_id || undefined];

  return (
    <View>
      {dailies.map((item) => {
        return (
          <DailyCard
            daily={item}
            category={categorySelected}
            type={item.card_type}
            isPublic={false}
            hashtags={item.hashtags}
            dateFooter={new Date()}
            routineName={routine?.name}
          />
        );
      })}
    </View>
  );
};

DailyTab.defaultProps = {};
DailyTab.propTypes = {};

export default DailyTab;
