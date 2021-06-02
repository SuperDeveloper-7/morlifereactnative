import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Proptypes from 'prop-types';

import { styles } from '../styles/components/TimeList';

// eslint-disable-next-line import/prefer-default-export
export function TimeList({
  timeList,
  selectTimeButton,
  buttonColor,
  highlightColor,
  sizeOfList,
  hidden,
  selected,
  captionColor,
  style,
}) {
  if (hidden) {
    return null;
  }
  const selectedArray = Array.isArray(selected) ? selected : [selected];
  const findBackgroundColor = (key) => {
    return selectedArray.indexOf(key) !== -1 ? highlightColor : buttonColor;
  };

  const timeListGrouped = [];
  for (let i = 0; i < sizeOfList; i += 2) {
    timeListGrouped.push([timeList[i], timeList[i + 1]]);
  }

  // eslint-disable-next-line no-shadow
  const TimeListItem = ({ item, style }) => (
    <TouchableOpacity key={item.key} onPress={() => selectTimeButton(item.key)} style={style}>
      <View
        style={[
          styles.timeButton,
          {
            backgroundColor: findBackgroundColor(item.key),
          },
        ]}
      >
        <Text style={[styles.timeText, { color: captionColor }]}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
  TimeListItem.propTypes = {
    item: Proptypes.shape({
      key: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
      text: Proptypes.string,
    }).isRequired,
  };
  return (
    <View style={[styles.timeList, style]}>
      {timeListGrouped.map((row, i) => (
        <View
          // eslint-disable-next-line react/no-array-index-key
          key={`row_${i}`}
          style={styles.timeListView}
        >
          <TimeListItem item={row[0]} style={[styles.timeListItem]} />
          {row[1] && <TimeListItem item={row[1]} style={[styles.timeListItem]} />}
        </View>
      ))}
    </View>
  );
}

TimeList.defaultProps = {
  selected: false,
};
TimeList.propTypes = {
  timeList: Proptypes.arrayOf(
    Proptypes.shape({
      text: Proptypes.string,
      key: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
    })
  ).isRequired,
  selectTimeButton: Proptypes.func.isRequired,
  buttonColor: Proptypes.string.isRequired,
  highlightColor: Proptypes.string.isRequired,
  sizeOfList: Proptypes.number.isRequired,
  hidden: Proptypes.bool.isRequired,
  selected: Proptypes.number,
  captionColor: Proptypes.string.isRequired,
};
