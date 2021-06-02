import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const EXPANDED_ITEM_COUNT = 10;
export const bluredDotColor = '#f9af77';
export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  selectorContainer: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  scrollViewContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  saveButton: {
    marginHorizontal: 20,
  },
  saveText: {
    color: '#218cfa',
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  elipseSelector: {
    borderRadius: 35,
    borderTopLeftRadius: 10,
    flex: 3,
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  selectedRoutine: {
    flex: 1,
    margin: 10,
  },
  menuBoxContent: {
    flex: 1,
  },
  actionText: {
    color: '#e57e22',
    fontWeight: 'bold',
  },
  daySuperContainer: {
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerBox: {
    marginBottom: 5,
  },
  headerTextBox: {
    color: Colors.white,
    fontFamily: 'lato-bold',
    fontSize: 30,
    width: '70%',
    marginLeft: 19,
  },
  subHeaderTextBox: {
    color: Colors.white,
    fontFamily: 'lato',
    fontSize: 17,
    width: '100%',
    marginHorizontal: 19,
    marginTop: 10,
    marginBottom: 30,
  },
  menuBox: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: Colors.linen,
    minHeight: 385,
  },
  subMenuHeaderBox: {
    marginTop: 5,
    height: 20,
    marginBottom: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  goBackIcon: {
    marginTop: 4.5,
    alignItems: 'center',
  },
  subMenuHeader: {
    width: 320,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'lato',
    fontSize: 15,
    letterSpacing: -0.15,
    color: Colors.lightCharcoal,
  },
  selectionPanel: {
    flex: 4,
  },
  bottomButton: {
    paddingVertical: 16,
    paddingHorizontal: 23,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.midGrey,
    textAlign: 'right',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    alignSelf: 'flex-end',
    margin: 19,
  },
  bottomButtonText: {
    color: Colors.white,
    fontFamily: 'lato-bold',
  },
  bottomButtonBox: {
    flex: 0.5,
  },
});
