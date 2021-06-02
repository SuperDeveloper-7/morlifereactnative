import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const CIRCLE_SIZE = 50;
export const ICON_SIZE = 16;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  headerBox: {
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  headerTextBox: {
    color: Colors.white,
    fontFamily: 'lato-bold',
    fontSize: 30,
    width: '100%',
    marginLeft: 19,
    marginBottom: 40,
  },
  menuBox: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: Colors.linen,
    minHeight: 435,
  },
  menuBoxContent: {
    flex: 1,
  },
  selectedRoutine: {
    flex: 1,
    margin: 10,
  },
  menuOptions: {
    flex: 4,
  },
  typeSelectionContainer: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  typeSelectionMenu: {
    flex: 3,
    flexDirection: 'column',
    shadowColor: '#000',
    marginBottom: 6,
    shadowOffset: {
      width: 0.3,
      height: 0.4,
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  typeSelectionMenuOption: {
    flex: 1,
  },
  repeatType: {
    marginLeft: 19,
    marginRight: 19,
    marginBottom: 10,
    backgroundColor: Colors.white,
    marginTop: 5,
    flex: 1,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
  },
  optionText: {
    paddingLeft: 15,
    fontSize: 17,
    fontFamily: 'lato-bold',
    color: Colors.charcoal,
    marginBottom: 4,
  },
  optionDescription: {
    paddingLeft: 15,
    fontSize: 12.5,
    fontFamily: 'lato',
    color: Colors.midGrey,
  },
  subMenuHeaderBox: {
    marginTop: 5,
    height: 20,
    marginBottom: 13,
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
  weekdaySelectionContainer: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  weekdaySelectionBox: {
    flex: 3,
    marginTop: 4,
    marginLeft: 19,
    marginRight: 19,
  },
  weekdaySelection: {
    flex: 1,
    flexDirection: 'column',
  },
  weekOrMonthBox: {
    flexDirection: 'row',
    marginHorizontal: 19,
    marginBottom: 16,
  },
  frequencyRepeatOption: {
    flex: 1,
    marginRight: 2.5,
  },
  aimToDoTextBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  aimToDoText: {
    fontSize: 17,
    fontFamily: 'lato-bold',
    color: Colors.charcoal,
  },
  onTheseDaysTextBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  onTheseDaysText: {
    fontSize: 17,
    fontFamily: 'lato-bold',
    color: Colors.charcoal,
  },
  frequencySelectionContainer: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  frequencySelection: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    height: 55,
  },
  frequencyCircle: {
    padding: 5,
  },
  everyTextBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
  everyText: {
    fontSize: 17,
    fontFamily: 'lato-bold',
    color: Colors.charcoal,
  },
  pillButtonText: {
    fontSize: 17,
    fontFamily: 'lato-bold',
    color: Colors.white,
  },
  nextButtonContainer: {
    flex: 1,
  },
  addButtonContainer: {
    flex: 1,
  },
  bottomButtonBox: {
    flex: 1,
    marginRight: 19,
  },
  bottomButton: {
    paddingVertical: 16,
    paddingHorizontal: 38.5,
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
  },
  bottomButtonText: {
    color: Colors.white,
    fontFamily: 'lato-bold',
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    marginHorizontal: 8,
  },
  timeButton: {
    height: 48,
    borderRadius: 24,
    padding: 14,
    marginHorizontal: 3,
    marginTop: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
  separatingLine: {
    height: 1,
    marginBottom: 16,
    backgroundColor: Colors.offWhite,
  },
  menuArrow: {
    transform: [{ scaleX: -1 }],
  },
});
