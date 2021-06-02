import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import TextStyle from '../../constants/TextStyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.linen,
  },
  contentContainer: {
    paddingTop: 30,
  },
  introParagraph: {
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  headingText: {
    ...TextStyle.highlightedText,
    marginBottom: 20,
  },
  introText: {
    color: Colors.mist,
    fontWeight: '500',
    textAlign: 'center',
  },
  routineList: {
    marginHorizontal: 10,
  },
  continueButton: {
    marginBottom: 40,
    marginHorizontal: 10,
  },
});
