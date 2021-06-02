import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const HEADER_ICON_SIZE = 22;
export const HEADER_FONT_SIZE = 17;
export const UI_FONT_SIZE = 14;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.linen,
    paddingTop: 10,
  },
  saveText: {
    color: Colors.mist,
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  elipseSelector: {
    marginTop: 5,
    borderRadius: 35,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  reverseElipse: {
    marginTop: 5,
    borderRadius: 35,
    borderTopLeftRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  routineList: {
    marginHorizontal: 10,
  },
  dayContainer: {
    borderRadius: 24,
    padding: 10,
    paddingLeft: 12,
    marginBottom: 4,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
  },
  dayContainerView: {
    flex: 1,
  },
  dayContainerText: {
    marginHorizontal: 8,
    color: Colors.textOpticiy,
    fontSize: HEADER_FONT_SIZE,
  },
  dropdown: {
    marginHorizontal: 8,
  },
  collapseItemContent: {
    width: '100%',
    paddingBottom: 10,
    padding: 10,
  },
  textInput: {
    color: Colors.white,
    flex: 1,
    borderRadius: 24,
    paddingLeft: 20,
    padding: 10,
    fontSize: HEADER_FONT_SIZE,
  },
  pillButtonView: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  pillButtonText: {
    color: Colors.white,
    fontSize: UI_FONT_SIZE,
  },
  largeDropdownView: {
    padding: 20,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  largeDropdownText: {
    color: Colors.white,
    fontSize: HEADER_FONT_SIZE,
    marginLeft: 8,
  },
  navigationView: {
    margin: 10,
  },
  editorView: {
    alignSelf: 'stretch',
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 24,
    flexDirection: 'row',
  },
  frequencyView: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  frequencyCircle: {
    marginHorizontal: 2,
  },
  frequencyRepeatView: {
    marginHorizontal: 2,
    flex: 1,
  },
  goalTextInput: {
    marginBottom: 5,
  },
  goalView: {
    marginHorizontal: 2,
    flex: 1,
  },
  reverseElipseSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reverseElipseText: {
    color: Colors.white,
    fontSize: 17,
    flex: 1,
    marginLeft: 10,
  },
  reverseTouchableView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 24,
  },
  reverseIcon: {
    marginLeft: 10,
  },
  reverseText: {
    marginLeft: 10,
    marginRight: 20,
    color: Colors.white,
  },
  privacyDropdown: {
    margin: 10,
    marginRight: 20,
  },
  privacyCollapse: {
    width: '100%',
    marginVertical: 2,
  },
  pillContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
