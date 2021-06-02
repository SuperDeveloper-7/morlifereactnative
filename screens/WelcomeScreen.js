import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { completeUserSetup } from '../api/firebase';
import { setInitilialized } from '../store/user/actions';
import { styles } from '../styles/screens/WelcomeScreen';
import Colors from '../constants/Colors';
import MorIcon from '../components/shapes/MorIcon';

export default function WelcomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleContinue = async () => {
    await completeUserSetup(user.uid);
    dispatch(setInitilialized());
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MorIcon name="logo" size={30} color={Colors.morOrange} style={styles.headerLogo} />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeHeader}>Welcome to Mor</Text>
        <Text style={styles.welcomeText}>
          Explore the habits, events, and passions of amazing people. Then build your calendar into
          the life you want to live.
        </Text>
      </View>
      <View style={styles.continueBox}>
        <TouchableOpacity onPress={() => handleContinue()}>
          <View style={styles.continueButton}>
            <Text style={styles.continueButtonText}>GO</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
