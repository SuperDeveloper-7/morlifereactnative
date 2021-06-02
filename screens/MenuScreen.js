import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import * as firebase from 'firebase';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import Proptypes from 'prop-types';

import MorFooterSign from '../components/MorFooterSign';
import MorIcon from '../components/shapes/MorIcon';
import { styles } from '../styles/screens/MenuScreen';
import Colors from '../constants/Colors';
import { signOut } from '../store/user/actions';
import Separator from '../components/Separator';

export default function MenuScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Menu</Text>
      <OptionButton
        label="Share Feedback"
        icon="exclamation"
        onPress={() => WebBrowser.openBrowserAsync('https://www.mor.do/')}
      />
      <OptionButton
        label="Support Center"
        icon="question-mark"
        onPress={() => WebBrowser.openBrowserAsync('https://www.mor.do/')}
      />
      <Separator color={Colors.lightGrey} />

      <OptionButton
        label="Privacy Policy"
        onPress={() => WebBrowser.openBrowserAsync('https://www.mor.do/legal/privacy-policy')}
      />
      <OptionButton
        label="Terms & Conditions"
        onPress={() =>
          WebBrowser.openBrowserAsync(
            'https://app.termly.io/document/terms-of-use-for-ios-app/2bc7c46a-4337-446b-ac03-f9c0c98837c0'
          )
        }
      />
      <Separator color={Colors.lightGrey} />
      <OptionButton
        icon="onoff"
        label="Logout"
        textColor={Colors.charcoal}
        onPress={async () => {
          await firebase.auth().signOut();
          dispatch(signOut());
          navigation.navigate('SignIn');
        }}
      />
      <MorFooterSign />
    </ScrollView>
  );
}

const OptionButton = ({ icon, label, onPress, textColor }) => {
  return (
    <RectButton style={styles.option} onPress={onPress}>
      <View style={styles.optionButtonRect}>
        <View style={styles.optionIconContainer}>
          <MorIcon name={icon} size={20} color={textColor || Colors.morOrange} />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={[styles.optionText, { color: textColor || styles.optionText.color }]}>
            {label}
          </Text>
        </View>
      </View>
    </RectButton>
  );
};
OptionButton.defaultProps = {
  icon: undefined,
  textColor: undefined,
};
OptionButton.propTypes = {
  icon: Proptypes.string,
  label: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired,
  textColor: Proptypes.string,
};
const ProfileOptionButton = ({ username, fullName, photoURL }) => {
  return (
    <RectButton style={[styles.option, styles.optionProfile]}>
      <View style={styles.profileOptionView}>
        <View style={styles.optionProfileIconContainer}>
          <Image
            source={{ uri: photoURL }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 48 / 2,
              borderWidth: 1,
              borderColor: Colors.mid,
            }}
          />
        </View>
        <View style={styles.profileOptionCenter}>
          <Text style={styles.usernameText}>{username}</Text>
          <Text style={styles.fullnameText}>{fullName}</Text>
        </View>
      </View>
    </RectButton>
  );
};

ProfileOptionButton.propTypes = {
  username: Proptypes.string.isRequired,
  fullName: Proptypes.string.isRequired,
  photoURL: Proptypes.string.isRequired,
};
