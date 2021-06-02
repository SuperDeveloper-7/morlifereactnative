import React, { useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { TimeList } from '../components/TimeList';
import { loadCategories } from '../api/firebase';
import { setCategories } from '../store/routines/actions';

import Colors from '../constants/Colors';
import { RoutineItem } from '../components/RoutineItem';
import { CircleButton } from '../components/CircleButton';
import MorIcon from '../components/shapes/MorIcon';

import { styles } from '../styles/screens/RoutineAdderScreen';
import RoutineManager from '../model/RoutineManager';

const dayImage = require('../assets/images/routineAdderBackgroundImageDay.png');
const nightImage = require('../assets/images/routineAdderBackgroundImageNight.png');

const REPEAT_TYPES = {
  DAILY: 'repeat_day',
  CERTAIN: 'repeat_weekly',
  CUSTOM: 'C',
  DEFAULT: 'D',
};

function BottomButton({ onclick, text }) {
  return (
    <TouchableOpacity style={styles.bottomButtonBox} onPress={onclick}>
      <View>
        <View style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const PillButton = ({
  color,
  selectedColor,
  onPress,
  style,
  selected,
  text,
}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <View
      style={[
        styles.timeButton,
        { backgroundColor: selected ? selectedColor : color },
      ]}
    >
      <Text style={styles.pillButtonText}>{text}</Text>
    </View>
  </TouchableOpacity>
);
function typeSelection({ navigation, route }) {
  const [selected, setSelected] = useState(false);
  const { onSelection, setHeader, mainNav } = route.params;
  setHeader(`How often do ${'\n'}you aim to do this?`);

  const onPress = (type, nav, mnav) => {
    if (!selected) onSelection(type, nav, mnav);
    setSelected(true);
  };
  return (
    <View style={styles.typeSelectionContainer}>
      <View style={styles.typeSelectionMenu}>
        <TouchableWithoutFeedback
          style={styles.typeSelectionMenuOption}
          onPress={() => onPress(REPEAT_TYPES.DAILY, navigation, mainNav)}
        >
          <View style={styles.repeatType}>
            <View style={styles.leftView}>
              <Text style={styles.optionText}>Daily</Text>
              <Text style={styles.optionDescription}>Each day, every day</Text>
            </View>
            <View style={styles.rightView}>
              <MorIcon
                style={styles.menuArrow}
                name="left-arrow"
                size={14}
                color={Colors.charcoal}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.typeSelectionMenuOption}
          onPress={() => onPress(REPEAT_TYPES.CERTAIN, navigation, mainNav)}
        >
          <View style={styles.repeatType}>
            <View style={styles.leftView}>
              <Text style={styles.optionText}>Certain days each week</Text>
              <Text style={styles.optionDescription}>
                Choose from Monday to Sunday
              </Text>
            </View>
            <View style={styles.rightView}>
              <MorIcon
                style={styles.menuArrow}
                name="left-arrow"
                size={14}
                color={Colors.charcoal}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.typeSelectionMenuOption}
          onPress={() => onPress(REPEAT_TYPES.CUSTOM, navigation, mainNav)}
        >
          <View style={styles.repeatType}>
            <View style={styles.leftView}>
              <Text style={styles.optionText}>Weekly or monthly goal</Text>
              <Text style={styles.optionDescription}>
                You set a goal, we help you get there
              </Text>
            </View>
            <View style={styles.rightView}>
              <MorIcon
                style={styles.menuArrow}
                name="left-arrow"
                size={14}
                color={Colors.charcoal}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.separatingLine} />
      <BottomButton
        onclick={() => onPress(REPEAT_TYPES.DEFAULT, navigation, mainNav)}
        text="I DON'T KNOW - SKIP"
      />
    </View>
  );
}

function weeklyPlanner({ navigation, route }) {
  const { routine, category, mainNav } = route.params;
  const [selectedDays, setSelectedDays] = useState([]);
  const durationTimes = [
    { key: 1, text: 'Monday' },
    { key: 2, text: 'Tuesday' },
    { key: 3, text: 'Wednesday' },
    { key: 4, text: 'Thursday' },
    { key: 5, text: 'Friday' },
    { key: 6, text: 'Saturday' },
    { key: 7, text: 'Sunday' },
  ];

  const setSelected = (selectedKey) => {
    if (selectedDays.indexOf(selectedKey) === -1) {
      setSelectedDays([...selectedDays, selectedKey]);
    } else {
      setSelectedDays(selectedDays.filter((sd) => sd !== selectedKey));
    }
  };

  const setDays = () => {
    routine.w_repeat_day_of_week = selectedDays;
    navigation.navigate('TimesPerday', { routine, category, mainNav });
  };
  return (
    <View style={styles.weekdaySelectionContainer}>
      <View style={styles.subMenuHeaderBox}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MorIcon
            style={styles.goBackIcon}
            name="left-arrow"
            size={12}
            color={Colors.charcoal}
          />
        </TouchableOpacity>
        <Text style={styles.subMenuHeader}>Certain days each week</Text>
      </View>
      <View style={styles.weekdaySelectionBox}>
        <View style={styles.weekdaySelection}>
          <TimeList
            timeList={durationTimes}
            selectTimeButton={setSelected}
            buttonColor={category.colors.light}
            highlightColor={category.colors.dark}
            sizeOfList={durationTimes.length}
            hidden={false}
            selected={selectedDays}
            captionColor="white"
          />
        </View>
      </View>
      <View style={styles.separatingLine} />
      <View style={styles.nextButtonContainer}>
        <BottomButton
          style={styles.nextButton}
          onclick={() => setDays()}
          text="NEXT"
        />
      </View>
    </View>
  );
}
const timesPerDay = ({ route, navigation }) => {
  const { routine, category, mainNav } = route.params;
  const user = useSelector((state) => state.user);
  const [selectedTime, setSelectedTime] = useState();
  const dispatch = useDispatch();
  const routineManager = new RoutineManager(user.uid, dispatch);

  routine.checkin_count = selectedTime;

  const save = () => {
    setTimeout(async () => {
      await routineManager.addPublicRoutine(routine);
      mainNav.navigate('Root');
    });
  };
  return (
    <View style={styles.frequencySelectionContainer}>
      <View style={styles.subMenuHeaderBox}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MorIcon
            style={styles.goBackIcon}
            name="left-arrow"
            size={12}
            color={Colors.charcoal}
          />
        </TouchableOpacity>
        <Text style={styles.subMenuHeader}>Mon - Fri</Text>
      </View>
      <View style={styles.aimToDoTextBox}>
        <Text style={styles.aimToDoText}>I aim to do this</Text>
      </View>
      <View style={styles.frequencySelection}>
        {['1X', '2X', '3X', '4X', '5X', '6X'].map((day, i) => (
          <CircleButton
            key={day}
            text={day}
            color={category.colors.light}
            selectedColor={category.colors.dark}
            style={styles.frequencyCircle}
            selected={selectedTime === i + 1}
            onPress={() => {
              setSelectedTime(i + 1);
            }}
          />
        ))}
      </View>
      <View style={styles.onTheseDaysTextBox}>
        <Text style={styles.onTheseDaysText}>...on these days.</Text>
      </View>
      <View style={styles.separatingLine} />
      <View>
        <BottomButton onclick={() => save()} text="NEXT" />
      </View>
    </View>
  );
};

function customSelect({ route, navigation }) {
  const { routine, category, mainNav } = route.params;
  const user = useSelector((state) => state.user);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedFreq, setSelectedFreq] = useState();
  const dispatch = useDispatch();
  const routineManager = new RoutineManager(user.uid, dispatch);

  routine.repeat_type = 'repeat_custom';
  routine.checkin_count = selectedTime;
  routine.c_repeat_type = selectedFreq;

  const save = () => {
    setTimeout(async () => {
      await routineManager.addPublicRoutine(routine);
      mainNav.navigate('Root');
    });
  };
  return (
    <View style={styles.frequencySelectionContainer}>
      <View style={styles.subMenuHeaderBox}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MorIcon
            style={styles.goBackIcon}
            name="left-arrow"
            size={12}
            color={Colors.charcoal}
          />
        </TouchableOpacity>
        <Text style={styles.subMenuHeader}>Weekly or monthly goal</Text>
      </View>
      <View style={styles.aimToDoTextBox}>
        <Text style={styles.aimToDoText}>I aim to do this</Text>
      </View>
      <View style={styles.frequencySelection}>
        {['1X', '2X', '3X', '4X', '5X', '6X'].map((day, i) => (
          <CircleButton
            key={day}
            text={day}
            color={category.colors.light}
            selectedColor={category.colors.dark}
            style={styles.frequencyCircle}
            selected={selectedTime === i + 1}
            onPress={() => {
              setSelectedTime(i + 1);
            }}
          />
        ))}
      </View>
      <View style={styles.everyTextBox}>
        <Text style={styles.everyText}>... every</Text>
      </View>
      <View style={styles.weekOrMonthBox}>
        {['custom_week', 'custom_month'].map((t) => (
          <PillButton
            key={t}
            color={category.colors.light}
            selectedColor={category.colors.dark}
            style={styles.frequencyRepeatOption}
            text={{ custom_week: 'Week', custom_month: 'Month' }[t]}
            selected={selectedFreq === t}
            onPress={() => setSelectedFreq(t)}
          />
        ))}
      </View>
      <View style={styles.separatingLine} />
      <View style={styles.addButtonContainer}>
        <BottomButton onclick={() => save()} text="ADD" />
      </View>
    </View>
  );
}

// Temp code
export default function Temp() {
  return (
    <View>
      <Text>RoutineAdderScreen</Text>
    </View>
  );
}

function RoutineAdderScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.routines.categories);
  const [headerText, setHeaderText] = useState(
    `How often do ${'\n'}you aim to do this?`
  );
  const user = useSelector((state) => state.user);
  const routine = route.params.selectedRoutine;
  const routineManager = new RoutineManager(user.uid, dispatch);
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });
  React.useEffect(() => {
    const initAsync = async () => {
      const cat = await loadCategories();
      dispatch(setCategories(cat));
    };
    if (!routine || !categories) {
      initAsync();
    }
  }, [categories]);

  if (!routine || !categories) {
    return <Text>Loading...</Text>;
  }
  const category = categories[routine.category_id];

  const repeatSelected = (repeatType, _nav, mainNav) => {
    if (repeatType === REPEAT_TYPES.DAILY) {
      routine.repeat_type = repeatType;
      setTimeout(async () => {
        await routineManager.addPublicRoutine(routine);
        mainNav.navigate('Root');
      });
    } else if (repeatType === REPEAT_TYPES.CERTAIN) {
      routine.repeat_type = repeatType;
      _nav.navigate('WeekPlanner', {
        onSelection: repeatSelected,
        setHeader: setHeaderText,
        mainNav: navigation,
        category,
        routine,
      });
    } else if (repeatType === REPEAT_TYPES.CUSTOM) {
      routine.repeat_type = repeatType;
      _nav.navigate('CustomSelect', {
        onSelection: repeatSelected,
        setHeader: setHeaderText,
        mainNav: navigation,
        category,
        routine,
      });
    } else {
      setTimeout(async () => {
        await routineManager.addPublicRoutine(routine);
        mainNav.navigate('Root');
      });
    }
  };

  const Stack = createStackNavigator();
  let backgroundImage = nightImage;
  const hour = new Date().getHours();
  if (hour > 6 || hour < 18) {
    backgroundImage = dayImage;
  }

  return (
    <View style={styles.background}>
      <ImageBackground style={styles.imageBackground} source={backgroundImage}>
        <View style={styles.container}>
          <View style={styles.headerBox}>
            <Text style={styles.headerTextBox}>{headerText}</Text>
          </View>
          <View style={styles.menuBox}>
            <View style={styles.menuBoxContent}>
              <View style={styles.selectedRoutine}>
                <RoutineItem
                  name={routine.name}
                  desc={category.name}
                  icon={category.icon_name}
                  color={category.colors.light}
                  dotColor={category.colors.dark}
                  decoration="add"
                  editingScreen={true}
                  iconShow={true}
                  repeatType="Adding..."
                  repeatEvery={1}
                />
              </View>
              <View style={styles.menuOptions}>
                <Stack.Navigator>
                  <Stack.Screen
                    name="TypeSelection"
                    component={typeSelection}
                    initialParams={{
                      onSelection: repeatSelected,
                      setHeader: setHeaderText,
                      mainNav: navigation,
                    }}
                    options={{
                      headerShown: false,
                    }}
                    listeners={{
                      focus: () =>
                        setHeaderText(
                          `How often do ${'\n'}you aim to do this?`
                        ),
                    }}
                  />

                  <Stack.Screen
                    name="WeekPlanner"
                    component={weeklyPlanner}
                    options={{
                      headerShown: false,
                    }}
                    listeners={{
                      focus: () => setHeaderText('Which days each week?'),
                    }}
                  />

                  <Stack.Screen
                    name="TimesPerday"
                    component={timesPerDay}
                    options={{
                      headerShown: false,
                    }}
                    listeners={{
                      focus: () => setHeaderText('How many time?'),
                    }}
                  />

                  <Stack.Screen
                    name="CustomSelect"
                    component={customSelect}
                    options={{
                      headerShown: false,
                    }}
                    listeners={{
                      focus: () => setHeaderText('What is your goal?'),
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
