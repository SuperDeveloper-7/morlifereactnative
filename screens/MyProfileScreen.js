import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { setLoading } from '../store/loading/actions';

import { DEFAULT_PROFILE_IMAGE_URL } from '../constants/User';
import Colors from '../constants/Colors';
import { styles } from '../styles/screens/MyProfileScreen';
import { getMyRoutines } from '../store/routines/selectors';
import Circle from '../components/shapes/Circle';
import MorIcon from '../components/shapes/MorIcon';
import MorFooterSign from '../components/MorFooterSign';
import Separator from '../components/Separator';
import { setProfile } from '../store/user/actions';
import { uploadImageAsync } from '../api/storage';
import { loadUserProfile, setProfilePhoto } from '../api/firebase';

const { height } = Dimensions.get('window');

// Temp code
export default function Temp() {
  return (
    <View>
      <Text>MyProfileScreen</Text>
    </View>
  );
}

function MyProfileScreen() {
  const user = useSelector((state) => state.user);
  const username = user.username || 'username';
  const name = user.displayName || '[Full Name]';
  const photoURL = user.photoURL || DEFAULT_PROFILE_IMAGE_URL;
  const categories = useSelector((state) => state.routines.categories);
  const myRoutines = useSelector(getMyRoutines);
  const navTitleView = useRef(null);
  const dispatch = useDispatch();

  const [image, setImage] = useState(photoURL);

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };
  const renderMove = (moves) => {
    return moves.map((move, index) => {
      const marginSeparator = index === moves.length - 1 ? 0 : 10;
      return (
        <View key={move.id}>
          <View style={styles.moveContainer}>
            <View style={styles.insideContainer}>
              <Circle
                color={categories[move.category_id].colors.dark}
                size={50}
              >
                <MorIcon
                  name={categories[move.category_id].icon_name}
                  size={20}
                  color={Colors.white}
                />
              </Circle>
              <View style={styles.routineContainer}>
                <Text style={styles.moveText}>{move.name}</Text>
                <View style={styles.row}>
                  <Text style={styles.setupText}>
                    {' '}
                    {move.repeat_type === 'repeat_day' ? 'Daily' : 'Weekly'}
                  </Text>
                  <Circle
                    color={Colors.midGrey}
                    size={3}
                    style={styles.dotSeparator}
                  />
                  {move.duration_minutes && (
                    <Text style={styles.durationMinutes}>
                      {` ${move.duration_minutes} Minutes`}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          <Separator
            style={{ marginHorizontal: marginSeparator }}
            color={Colors.lightGrey}
          />
        </View>
      );
    });
  };
  const renderMoves = () => {
    return myRoutines.map((item) => {
      return (
        <View key={item.timeofDay}>
          <Text style={styles.titleRoutine}>{item.timeofDay}</Text>
          {renderMove(item.moves)}
        </View>
      );
    });
  };
  const handleImagePicked = async (pickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        dispatch(setLoading(true));
        // upload picture on firebase storage
        const uploadUrl = await uploadImageAsync(pickerResult);
        try {
          // update url photo on firebase
          const responseSetProfilePhoto = await setProfilePhoto(
            user.uid,
            uploadUrl
          );
          // get profile from firebase
          if (responseSetProfilePhoto.success) {
            const profile = await loadUserProfile(user.uid);
            dispatch(setProfile(profile));
            setImage(uploadUrl);
          } else {
            alert('Upload failed, sorry :(');
          }
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
        }
      }
    } catch (e) {
      dispatch(setLoading(false));
      alert('Upload failed, sorry :(');
    }
  };

  const pickImage = async () => {
    getPermissionAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    handleImagePicked(result);
  };

  return (
    <View style={styles.container}>
      <ImageHeaderScrollView
        maxHeight={height / 2}
        minHeight={120}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0}
        disableHeaderGrow={true}
        scrollViewBackgroundColor={Colors.linen}
        renderHeader={() => (
          <ImageBackground source={{ uri: image }} style={styles.imageHeader}>
            <View style={styles.imgContainer}>
              <View style={styles.topHeader}>
                <View />
                <Text style={[styles.usernameText]}>@{username} (me)</Text>
                <View />
              </View>
              <LinearGradient
                colors={[Colors.transparent, Colors.opacityHeaderProfile]}
              >
                <View style={styles.bottomHeader}>
                  <Text style={styles.titleName}>{name}</Text>
                </View>
              </LinearGradient>
            </View>
          </ImageBackground>
        )}
        renderTouchableFixedForeground={() => (
          <View
            style={{
              position: 'absolute',
              right: 25,
              top: 70,
            }}
          >
            <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
              <MorIcon name="camera" color={Colors.white} size={40} />
            </TouchableOpacity>
          </View>
        )}
      >
        <TriggeringView
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        />
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={[styles.sloganText]}>Your Public Calendar!</Text>
            </View>
          </View>
          <View>{renderMoves()}</View>
        </View>
        <MorFooterSign />
      </ImageHeaderScrollView>
    </View>
  );
}
