import * as React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';
import '@firebase/firestore';
import Proptypes from 'prop-types';

import Colors from '../constants/Colors';
import { TimeList } from '../components/TimeList';
import { RoutineItem } from '../components/RoutineItem';
import MorIcon from '../components/shapes/MorIcon';

import RoutineManager from '../model/RoutineManager';
import {
  styles,
  EXPANDED_ITEM_COUNT,
  bluredDotColor,
} from '../styles/screens/SetWakeBedTimeScreen';
import { wakeupTimes, bedTimes } from '../constants/HardcodedTexts';

const dayImage = require('../assets/images/routineAdderBackgroundImageDay.png');
const nightImage = require('../assets/images/routineAdderBackgroundImageNight.png');

function BottomButton({ onPress, text }) {
  return (
    <TouchableOpacity style={styles.bottomButtonBox} onPress={onPress}>
      <View>
        <View style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
BottomButton.propTypes = {
  text: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired,
};
function TimeSelector({ navigation, route }) {
  const {
    mainNav,
    itemCategory,
    isWeekDay,
    selectedTime,
    onSelected,
  } = route.params;
  const headerText = isWeekDay ? 'Weekdays' : 'Weekends';
  const iswakeup = itemCategory.id === 'cat-wakeup';
  let times = wakeupTimes;
  if (!iswakeup) {
    times = bedTimes;
  }

  return (
    <View style={styles.selectorContainer}>
      <View style={styles.subMenuHeaderBox}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MorIcon
            style={styles.goBackIcon}
            name="left-arrow"
            size={12}
            color={Colors.charcoal}
          />
        </TouchableOpacity>
        <Text style={styles.subMenuHeader}>{headerText}</Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.elipseSelector}>
          <TimeList
            timeList={times}
            selectTimeButton={(time) =>
              onSelected(time, isWeekDay, navigation, mainNav)
            }
            buttonColor={itemCategory.colors.light}
            highlightColor={itemCategory.colors.dark}
            sizeOfList={EXPANDED_ITEM_COUNT}
            hidden={false}
            selected={selectedTime}
            captionColor={itemCategory.colors.mutedLight}
            style={{ marginHorizontal: 4 }}
          />
        </View>
      </ScrollView>
      <BottomButton
        onPress={() => onSelected(null, isWeekDay, navigation, mainNav)}
        text="SKIP FOR NOW"
      />
    </View>
  );
}

// Temp code
export default function Temp() {
  return (
    <View>
      <Text>SetWakeBedTimeScreen</Text>
    </View>
  );
}

function SetWakeBedTimeScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.routines.routines);
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.routines.categories);
  const {
    routineName,
    routineCategoryId,
    routineStartTime,
    routineStartTimeWeekend,
    saveRoutineId,
  } = route.params;
  const routineManager = new RoutineManager(user.uid, dispatch);

  const category = categories[routineCategoryId];

  const handleContinue = async (time, isWeekDay, nav, mainNav) => {
    const routine = routines[saveRoutineId];
    if (routine) {
      if (isWeekDay) {
        routine.start_time = moment(time, 'HH:mm').utc(true).toDate();
      } else {
        routine.start_time_config = {
          weekend: moment(time, 'HH:mm').utc(true).toDate(),
        };
      }
      routineManager.saveRoutine(routine);
    }
    if (isWeekDay) {
      nav.navigate('WeekendPlanner');
    } else {
      mainNav.pop();
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleContinue()}
        >
          <View>
            <Text style={styles.saveText}>Save</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  let backgroundImage = nightImage;
  const hour = new Date().getHours();
  if (hour > 6 || hour < 18) {
    backgroundImage = dayImage;
  }

  const Stack = createStackNavigator();
  return (
    <View style={styles.background}>
      <ImageBackground style={styles.imageBackground} source={backgroundImage}>
        <View style={styles.container}>
          <View style={styles.headerBox}>
            <Text style={styles.headerTextBox}>
              What time do you set your alarm for?
            </Text>
            <Text style={styles.subHeaderTextBox}>
              You&lsquo;ll receive your morning breif at this time.
            </Text>
          </View>
          <View style={styles.menuBox}>
            <View style={styles.menuBoxContent}>
              <View style={styles.selectedRoutine}>
                <RoutineItem
                  name={routineName}
                  desc={category.name}
                  icon={category.icon_name}
                  color={category.colors.light}
                  decoration={'add'}
                  iconShow={true}
                  editingScreen={true}
                  dotColor={bluredDotColor}
                  repeatType="Adding..."
                  repeatEvery={1}
                />
              </View>
              <View style={styles.selectionPanel}>
                <Stack.Navigator>
                  <Stack.Screen
                    name="WeekdayPlanner"
                    component={TimeSelector}
                    initialParams={{
                      mainNav: navigation,
                      itemCategory: category,
                      isWeekDay: true,
                      selectedTime: routineStartTime,
                      onSelected: handleContinue,
                    }}
                    options={{
                      headerShown: false,
                    }}
                  />

                  <Stack.Screen
                    name="WeekendPlanner"
                    component={TimeSelector}
                    initialParams={{
                      mainNav: navigation,
                      itemCategory: category,
                      isWeekDay: false,
                      selectedTime: routineStartTimeWeekend,
                      onSelected: handleContinue,
                    }}
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack.Navigator>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

SetWakeBedTimeScreen.navigationOptions = {
  header: null,
};
