import * as React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import NavigationBack from '../components/NavigationBack';

import NavigationButton from '../components/NavigationButton';
import { setupResponsiveKeyboard } from '../util/keyboard';
import { setZipCode as firebaseSetZipCode, loadPublicRoutines } from '../api/firebase';
import RoutineManager from '../model/RoutineManager';

import { styles } from '../styles/screens/SetZipCodeScreen';

const ZIP_CODE_LENGTH = 5;

export default function SetZipCodeScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  const [zipCode, setZipCode] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');
  const visibleHeightDiff = setupResponsiveKeyboard();
  const dispatch = useDispatch();

  const routineManager = new RoutineManager(user.uid, dispatch);
  const [iscontinue, setIscontinue] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <NavigationBack style={styles.backButton} onPress={navigation.goBack} />,
    });
  }, [navigation]);

  const addWakeupandBedTime = async () => {
    const wakeandbedtime = await loadPublicRoutines([
      '6pzSPS9haASgioV3onVZ',
      'N9jmJh3lS3jLJ7zd1kuu',
    ]);

    await routineManager.addPublicRoutine({
      ...wakeandbedtime['6pzSPS9haASgioV3onVZ'],
      start_time: null,
    });
    await routineManager.addPublicRoutine({
      ...wakeandbedtime['N9jmJh3lS3jLJ7zd1kuu'],
      start_time: null,
    });
  };
  const handleContinue = async () => {
    setErrMsg('');
    if (zipCode.length !== ZIP_CODE_LENGTH) {
      setErrMsg('Oops! Zip codes must be 5 characters');
      return;
    }
    if (iscontinue) {
      navigation.navigate('WelcomeScreen');
      return;
    }
    setIscontinue(true);
    await firebaseSetZipCode(user.uid, zipCode);
    await addWakeupandBedTime();
    navigation.navigate('WelcomeScreen');
  };

  const setValidateZipCode = (text) => {
    const validZipCode = text.replace(/[^0-9]/g, '').slice(0, ZIP_CODE_LENGTH);
    setZipCode(validZipCode);
    return false;
  };

  return (
    <View style={[styles.container, { marginBottom: visibleHeightDiff }]}>
      <View style={styles.rectanglePassive} />
      <View style={styles.rectangleActive} />
      <Text h6={true} style={styles.headingText}>
        What&apos;s your zip code?
      </Text>
      <Text style={styles.introText}>
        Knowing your area will help Mor bring you closer to local communities and experiences
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={zipCode}
          onChangeText={(text) => setValidateZipCode(text)}
          keyboardType="numeric"
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          style={styles.inputText}
          placeholder="11249"
          placeholderTextColor="rgba(255,255,255, 0.3)"
        />
      </View>
      <Text style={styles.errMsg}>{errMsg}</Text>
      <View style={styles.spacingBlock} />
      <NavigationButton style={styles.continueButton} text="NEXT" onPress={handleContinue} />
    </View>
  );
}
