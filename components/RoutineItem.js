import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Proptypes from 'prop-types';

import MorIcon from './shapes/MorIcon';
import Circle from './shapes/Circle';
import { styles, CIRCLE_SIZE, BLURRED_WHITE } from '../styles/components/RoutineItem';

function RepeatTypeText(repeatType) {
  if (repeatType === 'repeat_day') {
    return 'Daily';
  }
  if (repeatType === 'repeat_weekly') {
    return 'Weekly';
  }
  if (repeatType === 'custom_week') {
    return 'every Week';
  }
  if (repeatType === 'custom_month') {
    return 'every Month';
  }
  return repeatType;
}
export function RoutineItem({
  editingScreen,
  iconShow,
  name,
  navlink,
  color,
  icon,
  dotColor,
  progressColor,
  progressPercent,
  decoration,
  style,
  onDotPress,
  onLongPress,
  repeatType,
  repeatEvery,
  textColor,
  subTextColor,
}) {
  return (
    <TouchableWithoutFeedback onLongPress={onLongPress}>
      <View style={[style, styles.elipse, { backgroundColor: color }]}>
        <View
          style={[
            styles.itemView,
            { backgroundColor: progressColor, width: `${progressPercent || 0}%` },
          ]}
        />
        <TouchableOpacity onPress={onDotPress}>
          <Circle size={CIRCLE_SIZE} color={dotColor} onPress={onDotPress}>
            {decoration === 'add' && (
              <MorIcon
                style={styles.addButton}
                name="add"
                size={18}
                color={editingScreen ? BLURRED_WHITE : 'white'}
              />
            )}
            {decoration === 'remove' && (
              <Ionicons size={CIRCLE_SIZE} name="ios-remove" color="white" />
            )}
            {decoration === 'completed' && (
              <Ionicons size={CIRCLE_SIZE} name="ios-checkmark" color="white" />
            )}
          </Circle>
        </TouchableOpacity>
        <View style={styles.rightView}>
          <Text style={[styles.nameText, { color: textColor }]}>{name}</Text>
          <Text style={{ color: subTextColor }} onPress={navlink}>
            <View>{iconShow ? <MorIcon name={icon} size={14} color="white" /> : null}</View>
            {repeatEvery > 1 ? `${repeatEvery}x` : ''}
            {RepeatTypeText(repeatType)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
RoutineItem.defaultProps = {
  editingScreen: false,
  iconShow: false,
  dotColor: null,
  progressColor: null,
  progressPercent: null,
  decoration: false,
  onDotPress: null,
  navlink: null,
  onLongPress: null,
  color: null,
  repeatType: null,
  repeatEvery: null,
  textColor: 'white',
  subTextColor: 'white',
};
RoutineItem.propTypes = {
  editingScreen: Proptypes.bool,
  iconShow: Proptypes.bool,
  name: Proptypes.string.isRequired,
  navlink: Proptypes.func,
  color: Proptypes.string,
  icon: Proptypes.string.isRequired,
  dotColor: Proptypes.string,
  progressColor: Proptypes.string,
  progressPercent: Proptypes.number,
  decoration: Proptypes.oneOfType([Proptypes.bool, Proptypes.string]),
  onDotPress: Proptypes.func,
  onLongPress: Proptypes.func,
  repeatType: Proptypes.string,
  repeatEvery: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  textColor: Proptypes.string,
  subTextColor: Proptypes.string,
};

export function LastMenuItem({ color, onPress, disabled }) {
  if (disabled) {
    return <></>;
  }
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }} disabled={disabled}>
      <View
        style={[
          styles.lastMenuItem,
          {
            backgroundColor: color,
          },
        ]}
      >
        <Text style={styles.menuText}>
          <MorIcon style={styles.iconButtons} name="trash" size={19} color="white" />
        </Text>
      </View>
    </TouchableOpacity>
  );
}
LastMenuItem.defaultProps = {
  onPress: null,
  disabled: false,
};
LastMenuItem.propTypes = {
  color: Proptypes.string.isRequired,
  onPress: Proptypes.func,
  disabled: Proptypes.bool,
};

export function MenuItem({ color, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[style, { flex: 1 }]}>
      <View style={[styles.fullCover, { backgroundColor: color, marginLeft: 0 }]}>
        <Text style={styles.menuText}>
          <MorIcon style={styles.iconButtons} name="edit" size={19} color="white" />
        </Text>
      </View>
    </TouchableOpacity>
  );
}
MenuItem.defaultProps = {
  onPress: null,
};
MenuItem.propTypes = {
  color: Proptypes.string.isRequired,
  onPress: Proptypes.func,
};
