import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
export const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    borderTopEndRadius: 22,
    borderTopStartRadius: 22,
    paddingHorizontal: 9,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    paddingVertical: 33,
    paddingHorizontal: 28,
    backgroundColor: Colors.white,
  },
  footer: {
    borderBottomEndRadius: 22,
    borderBottomStartRadius: 22,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  headerLeft: {
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 10,
  },
  iconCategory: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    marginHorizontal: 7,
    alignSelf: 'center',
    fontFamily: 'lato-bold',
    fontSize: 15,
  },
  justYouText: {
    fontSize: 10,
    fontFamily: 'lato',
    color: Colors.charcoal,
  },
  hashtagText: {
    fontSize: 12.5,
    fontFamily: 'lato-bold',
  },
  smallDate: {
    fontSize: 10,
    fontFamily: 'lato',
    color: Colors.midGrey,
    marginVertical: 4,
  },
  quoteText: {
    fontSize: 15,
    fontFamily: 'lato-bold',
    textAlign: 'center',
    margin: 27,
    color: Colors.charcoal,
  },
  titleText: {
    fontSize: 25,
    fontFamily: 'lato-bold',
  },
  routineDescription: {
    fontSize: 12.5,
    fontFamily: 'lato-bold',
    color: Colors.charcoal,
  },
  checkCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  multipleChoiceDescription: {
    fontSize: 17,
    fontFamily: 'lato',
    color: Colors.lightCharcoal,
    marginTop: 12,
    marginBottom: 20,
  },

});
