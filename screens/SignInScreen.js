import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';

import { PRIVACY_POLICY_URL, TERMS_OF_USER_URL } from '@env';

import {
  AppleLogo,
  GoogleLogo,
  morSpashAnimation,
} from '../services/resource.service';

import RoundButton from '../components/RoundButton';
import { styles } from '../styles/screens/SignInScreen';
import Colors from '../constants/Colors';

import { GOOGLE_SIGN_IN_START, APPLE_SIGN_IN_START } from '../store/user';

export default function SignInScreen() {
  const dispatch = useDispatch();
  const signin = useCallback((type) => dispatch({ type }), [dispatch]);

  const onPrivacyPress = () => {
    WebBrowser.openBrowserAsync(PRIVACY_POLICY_URL);
  };

  const onTermsPress = () => {
    WebBrowser.openBrowserAsync(TERMS_OF_USER_URL);
  };

  return (
    <View style={styles.container}>
      <View style={styles.space0} />

      <LottieView
        source={morSpashAnimation}
        style={styles.loadingAnim}
        autoPlay={true}
        loop={false}
        duration={3000}
      />

      <Text style={styles.title}>Let's do more</Text>
      <Text style={styles.description}>
        Discover daily activities and events, follow calendars, and build a
        better lifestyle.
      </Text>

      <View style={styles.space1} />

      <RoundButton
        icon={<AppleLogo fill={Colors.black} />}
        style={styles.button}
        color={Colors.morOrange}
        onPress={() => signin(APPLE_SIGN_IN_START)}
      >
        Continue with Apple
      </RoundButton>
      <RoundButton
        icon={<GoogleLogo />}
        style={styles.button}
        color={Colors.morOrange}
        onPress={() => signin(GOOGLE_SIGN_IN_START)}
      >
        Continue with Google
      </RoundButton>

      <View style={styles.space2} />

      <Text style={styles.notice}>
        By signing up, you agree to our{' '}
        <Text onPress={onTermsPress} style={styles.hyperlink}>
          Terms of Service
        </Text>{' '}
        and acknowledge that you have read our{' '}
        <Text onPress={onPrivacyPress} style={styles.hyperlink}>
          Privacy Policy
        </Text>{' '}
        to learn how we collect, use, and share your data.
      </Text>
    </View>
  );
}
