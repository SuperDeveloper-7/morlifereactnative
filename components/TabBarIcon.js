import * as React from 'react';
import Proptypes from 'prop-types';

import MorIcon from './shapes/MorIcon';
import Colors from '../constants/Colors';

export default function TabBarIcon({ name, focused }) {
  return <MorIcon name={name} size={23} color={focused ? Colors.morOrange : Colors.midGrey} />;
}
TabBarIcon.defaultProps = {
  name: '',
  focused: false,
};
TabBarIcon.propTypes = {
  name: Proptypes.string,
  focused: Proptypes.bool,
};
