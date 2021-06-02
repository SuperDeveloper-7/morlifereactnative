import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import TextStyle from '../../constants/TextStyle';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.morOrange,
    alignItems: 'center',
    paddingBottom: 30,
    height: '100%',
  },
  loadingAnim: {
    width: 150,
  },
  title: {
    marginTop: 5,
    color: Colors.white,
    fontFamily: 'lato-heavy',
    fontSize: 15,
    lineHeight: 18,
  },
  description: {
    marginTop: 10,
    color: Colors.white,
    fontFamily: 'lato-medium',
    fontSize: 12.5,
    lineHeight: 15,
    textAlign: 'center',
    width: 236,
  },
  button: {
    minWidth: '85%',
    marginBottom: 7,
  },
  notice: {
    color: Colors.white,
    fontFamily: 'lato',
    fontSize: 10,
    lineHeight: 13.5,
    letterSpacing: 0,
    textAlign: 'center',
    width: 280,
  },
  hyperlink: {
    fontFamily: 'lato-heavy',
  },

  space0: {
    height: '32%',
    width: '100%',
  },
  space1: {
    height: '18%',
    width: '100%',
  },
  space2: {
    height: '3.6%',
    width: '100%',
  },
});
