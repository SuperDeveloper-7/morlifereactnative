import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const HEADER_FONT_SIZE = 17;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: 1200,
  },
  orangeView: {
    borderWidth: 2,
    flex: 1,
    backgroundColor: Colors.morOrange,
  },
  textQuote: {
    color: 'white',
    fontSize: 19,
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: '48%',
    marginHorizontal: 39,
    fontFamily: 'lato-bold',
  },
  morIcon: {
    position: 'absolute',
    alignSelf: 'center',
    width: 52,
    height: 52,
    top: '32.2%',
  },
});
