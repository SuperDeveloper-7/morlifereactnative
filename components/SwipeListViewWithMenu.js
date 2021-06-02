import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, Animated } from 'react-native';
import Proptypes from 'prop-types';
import { styles } from '../styles/components/SwipeListViewWithMenu';
import { marginToHide } from '../styles/screens/DayView';

export default function SwipeListViewWithMenu({
  style,
  header,
  items,
  renderItem,
  renderMenu,
  rightOpenValue,
}) {
  const closedValue = -rightOpenValue - (marginToHide || 0);
  const openValue = -rightOpenValue;
  const swipeValues = {};
  // eslint-disable-next-line react/prop-types
  items.forEach((item) => {
    swipeValues[item.key] = new Animated.Value(closedValue);
  });

  const onSwipeValueChange = ({ key, value }) => {
    if (value < -1) swipeValues[key].setValue(Math.max(0, value + openValue));
    else swipeValues[key].setValue(Math.max(0, value + closedValue));
  };

  const renderHiddenItem = (data, rowMap) => (
    <SwipeButton
      data={data}
      rowMap={rowMap}
      swipeValue={swipeValues[data.item.key]}
      renderMenu={renderMenu}
      size={-rightOpenValue}
    />
  );

  return (
    <SwipeListView
      style={style}
      disableRightSwipe={true}
      ListHeaderComponent={header}
      data={items}
      renderItem={(data) => renderItem(data.item)}
      onSwipeValueChange={onSwipeValueChange}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={rightOpenValue}
    />
  );
}

SwipeListViewWithMenu.defaultProps = {
  items: [],
  renderItem: () => <View />,
  rightOpenValue: -150,
  renderMenu: () => <View />,
};
SwipeListViewWithMenu.propTypes = {
  header: Proptypes.node.isRequired,
  items: Proptypes.arrayOf(Proptypes.shape({ key: Proptypes.string })),
  renderItem: Proptypes.func,
  renderMenu: Proptypes.func,
  rightOpenValue: Proptypes.number,
};

const SwipeButton = ({ data, rowMap, swipeValue, size, renderMenu }) => (
  <Animated.View style={[styles.swipeButton, { transform: [{ translateX: swipeValue }] }]}>
    <View style={{ width: size }}>{renderMenu(data.item, rowMap[data.item.key])}</View>
  </Animated.View>
);
SwipeButton.propTypes = {
  data: Proptypes.shape({
    item: Proptypes.shape({ key: Proptypes.string }),
  }).isRequired,
  rowMap: Proptypes.shape({
    closeRow: Proptypes.func,
  }).isRequired,
  swipeValue: Proptypes.instanceOf(Animated.Value).isRequired,
  size: Proptypes.number.isRequired,
  renderMenu: Proptypes.func.isRequired,
};
