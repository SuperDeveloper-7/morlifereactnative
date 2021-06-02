import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { BANNER_H } from '../../constants/HeaderSize';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.linen,
  },
  scrollViewContainer: {
    paddingVertical: 25,
    backgroundColor: Colors.linen,
  },
  categoryNameContainer: {
    flexDirection: 'row',
  },
  categoryName: {
    fontFamily: 'lato-bold',
    fontSize: 30,
    paddingLeft: 19,
  },
  categoryRoutineCount: {
    fontFamily: 'lato',
    fontSize: 15,
    marginTop: 3,
    marginLeft: 5,
  },
  categoryUpdateStatusContainer: {
    paddingTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 19,
  },
  categoryUpdateStatus: {
    fontFamily: 'lato',
    fontSize: 12.6,
    color: Colors.midGrey,
  },
  categoryUpdateIcon: {
    paddingRight: 5,
  },
  categoryDescription: {
    paddingLeft: 19,
    width: 239,
    height: 67,
    fontFamily: 'lato',
    fontSize: 17,
    color: Colors.charcoal,
    paddingBottom: 15,
  },
  separatingLine: {
    height: 1,
    backgroundColor: '#ece7e0',
  },
  bottomContainer: {
    marginTop: 48,
    alignSelf: 'center',
    width: 300,
    height: 227,
    backgroundColor: Colors.white,
    borderRadius: 33,
  },
  categoriesContainer: {
    alignSelf: 'center',
    width: 225,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryList: {
    paddingHorizontal: 7,
    paddingBottom: 7,
  },
  bottomTextContainer: {
    alignSelf: 'center',
    marginTop: 31,
    width: 242,
    height: 57,
  },
  bottomText: {
    alignSelf: 'center',
    color: Colors.midGrey,
    fontFamily: 'lato-bold',
    fontSize: 15,
  },
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: (scrollA) => ({
    height: BANNER_H,
    width: '150%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
});
