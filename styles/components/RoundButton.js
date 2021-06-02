import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    height: 48,
    color: Colors.morOrange,
    backgroundColor: Colors.white,
    paddingHorizontal: 60,
  },
  text: {
    fontFamily: 'lato-heavy',
    fontSize: 15,
    lineHeight: 18,
  },
  icon: {
    position: 'absolute',
    left: 13,
    height: 22.8,
    width: 22.8,
  },
});
