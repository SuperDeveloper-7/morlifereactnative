import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'lato-bold',
    backgroundColor: Colors.linen,
    paddingTop: 25,
  },
  contentContainer: {
    fontFamily: 'lato-bold',
    padding: 20,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  optionProfileIconContainer: {
    marginRight: 8,
  },
  option: {
    fontFamily: 'lato-bold',
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    marginVertical: 2,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
  },
  optionProfile: {
    height: 66,
    borderRadius: 33,
    paddingLeft: 10,
  },
  optionText: {
    fontSize: 15,
    color: Colors.morOrange,
    alignSelf: 'flex-start',
    fontFamily: 'lato-bold',
  },
  usernameText: {
    fontSize: 18,
    marginBottom: 2,
    color: Colors.morOrange,
    alignSelf: 'flex-start',
    fontFamily: 'lato-bold',
  },
  fullnameText: {
    fontSize: 11,
    color: Colors.morOrange,
    alignSelf: 'flex-start',
    fontFamily: 'lato-bold',
  },
  optionTextContainer: {
    justifyContent: 'center',
  },
  profileOptionView: {
    flexDirection: 'row',
  },
  profileOptionCenter: {
    justifyContent: 'center',
  },
  optionButtonRect: {
    flexDirection: 'row',
  },
  header: {
    color: Colors.morOrange,
    fontSize: 45,
    marginBottom: 25,
    fontFamily: 'lato-bold',
  },
});
