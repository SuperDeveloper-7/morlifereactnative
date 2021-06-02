import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import TextStyle from '../../constants/TextStyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.morOrange,
    paddingHorizontal: 40,
    paddingTop: 0,
    marginTop: 0,
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
  inputContainer: {
    borderBottomColor: Colors.white,
    paddingBottom: 12,
    marginBottom: 5,
  },
  inputPrefix: {
    fontSize: 15,
    fontFamily: 'lato-heavy',
    lineHeight: 23,
    color: Colors.white,
    textAlignVertical: 'center',
  },
  inputText: {
    fontSize: 15,
    fontFamily: 'lato',
    lineHeight: 23,
    color: Colors.white,
    height: 31,
    paddingBottom: 5,
  },
  continueButton: {},
  error: {
    height: 30,
  },

  space0: {
    height: '6%',
    width: '100%',
  },
});
