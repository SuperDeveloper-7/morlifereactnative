import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import TextStyle from '../../constants/TextStyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: '#dedede',
  },
  scroll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
  },
  scrollText: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.mist,
  },
  username: {
    color: Colors.mist,
  },
  nameContainer: {
    marginLeft: 10,
  },
  categoryView: {
    borderWidth: 1,
    borderColor: Colors.offWhite,
    height: 32,
    borderRadius: 16,
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    borderBottomLeftRadius: 5,
  },
  categoryText: {
    color: Colors.mist,
  },
  catContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  subContainer: {
    backgroundColor: Colors.linenSecondary,
    padding: 10,
  },
  calendarHead: {
    ...TextStyle.sectionHeadingText,
    fontSize: 24,
  },
});
