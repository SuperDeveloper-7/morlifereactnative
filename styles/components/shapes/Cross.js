import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cross: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 1,
    width: 18,
    height: 18,
  },
  crossUp: {
    backgroundColor: 'red',
    height: 18,
    width: 4,
  },
  crossFlat: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 4,
    width: 18,
    left: -7,
    top: 7,
  },
});
