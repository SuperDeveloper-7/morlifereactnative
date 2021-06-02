import React from 'react';
import { View, Text } from 'react-native';
import MorIcon from './shapes/MorIcon';

import Colors from '../constants/Colors';
import { styles } from '../styles/components/MorFooterSign';

export default function Separator() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textStyle}>Calendars made by</Text>
      </View>
      <View>
        <MorIcon name="logo" size={13} color={Colors.lightGrey} />
      </View>
      <View>
        <Text style={styles.textStyle}>Mor Life, Inc.</Text>
      </View>
    </View>
  );
}
Separator.propTypes = {};
