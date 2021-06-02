import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const PILL_HEIGHT = 51;
export const ICON_SIZE = 28;
export const CIRCLE_COLOR = Colors.mist;

export const styles = StyleSheet.create({
  arrowLeft: {
    marginLeft: -4,
  },
  arrowRight: {
    marginRight: -4,
  },
  container: {
    backgroundColor: Colors.linen,
    display: 'flex',
    flex: 1,
  },
  topBox: {
    width: '95%',
    marginTop: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  calnav: {
    marginTop: 10,
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
  },
  theDate: {
    padding: 10,
  },
  navButtons: {
    paddingTop: 12,
    paddingHorizontal: 5,
    paddingLeft: 15,
    marginRight: -10,
  },
  monthDay: {
    fontSize: 12.5,
    fontFamily: 'lato-bold',
    color: Colors.lightCharcoal,
  },
  weekDay: {
    fontFamily: 'lato-bold',
    fontSize: 45,
    color: Colors.charcoal,
  },
});
