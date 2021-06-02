import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import Proptypes from 'prop-types';

import { styles } from '../../styles/components/calendar/Header';

export default function Header({ style, text }) {
  return (
    <View style={style}>
      <Text h4={true} style={styles.headerText}>
        {text}
      </Text>
    </View>
  );
}
Header.defaultProps = {
  text: '',
};
Header.propTypes = {
  text: Proptypes.string,
};
