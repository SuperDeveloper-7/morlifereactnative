import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  contentContainer: {
    margin: 10,
  },
  feedPage: {
    marginBottom: 40,
  },
  separatorLine: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.lightGrey,
  },
  separatorPill: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    height: 28,
    borderRadius: 14,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  seperatorView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seperatorText: {
    color: Colors.offWhite,
  },
  flippedElipse: {
    height: 40,
    marginVertical: 4,
    borderRadius: 20,
    borderTopLeftRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  feedPageText: {
    fontSize: 10,
    marginLeft: 10,
    color: Colors.textOpticiy,
  },
  noActivity: {
    color: Colors.offWhite,
    marginTop: 30,
  },
});
