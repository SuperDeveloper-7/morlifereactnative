import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

export const CIRCLE_SIZE = 55;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.linen,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchSection: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.mist,
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 2,
  },
  input: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    color: Colors.midGrey,
  },
  dropDownWindow: {
    position: 'absolute',
    top: 115,
    height: 1000,
    width: '200%',
    backgroundColor: Colors.white,
    padding: 10,
  },
  emptyState: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  emptyStateText: {
    fontSize: 10,
    color: Colors.mist,
  },
  Ionicon: {
    marginHorizontal: 8,
  },
  Image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cancelBtn: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    fontFamily: 'lato',
    fontSize: 12,
  },
  elipse: {
    marginTop: 5,
    height: 75,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  rightView: {
    marginLeft: 10,
  },
  nameText: {
    fontFamily: 'lato-bold',
    marginBottom: 2,
    fontSize: 15,
    color: Colors.charcoal,
  },
  nameSubText: {
    fontFamily: 'lato',
    color: Colors.charcoal,
    fontSize: 12,
  },
});
