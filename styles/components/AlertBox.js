import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const HEADER_FONT_SIZE = 17;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
    paddingVertical: 20,
  },
  text: {
    alignSelf: 'center',
    color: Colors.charcoal,
    fontSize: 14,
    fontFamily: 'lato-bold',
  },
  button: {
    borderColor: '#111',
    borderRadius: 33,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 11,
    backgroundColor: Colors.linen,
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 33,
  },
  containerText: {
    borderWidth: 10,
  },
  textContainer: {
    position: 'absolute',
    top: 20,
    marginHorizontal: 22,
  },
  animatedView: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    left: 0,
    height: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    marginHorizontal: 22,
  },
});
