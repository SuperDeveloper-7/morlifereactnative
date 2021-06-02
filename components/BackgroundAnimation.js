import React, { useEffect } from 'react';
import { Animated, Easing, Dimensions, ImageBackground, View } from 'react-native';
import { styles } from '../styles/components/BackgroundAnimation';

import backgroundImage from '../assets/images/initImage.png';

import logoAccent from '../assets/images/mor_logo_inverse.png';

const INPUT_RANGE_START = 0;
const INPUT_RANGE_END = 0.95;
const OUTPUT_RANGE_START = 1;
const OUTPUT_RANGE_END = -180;
const ANIMATION_TO_VALUE = 4;
const ANIMATION_DURATION = 5000;
const { width, height } = Dimensions.get('screen');

const translateIn = {
  inX: -width,
  inY: -height,
};

export default function BackgroundAnimation({ navigation }) {
  const inicialValueImage = 0;
  const initialOpacity = 1;
  const initialOpacityIcon = 1;
  const initialOpacityText = 0;
  const translateImageValue = new Animated.Value(inicialValueImage);

  const opacityValue = new Animated.Value(initialOpacity);
  const opacityTextValue = new Animated.Value(initialOpacityText);
  const opacityIconValue = new Animated.Value(initialOpacityIcon);

  useEffect(() => {
    const translate = () => {
      translateImageValue.setValue(inicialValueImage);
      Animated.timing(translateImageValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION * 2,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    const opacity = () => {
      opacityValue.setValue(initialOpacity);
      opacityTextValue.setValue(initialOpacityText);
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityValue, {
              toValue: 0,
              duration: ANIMATION_DURATION / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(opacityIconValue, {
              toValue: 0,
              duration: ANIMATION_DURATION / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(opacityTextValue, {
            toValue: 1,
            duration: ANIMATION_DURATION / 5,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacityTextValue, {
            toValue: 0,
            duration: ANIMATION_DURATION / 5,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacityIconValue, {
            toValue: 1,
            duration: ANIMATION_DURATION / 5,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        navigation.navigate('SignIn');
      });
    };
    translate();
    opacity();
  }, [translateImageValue, opacityValue, opacityTextValue]);

  const translateAnimation = translateImageValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

  return (
    <View style={styles.container}>
      <AnimatedImage
        source={backgroundImage}
        style={[
          styles.backgroundImage,
          {
            height,
            transform: [
              {
                translateX: translateAnimation,
              },
            ],
          },
        ]}
        translateIn={translateIn}
      >
        <Animated.View opacity={opacityValue} style={styles.orangeView} />
      </AnimatedImage>
      <Animated.Text
        style={[
          styles.textQuote,
          {
            opacity: opacityTextValue,
          },
        ]}
      >
        {
          'When you wake up in the morning and you look forward to the day, you look forward to the future. \n- Elon Musk'
        }
      </Animated.Text>
      <Animated.Image
        source={logoAccent}
        style={[
          styles.morIcon,
          {
            opacity: opacityIconValue,
          },
        ]}
      />
    </View>
  );
}
