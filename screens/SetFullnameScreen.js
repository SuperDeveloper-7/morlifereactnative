import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import NavigationBack from '../components/NavigationBack';
import NavigationButton from '../components/RoundButton';
import { setupResponsiveKeyboard } from '../util/keyboard';
import { extractFullName } from '../services/auth.service';

import { SIGN_OUT_SUCCESS, selectOauthCredentials } from '../store/user';

import ComponentStyle from '../constants/ComponentStyle';
import { styles } from '../styles/screens/SetFullnameScreen';
import Colors from '../constants/Colors';

const MIN_NAME_LENGTH = 1;

export default function SetFullNameScreen({ navigation }) {
  const oauthCredentials = useSelector(selectOauthCredentials);
  const dispatch = useDispatch();
  const fullName = extractFullName(oauthCredentials);
  const [firstName, setFirstName] = useState(fullName.firstName);
  const [lastName, setLastName] = useState(fullName.lastName);
  const [errMsg, setErrMsg] = useState('');
  const visibleHeightDiff = setupResponsiveKeyboard();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <NavigationBack
          style={styles.backButton}
          onPress={() => dispatch({ type: SIGN_OUT_SUCCESS })}
        />
      ),
      title: 'Sign Up',
      headerTitleStyle: styles.title,
    });
  });

  const isNextable = useMemo(
    () =>
      firstName.length >= MIN_NAME_LENGTH && lastName.length >= MIN_NAME_LENGTH,
    [firstName, lastName]
  );

  const handleContinue = () => {
    navigation.navigate('SetUsername', {
      firstName,
      lastName,
    });
  };

  return (
    <View style={[styles.container, { marginBottom: visibleHeightDiff }]}>
      <Text style={styles.headingText}>What is your name?</Text>
      <Text style={styles.introText}>Please enter your full name</Text>
      <View style={styles.space0} />

      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        style={[ComponentStyle.inputText, styles.input]}
        selectionColor={Colors.white}
        placeholder="First name"
        placeholderTextColor={Colors.morOrangeLight}
      />

      <TextInput
        value={lastName}
        onChangeText={setLastName}
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        style={ComponentStyle.inputText}
        selectionColor={Colors.white}
        placeholder="Last name"
        placeholderTextColor={Colors.morOrangeLight}
      />

      <Text style={styles.error}>{errMsg}</Text>

      <NavigationButton
        style={styles.continueButton}
        color={Colors.morOrange}
        disabled={!isNextable}
        disabledTextColor={Colors.morOrange}
        disabledBackgroundColor={Colors.morOrangeDark}
        onPress={handleContinue}
      >
        Next
      </NavigationButton>
    </View>
  );
}
