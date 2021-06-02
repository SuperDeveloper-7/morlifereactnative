import React from 'react';
import { View, TextInput } from 'react-native';
import Proptypes from 'prop-types';

import { styles } from '../styles/components/CustomInput';

export default function CustomInput({
  prefix,
  prefixStyle,
  append,
  appendStyle,
  inputStyle,
  style,
  ...rest
}) {
  return (
    <View style={[styles.container, style]}>
      {prefix && <View style={[styles.prefix, prefixStyle]}>{prefix}</View>}
      <TextInput style={[styles.input, inputStyle]} {...rest} />
      {append && <View style={[styles.append, appendStyle]}>{append}</View>}
    </View>
  );
}

CustomInput.propTypes =
  {
    prefix: Proptypes.node,
    prefixStyle: Proptypes.object,
    append: Proptypes.node,
    appendStyle: Proptypes.object,
    inputStyle: Proptypes.object,
  } & TextInput.propTypes;
