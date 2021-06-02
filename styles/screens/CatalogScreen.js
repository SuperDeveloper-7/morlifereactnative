import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const lineColor = '#ece7e0';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  contentContainer: {},
  category: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  categoryRoutineList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryRoutineTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 19,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 25,
    fontFamily: 'lato-bold',
  },
  categoryTextCounter: {
    marginTop: 5,
    fontSize: 15,
    fontFamily: 'lato-bold',
    color: '#706a65',
    paddingRight: 19,
  },
  header: {
    backgroundColor: '#ff8024',
    marginBottom: 10,
    paddingLeft: 19,
    paddingTop: 5,
    paddingBottom: 16,
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: 'lato-bold',
    color: '#ffffff',
  },
  updateText: {
    fontSize: 17,
    fontFamily: 'lato',
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 5,
  },
  horizontalScrollView: {
    alignItems: 'center',
    paddingBottom: 14,
  },
  categoryList: {
    paddingHorizontal: 14,
  },
  categoryListItem: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  journeyList: {
    marginTop: 15,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 260,
    marginLeft: 0,
    paddingLeft: 19,
  },
  journeyItem: {
    width: 194,
    borderRadius: 40,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  journeyItemMarginFixer: {
    width: 19,
  },
  journeyImage: {
    width: '100%',
    height: 123,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  journeyInfo: {
    width: '100%',
    height: 117,
    backgroundColor: '#53c69c',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  journeyTextBox: {
    width: '80%',
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 19,
  },
  journeyMoves: {
    fontFamily: 'lato-bold',
    fontSize: 12.5,
    color: '#ffffff',
    paddingTop: 2,
  },
  journeyTitle: {
    fontFamily: 'lato-bold',
    fontSize: 25,
    color: '#ffffff',
    marginTop: 2,
  },
  journeyAuthorBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  journeyAuthor: {
    fontFamily: 'lato-bold',
    fontSize: 12.5,
    color: '#ffffff',
    marginTop: 1,
  },
  journeyAvatar: {
    width: 20,
    height: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1.5,
    marginRight: 5,
  },
  journeyLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#ece7e0',
  },
});
