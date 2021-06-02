import React, { useEffect, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import TabNavigator from './TabNavigator';
import SetupNavigator from './SetupNavigator';

import SingInScreen from '../screens/SignInScreen';
import CategoryScreen from '../screens/CategoryScreen';
import EditRoutineScreen from '../screens/EditRoutineScreen';
import SetWakeBedTimeScreen from '../screens/SetWakeBedTimeScreen';
import RoutineAdder from '../screens/RoutineAdderScreen';
import AnimationScreen from '../screens/AnimationScreen';
import ProfileScreen from '../screens/ProfileScreen';

import {
  SIGN_OUT_SUCCESS,
  selectIsAuthenticated,
  selectOauthCredentials,
} from '../store/user';

import { styles } from '../styles/navigation/MainNavigator';

const Stack = createStackNavigator();

const SingInStack = () => (
  <>
    <Stack.Screen
      name="Animation"
      component={AnimationScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SignIn"
      component={SingInScreen}
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
    />
  </>
);

const SetupStack = () => (
  <Stack.Screen
    name="SetupNavigator"
    component={SetupNavigator}
    options={{
      headerStyle: styles.defaultStackHeaders,
      title: '',
      headerShown: false,
    }}
  />
);

const DefaultStack = () => (
  <>
    <Stack.Screen
      name="Root"
      component={TabNavigator}
      options={{
        headerStyle: styles.rootStackHeader,
        title: '',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditRoutine"
      component={EditRoutineScreen}
      options={{
        headerStyle: styles.defaultStackHeaders,
        title: 'Edit Routine',
      }}
    />
    <Stack.Screen
      name="SetTimes"
      component={SetWakeBedTimeScreen}
      options={{
        headerStyle: styles.defaultStackHeaders,
        title: 'Edit Routine',
      }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerStyle: styles.defaultStackHeaders,
        title: '',
      }}
    />
    <Stack.Screen
      name="Category"
      component={CategoryScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RoutineAdder"
      component={RoutineAdder}
      options={{
        title: '',
        headerShown: false,
      }}
    />
  </>
);

const MainNavigator = () => {
  const oauthCredentials = useSelector(selectOauthCredentials);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const stack = useMemo(
    () =>
      isAuthenticated
        ? DefaultStack()
        : oauthCredentials
        ? SetupStack()
        : SingInStack(),
    [isAuthenticated, oauthCredentials]
  );

  // Temparary code to sign out
  // useEffect(() => {
  //   dispatch({ type: SIGN_OUT_SUCCESS });
  // }, []);

  // On user credential change
  // React.useEffect(() => {
  //   async function signInAsync() {
  //     await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  //     let credentials = null;
  //     if (user.credentials.type === CREDENTIALS_TYPE_GOOGLE) {
  //       credentials = firebase.auth.GoogleAuthProvider.credential(null, user.credentials.token);
  //     } else if (user.credentials.type === CREDENTIALS_TYPE_APPLE) {
  //       const { identityToken, authorizationCode } = user.credentials.credential;
  //       const provider = new firebase.auth.OAuthProvider('apple.com');
  //       credentials = provider.credential(identityToken, authorizationCode);
  //     }
  //     firebase
  //       .auth()
  //       .signInWithCredential(credentials)
  //       .then(() => {
  //         // TODO:
  //       })
  //       .catch(() => {
  //         // TODO: Error handling
  //       });
  //   }
  //   if (user.credentials) {
  //     signInAsync();
  //   }
  // }, [user.credentials]);
  // On user id change
  // React.useEffect(() => {
  //   if (!user.uid) {
  //     return;
  //   }
  //   const setUserProfile = (profile) => {
  //     if (!profile) return;
  //     dispatch(setProfile(profile));
  //     dispatch(setLoading(false));
  //   };
  //   loadUserProfile(user.uid).then((profile) => {
  //     onUserProfileChanged(user.uid, (_profile) => setUserProfile(_profile));
  //     if (!profile) {
  //       createNewProfile(user.uid, user.email, user.displayName, user.photoURL);
  //     } else {
  //       setUserProfile(profile);
  //     }
  //   });
  //   loadCategories().then((categories) => {
  //     dispatch(setCategories(categories));
  //   });
  // }, [user.uid]);

  return <Stack.Navigator headerMode="screen">{stack}</Stack.Navigator>;
};

export default MainNavigator;
