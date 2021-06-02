import React from 'react';
import { View } from 'react-native';
import BackgroundAnimation from '../components/BackgroundAnimation';

const AnimationScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <BackgroundAnimation navigation={navigation} />
    </View>
  );
};
export default AnimationScreen;
