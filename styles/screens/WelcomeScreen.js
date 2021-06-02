import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.linen,
    paddingHorizontal: 19,
    paddingTop: 0,
  },
  headerLogo: {
    paddingHorizontal: 19,
  },
  header: {
    paddingRight: 18,
    paddingVertical: 15,
  },
  welcomeHeader: {
    fontFamily: 'lato-bold',
    color: Colors.morOrange,
    fontSize: 30,
    marginBottom: 13,
  },
  welcomeText: {
    fontFamily: 'lato',
    color: Colors.charcoal,
    fontSize: 17,
  },
  continueBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginBottom: 36,
  },
  continueButton: {
    width: 300,
    height: 48,
    backgroundColor: Colors.morOrange,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 13.5,
    fontFamily: 'lato-bold',
    color: Colors.white,
  },
});
