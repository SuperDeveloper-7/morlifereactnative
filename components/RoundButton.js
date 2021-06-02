import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import Proptypes from 'prop-types';

import { styles } from '../styles/components/RoundButton';
import Colors from '../constants/Colors';

export default function RoundButton({
  onPress,
  children,
  icon,
  color,
  style,
  disabled,
  disabledTextColor,
  disabledBackgroundColor,
}) {
  const containerStyle = useMemo(
    () =>
      StyleSheet.compose(
        StyleSheet.compose(styles.container, style),
        disabled && { backgroundColor: disabledBackgroundColor }
      ),
    [style, disabled, disabledBackgroundColor]
  );
  const textStyle = useMemo(
    () =>
      StyleSheet.compose(styles.text, {
        color: disabled ? disabledTextColor : color,
      }),
    [color, disabled, disabledTextColor]
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={containerStyle}>
        {!!icon && <View style={styles.icon}>{icon}</View>}
        <Text style={textStyle}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

RoundButton.propTypes = {
  children: Proptypes.node,
  onPres: Proptypes.func,
  icon: Proptypes.node,
  style: ViewPropTypes.style,
  color: Proptypes.string,
  disabled: Proptypes.bool,
  disabledTextColor: Proptypes.string,
  disabledBackgroundColor: Proptypes.string,
};

RoundButton.defaultProps = {
  color: Colors.black,
  disabled: false,
};
