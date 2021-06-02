import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const CIRCLE_SIZE = 50;
export const BLURRED_WHITE = 'rgba(255, 255, 255, 0.71)';

export const styles = StyleSheet.create({
  elipse: {
    marginTop: 5,
    height: 70,
    borderRadius: 35,
    borderBottomLeftRadius: 10,
    flex: 1,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  halfElipse: {
    marginTop: 5,
    height: 70,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    justifyContent: 'center',
  },
  pill: {
    marginTop: 5,
    height: 70,
    borderRadius: 35,
    width: 100,
    justifyContent: 'center',
  },
  fullCover: {
    backgroundColor: 'black',
    marginTop: 5,
    height: 70,
    width: 200,
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
  lastMenuItem: {
    marginLeft: 20,
    paddingLeft: 70,
    marginTop: 5,
    height: 70,
    justifyContent: 'center',
  },
  menuText: {
    color: Colors.white,
    marginLeft: -60,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  iconButtons: {
    alignSelf: 'center',
  },
  itemView: {
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rightView: {
    marginLeft: 10,
  },
  nameText: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  addButton: {
    marginLeft: 2,
    marginTop: 2,
  },
});
