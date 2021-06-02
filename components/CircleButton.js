import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Proptypes from 'prop-types';

import Circle from './shapes/Circle';
import { styles } from '../styles/components/CircleButton';

export function CircleButton({ color, selectedColor, selected, onPress, text, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Circle size={48} color={selected ? selectedColor : color}>
        <Text style={styles.circleText}>{text}</Text>
      </Circle>
    </TouchableOpacity>
  );
}

CircleButton.propTypes = {
  color: Proptypes.string.isRequired,
  text: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired,
};
