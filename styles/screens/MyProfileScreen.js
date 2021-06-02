import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import TextStyle from '../../constants/TextStyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: Colors.linen,
  },
  sloganText: {
    fontFamily: 'lato',
    fontWeight: '800',
    flex: 3,
    fontSize: 12.5,
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  usernameText: {
    fontFamily: 'lato-bold',
    fontSize: 12.5,
    fontWeight: '800',
    color: Colors.white,
    paddingTop: 15,
  },
  topHeader: {
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
  },
  bottomHeader: {
    paddingVertical: 30,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  titleName: {
    fontSize: 45,
    color: Colors.white,
    fontFamily: 'lato-bold',
  },
  row: {
    flexDirection: 'row',
  },
  moveContainer: {
    paddingVertical: 10,
    borderColor: Colors.lightGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  insideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 19,
    paddingRight: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  dotSeparator: {
    marginHorizontal: 2,
    alignSelf: 'center',
  },
  routineContainer: {
    marginLeft: 10,
  },
  titleRoutine: {
    ...TextStyle.titleText,
    fontSize: 25,
    marginVertical: 15,
    marginHorizontal: 19,
  },
  imageHeader: {
    width: '100%',
    height: '100%',
  },
  moveText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.charcoal,
  },
  cameraIcon: {
    marginHorizontal: 5,
  },
  durationMinutes: {
    ...TextStyle.setupDetailText,
    textDecorationLine: 'underline',
  },
  subContainer: {
    backgroundColor: Colors.linen,
  },
  setupText: {
    ...TextStyle.setupDetailText,
  },
});
