import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Proptypes from 'prop-types';

import { styles } from '../styles/components/NavigationButton';

const NavigationButton = ({ text, onPress, style }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <View style={styles.buttonLayout}>
      <Text style={styles.actionText}>{text}</Text>
    </View>
  </TouchableOpacity>
);
NavigationButton.propTypes = {
  text: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired,
};

export default NavigationButton;
