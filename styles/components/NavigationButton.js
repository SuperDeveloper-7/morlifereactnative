import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  buttonLayout: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 50,
  },
  actionText: {
    color: Colors.charcoal,
    fontWeight: 'bold',
  },
});
