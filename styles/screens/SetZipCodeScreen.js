import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import TextStyle from '../../constants/TextStyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.morOrange,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 0,
  },
  headingText: {
    ...TextStyle.setZipcodeScreenText,
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  introText: {
    ...TextStyle.setupIntroText,
    width: 263,
    marginTop: 0,
    paddingTop: 0,
  },
  inputContainer: {
    marginTop: 28,
    width: 108,
    height: 52,
    backgroundColor: Colors.morOrange,
    color: Colors.white,
  },
  inputText: {
    fontSize: 25,
    backgroundColor: Colors.morOrange,
    color: Colors.white,
    textAlign: 'center',
  },
  rectangleActive: {
    position: 'absolute',
    width: 44,
    height: 5,
    left: '50%',
    marginTop: 151.5,
    marginBottom: 31,
    borderRadius: 10,
    backgroundColor: Colors.white,
    opacity: 0.3,
  },
  rectanglePassive: {
    width: 44,
    height: 5,
    right: 10,
    marginTop: 151.5,
    marginRight: 0,
    marginBottom: 31,
    marginLeft: 84,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  continueButton: {
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 10,
    alignSelf: 'stretch',
  },
  errMsg: {
    marginTop: 10,
    fontSize: 25,
    backgroundColor: Colors.morOrange,
    color: Colors.white,
    textAlign: 'center',
  },
  backButton: {
    paddingHorizontal: 20,
  },
  spacingBlock: {
    flex: 1,
  },
});
