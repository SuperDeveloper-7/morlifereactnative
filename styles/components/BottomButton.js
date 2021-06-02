import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const HEADER_FONT_SIZE = 17;

export const styles = StyleSheet.create({
    bottomButton: {
        paddingVertical: 16,
        paddingHorizontal: 23,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.midGrey,
        textAlign: 'right',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        alignSelf: 'flex-end',
        margin: 6,
      },
      bottomButtonText: {
        color: Colors.white,
        fontFamily: 'lato-bold',
      },
});
