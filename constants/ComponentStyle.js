import { StyleSheet } from 'react-native';
import Colors from './Colors';

const ComponentStyle = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.mist,
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 2,
    marginTop: 10,
  },
  inputText: {
    backgroundColor: 'transparent',
    color: Colors.charcoal,
    borderBottomColor: Colors.morOrangeLight,
    borderBottomWidth: 1,
    fontSize: 17,
    lineHeight: 23,
    paddingBottom: 12,
    color: Colors.white,
    marginBottom: 10,
  },
});

export default ComponentStyle;
