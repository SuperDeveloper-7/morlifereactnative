import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  textStyle: {
    color: Colors.lightGrey,
    fontSize: 13,
    fontFamily: 'lato-bold',
    marginRight: 6,
    marginLeft: 6,
  },
});
