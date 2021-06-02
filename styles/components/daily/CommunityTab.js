import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const HEADER_FONT_SIZE = 17;

export const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 19,
  },
  transparentView: {
    backgroundColor: Colors.lightGreyView,
    paddingTop: 14,
    paddingBottom: 18,
    paddingHorizontal: 19,
    borderRadius: 15,
  },
  dateText: {
    fontSize: 12.5,
    fontFamily: 'lato-bold',
    lineHeight: 15,
    color: Colors.charcoal,
  },
  dateToday: {
    color: Colors.lightCharcoal,
  },
  communityUserSection: {
    marginVertical: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  communityUserImage: {
    width: 88,
    height: 88,
    borderRadius: 33,
    borderColor: 'rgba(112, 106, 101, 0.05)',
    borderWidth: 1,
  },
  communityUserProfile: {
    alignItems: 'center',
  },
  communityUserName: {
    marginTop: 7,
    fontFamily: 'lato-bold',
    fontSize: 12.5,
    color: Colors.charcoal,
  },
  communityUserId: {
    marginTop: 1,
    fontFamily: 'lato',
    fontSize: 10,
    color: Colors.midGrey,
  },
});
