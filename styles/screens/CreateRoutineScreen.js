import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.linen,
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  saveButton: {
    width: 280,
  },
  input: {
    marginVertical: 5,
    width: '100%',
    justifyContent: 'flex-start',
  },
  categories: {
    height: undefined, // override fixed height style of ComponentStyle.inputContainer
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  category: {
    width: 160,
    height: 40,
    borderRadius: 20,
    margin: 2,
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textOpticiy,
  },
});
