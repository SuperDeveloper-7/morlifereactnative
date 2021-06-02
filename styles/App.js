import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    backgroundColor: Colors.morOrange,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    width: '100%',
  },
  loadingAnim: { alignSelf: 'center', width: '20%' },
});
