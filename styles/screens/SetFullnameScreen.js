import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.morOrange,
    paddingHorizontal: 38,
    paddingTop: 20,
  },
  backButton: {
    paddingHorizontal: 19,
  },
  title: {
    fontSize: 15,
    fontFamily: 'lato-heavy',
    color: Colors.white,
  },
  headingText: {
    fontSize: 17,
    fontFamily: 'lato-bold',
    color: Colors.white,
    marginBottom: 12,
  },
  introText: {
    fontSize: 12.5,
    fontFamily: 'lato-medium',
    color: Colors.morOrangeLight,
  },
  input: {
    marginBottom: 30,
  },
  error: {
    height: 46,
  },
  continueButton: {},

  space0: {
    height: '8%',
    width: '100%',
  },
});
