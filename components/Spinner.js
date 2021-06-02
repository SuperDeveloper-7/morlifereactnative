import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Proptype from 'prop-types';
import { styles } from '../styles/components/Spinner';

const Spinner = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

Spinner.defaultProps = {
  visible: false,
};
Spinner.propTypes = {
  visible: Proptype.bool,
};
export default Spinner;
