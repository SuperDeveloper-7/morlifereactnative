import * as React from 'react';
import { View } from 'react-native';

import { styles } from '../../styles/components/shapes/Cross';

const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossUp} />
      <View style={styles.crossFlat} />
    </View>
  );
};

export default Cross;
