import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Proptypes from 'prop-types';

import Spinner from '../components/Spinner';
import apiService from '../services/api.service';
import authService from '../services/auth.service';

import { styles } from '../styles/containers/appContainer';
import { SIGN_IN_SUCCESS } from '../store/user';

const fontConfig = {
  ...Ionicons.font,
  'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  'mor-icons': require('../assets/fonts/mor-icons.ttf'),
  'lato-heavy': require('../assets/fonts/Lato-Heavy.ttf'),
  'lato-bold': require('../assets/fonts/Lato-Bold.ttf'),
  'lato-medium': require('../assets/fonts/Lato-Medium.ttf'),
  lato: require('../assets/fonts/Lato-Regular.ttf'),
};

const morSpashAnimation = require('../assets/images/mor_splash_animation_orange.json');

function AppContainer({ children }) {
  const dispatch = useDispatch();
  const spinner = useSelector((state) => state.loading.spinner);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [isAnimationPlayed, setAnimationPlayed] = useState(false);
  const animation = useRef();

  const initApp = async () => {
    try {
      apiService.init();
      const user = await authService.authorizeToken();
      if (user) {
        dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        // init data
      } else {
      }
    } catch (e) {}
  };

  // const firebaseConfig = {
  //   apiKey: 'AIzaSyDnK-HY4z6D7Cdi9VURZ-SteRtCZBlnfqQ',
  //   authDomain: 'dash-91d7d.firebaseapp.com',
  //   databaseURL: 'https://dash-91d7d.firebaseio.com',
  //   projectId: 'dash-91d7d',
  //   storageBucket: 'dash-91d7d.appspot.com',
  //   messagingSenderId: '805115080367',
  //   appId: '1:805115080367:web:4ec718b4518ed5eea36e5a',
  //   measurementId: 'G-DDERN58SQ0',
  // };
  // const findUserInfo = (user) => {
  //   let email = user.email || null;
  //   let displayName = user.displayName || null;
  //   let photoURL = user.photoURL || null;

  //   const providerData = user.providerData || [];
  //   providerData.forEach((data) => {
  //     if (!email) {
  //       email = data.email;
  //     }
  //     if (!displayName) {
  //       displayName = data.displayName;
  //     }
  //     if (!photoURL) {
  //       photoURL = data.photoURL;
  //     }
  //   });

  //   return { email, displayName, photoURL };
  // };

  // async function initFirebaseAsync() {
  //   try {
  //     if (!firebase.apps.length) {
  //       firebase.initializeApp(firebaseConfig);
  //     }
  //     firebase.auth().onIdTokenChanged((fbuser) => {
  //       if (fbuser) {
  //         const { email, displayName, photoURL } = findUserInfo(fbuser);
  //         dispatch(signIn(fbuser.uid, displayName, photoURL, email));
  //       }
  //     });
  //   } catch (error) {
  //     // TODO: Error handling
  //   }
  // }

  // const initRoutinesAsync = async () => {
  //   const initFeed = await loadRoutinesFeed();
  //   dispatch(setRoutinesFeed(initFeed));
  //   const routineIds = initFeed.category_list
  //     .flatMap((cat) => initFeed.top[cat])
  //     .filter((id) => id);
  //   const initPublicRoutines = await loadPublicRoutines(routineIds);
  //   dispatch(setPublicRoutines(initPublicRoutines));
  //   const initPublicRoutineStats = await loadPublicRoutineStats(routineIds);
  //   dispatch(setPublicRoutineStats(initPublicRoutineStats));
  // };

  // Will be fired only once
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.hideAsync();
        // Load fonts
        await Font.loadAsync(fontConfig);
        await initApp();
        // await initFirebaseAsync();
        // const categories = await loadCategories();
        // dispatch(setCategories(categories));
        // initRoutinesAsync();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // TODO: Error handling
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const onPlayAnimation = () => {
    if (!isLoadingComplete) {
      animation.current.play();
      setAnimationPlayed(false);
    }
    setAnimationPlayed(true);
  };

  if (!isLoadingComplete || !isAnimationPlayed) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={morSpashAnimation}
          style={styles.loadingAnim}
          autoPlay={true}
          loop={false}
          onAnimationFinish={onPlayAnimation}
          ref={animation}
        />
      </View>
    );
  }

  return (
    <>
      {children}
      <Spinner visible={spinner} />
    </>
  );
}

AppContainer.defaultProps = {
  children: null,
};
AppContainer.propTypes = {
  children: Proptypes.node,
};

export default AppContainer;
