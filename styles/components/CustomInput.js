import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  prefix: {
    paddingRight: 9,
  },
  append: {
    paddingLeft: 9,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'lato',
    lineHeight: 23,
    color: Colors.white,
  },
});
