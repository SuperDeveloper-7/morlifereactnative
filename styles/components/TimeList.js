import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  timeButton: {
    height: 40,
    borderRadius: 7.5,
    padding: 10,
    marginHorizontal: 3,
    marginTop: 5,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
  },
  timeText: {
    marginBottom: 2,
    fontFamily: 'lato-bold',
    fontSize: 15,
  },
  timeList: {
    width: '100%',
    marginVertical: 5,
  },
  timeListItem: {
    width: '50%',
  },
  timeListView: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
});
