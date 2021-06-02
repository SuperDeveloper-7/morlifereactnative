import * as React from 'react';
import { View, Animated } from 'react-native';
import Proptypes from 'prop-types';
import { styles } from '../styles/components/AlertBox';
import { BottomButton } from './BottomButton';

export function AlertBox({ viewColor, textColor, undoAction, doneAction, text }) {
  const [buttonWidth, setButtonWidth] = React.useState(0);
  const [buttonHeight, setButtonHeight] = React.useState(0);
  const ACTION_TIMER = 5000;
  const initialProgress = 0;

  const initialProgressValue = new Animated.Value(initialProgress);
  const animatedTextValue = new Animated.Value(0);

  const getButtonWidthLayout = (e) => {
    setButtonWidth(e.nativeEvent.layout.width);
    setButtonHeight(e.nativeEvent.layout.height);
  };

  const getProgressStyles = () => {
    const width = initialProgressValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, buttonWidth],
    });
    return {
      width,
      height: buttonHeight,
      backgroundColor: viewColor,
    };
  };

  const interpolateColor = animatedTextValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    color: textColor,
    width: interpolateColor,
    overflow: 'hidden',
    fontFamily: 'lato-bold',
    fontSize: 14,
  };

  React.useEffect(() => {
    const translate = () => {
      initialProgressValue.setValue(initialProgress);
      Animated.parallel([
        Animated.timing(initialProgressValue, {
          toValue: 1,
          duration: ACTION_TIMER,
        }),
        Animated.timing(animatedTextValue, {
          toValue: 100,
          delay: 600,
          duration: ACTION_TIMER - 2000,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          doneAction();
        }
      });
    };
    translate();
  }, [animatedTextValue, initialProgressValue]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.button} onLayout={getButtonWidthLayout}>
          <Animated.View style={[styles.bgFill, getProgressStyles()]} />
          <View>
            <View style={styles.textContainer}>
              <Animated.Text style={styles.text}>{`${text} has been archived.`}</Animated.Text>
            </View>
            <View style={styles.animatedView}>
              <Animated.Text style={[animatedStyle]}>{`${text} has been archived.`}</Animated.Text>
            </View>
          </View>

          <BottomButton text="UNDO" onPress={undoAction} />
        </View>
      </View>
    </View>
  );
}

AlertBox.propTypes = {
  viewColor: Proptypes.string.isRequired,
  textColor: Proptypes.string.isRequired,
  undoAction: Proptypes.func.isRequired,
  doneAction: Proptypes.func.isRequired,
  text: Proptypes.string.isRequired,
};
