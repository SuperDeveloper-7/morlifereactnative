import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import TextStyle from '../../constants/TextStyle';

export const marginToHide = -40;
export const lineColor = '#ece7e0';
export const refreshColor = '#706a65';
export const refreshSIZE = 17;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  routineListItem: {
    marginHorizontal: 10,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyHeading: {
    ...TextStyle.paragraph,
    maxWidth: 200,
    padding: 5,
  },
  emptyButton: {
    marginTop: 12,
    width: 280,
  },
  suggestedBox: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 5,
  },
  suggestedTitle: {
    width: 184,
    height: 30,
    marginLeft: 18,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'lato-bold',
    fontSize: 25,
    textAlign: 'left',
    color: Colors.charcoal,
  },
  suggestedLine: {
    width: '100%',
    height: 1,
    marginTop: 24,
    marginBottom: 18,
    backgroundColor: '#ece7e0',
  },
  suggestedRefresh: {
    display: 'flex',
  },
  suggestedRoutine: {
    marginLeft: 10,
    marginRight: 10,
  },
  suggestedMore: {
    marginTop: 13,
    marginRight: -14,
    width: 150,
    fontFamily: 'lato-bold',
    fontSize: 15,
    color: '#706a65',
    fontWeight: '800',
    display: 'flex',
  },
  renderMenu: {
    marginLeft: marginToHide,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  routineBorder: {
    borderBottomWidth: 1,
    borderBottomColor: lineColor,
  },
});
