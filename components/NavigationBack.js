import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Proptypes from 'prop-types';
import MorIcon from './shapes/MorIcon';
import Circle from './shapes/Circle';

import Colors from '../constants/Colors';
import { styles } from '../styles/components/NavigationBack';

export default function NavigateBack({ onPress, iconColor, bgColor, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
      <Circle size={36} color={bgColor} onPress={onPress}>
        <MorIcon name="left-arrow" size={15} color={iconColor} />
      </Circle>
    </TouchableOpacity>
  );
}

NavigateBack.defaultProps = {
  iconColor: Colors.morOrange,
  bgColor: Colors.white,
};
NavigateBack.propTypes = {
  onPress: Proptypes.func.isRequired,
  iconColor: Proptypes.string,
  bgColor: Proptypes.string,
};
