import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import '@firebase/firestore';
import Proptypes from 'prop-types';

import { styles } from '../styles/components/BottomButton';

export function BottomButton({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
BottomButton.propTypes = {
  text: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired,
};
