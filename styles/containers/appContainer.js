import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    backgroundColor: Colors.morOrange,
    width: '100%',
    height: '100%',
  },
  loadingAnim: {
    position: 'absolute',
    alignSelf: 'center',
    width: 52,
    height: 52,
    top: '28.6%',
  },
});
