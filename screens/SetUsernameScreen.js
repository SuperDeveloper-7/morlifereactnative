import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import NavigationButton from '../components/RoundButton';
import CustomInput from '../components/CustomInput';
import MorIcon from '../components/shapes/MorIcon';
import { setupResponsiveKeyboard } from '../util/keyboard';

import { SIGN_UP_START, selectOauthCredentials } from '../store/user';

import { styles } from '../styles/screens/SetUsernameScreen';
import Colors from '../constants/Colors';

const MIN_USERNAME_LENGTH = 3;

export default function SetUsernameScreen({ navigation, route }) {
  const { firstName, lastName } = route.params;
  const [username, setUsername] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const visibleHeightDiff = setupResponsiveKeyboard();
  const oauthCredentials = useSelector(selectOauthCredentials);
  const dispatch = useDispatch();

  const isValid = useMemo(() => username.length >= MIN_USERNAME_LENGTH, [
    username,
  ]);

  const appendItem = useMemo(
    () =>
      isValid && <MorIcon name="last-updated" size={19} color={Colors.white} />,
    [isValid]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
      title: 'Sign Up',
      headerTitleStyle: styles.title,
    });
  }, [navigation]);

  const signup = () =>
    dispatch({
      type: SIGN_UP_START,
      payload: {
        ...oauthCredentials,
        signup: {
          firstName,
          lastName,
          username,
        },
      },
    });

  const setValidUsername = (text) => {
    setUsername(text.replace(/[^0-9a-zA-Z-_\.]/g, ''));
  };

  return (
    <View style={[styles.container, { marginBottom: visibleHeightDiff }]}>
      <Text style={styles.headingText}>Create a username</Text>
      <Text style={styles.introText}>You can always change this later</Text>
      <View style={styles.space0} />
      <CustomInput
        value={username}
        style={styles.inputContainer}
        prefix={<Text style={styles.inputPrefix}>@</Text>}
        inputStyle={styles.inputText}
        append={appendItem}
        autoCompleteType="off"
        autoCapitalize="none"
        autoFocus={true}
        autoCorrect={false}
        selectionColor={Colors.white}
        placeholder="username"
        placeholderTextColor={Colors.morOrangeLight}
        onChangeText={setValidUsername}
      />
      <Text style={styles.error}>{errMsg}</Text>
      <NavigationButton
        style={styles.continueButton}
        color={Colors.morOrange}
        disabled={!isValid}
        disabledTextColor={Colors.morOrange}
        disabledBackgroundColor={Colors.morOrangeDark}
        onPress={signup}
      >
        Sign Up
      </NavigationButton>
    </View>
  );
}
