import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  texTag: {
    fontSize: 10,
    color: Colors.white,
  },
  container: {
    paddingHorizontal: 19,
    shadowOffset: { y: 0 },
    zIndex: 100,
  },
});
