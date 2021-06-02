import React from 'react';
import { View } from 'react-native';
import Proptypes from 'prop-types';

import { styles } from '../styles/components/Seperator';

export default function Separator({ color, style }) {
  return <View style={[styles.separator, { borderColor: color }, style]} />;
}
Separator.propTypes = {
  color: Proptypes.string.isRequired,
};
