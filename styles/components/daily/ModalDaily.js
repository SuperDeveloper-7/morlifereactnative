import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const HEADER_FONT_SIZE = 17;

export const styles = StyleSheet.create({
  container: {
    paddingTop: 122,
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  headerDailyContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 9000,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 19,
  },
  headerCommunityContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9000,
    height: 142,
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 19,
    paddingVertical: 15,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  },
  roundedContainer: {
    paddingHorizontal: 31,
    paddingVertical: 9,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    alignItems: 'center',
    zIndex: 9999,
    position: 'absolute',
    bottom: 0,
    height: 80,
    backgroundColor: Colors.linen,
    flexDirection: 'row',
  },
  textTab: {
    fontSize: 10,
    fontFamily: 'lato-bold',
  },
  bottomHeaderCommunity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigTitle: {
    fontSize: 45,
    color: 'white',
    fontFamily: 'lato-bold',
    alignSelf: 'flex-end',
    letterSpacing: -1.35,
  },
  membersText: {
    fontFamily: 'lato',
    fontSize: 12.5,
    color: 'white',
    alignSelf: 'flex-end',
    paddingBottom: 6,
  },
});
