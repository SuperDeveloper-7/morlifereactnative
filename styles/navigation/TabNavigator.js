import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  topHeaderStyle: { height: 120 },
  tabNavigator: {
    backgroundColor: Colors.linen,
    borderTopColor: Colors.lightGrey,
    height: 89,
    paddingTop: 5,
  },
  tabLabel: {
    fontFamily: 'lato-bold',
    fontSize: 10.5,
  },
});
