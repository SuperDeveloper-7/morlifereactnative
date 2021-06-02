import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const HEADER_FONT_SIZE = 17;

export const styles = StyleSheet.create({
  choice: {
    borderRadius: 50,
    marginVertical: 3,
    padding: 12,
    flexDirection: 'row',
  },
  container: {
    borderWidth: 2,
    borderColor: Colors.lightGrey,
  },
  containerSelected: {
    marginVertical: 3,
  },
  borderCircle: {
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    marginRight: 7,
  },
  choiceText: {
    fontSize: 15,
    fontFamily: 'lato',
    alignSelf: 'center',
  },
  selectedCircle: {
    marginRight: 7,
  },
});
