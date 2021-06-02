import { StyleSheet } from 'react-native';
import Colors from './Colors';

const TextStyle = StyleSheet.create({
  highlightedText: {
    fontWeight: '500',
    color: Colors.morOrange,
  },
  titleText: {
    fontWeight: '500',
    color: Colors.charcoal,
  },
  sectionHeadingText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.midGrey,
  },
  paragraph: {
    fontWeight: '500',
    color: Colors.offWhite,
  },
  embossText: {
    fontWeight: 'bold',
    color: Colors.embossColor,
  },
  hyperlink: {
    color: Colors.morOrange,
    textDecorationLine: 'underline',
  },
  setupDetailText: {
    color: Colors.midGrey,
    fontSize: 12,
    fontWeight: '500',
  },
  setUsernameScreenText: {
    width: 258,
    height: 66,
    fontFamily: 'lato',
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: Colors.white,
    letterSpacing: -0.26,
    textAlign: 'center',
  },
  setZipcodeScreenText: {
    fontFamily: 'lato',
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.26,
    textAlign: 'center',
    color: Colors.white,
  },
  setupIntroText: {
    fontFamily: 'lato',
    fontSize: 12.5,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: Colors.white,
    textAlign: 'center',
  },
});

export default TextStyle;
