import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.linen,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: Colors.charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: Colors.morOrange,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 80,
    marginHorizontal: 5,
  },
  textStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: Colors.charcoal,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
});
