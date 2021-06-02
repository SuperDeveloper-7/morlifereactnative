import * as React from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import '@firebase/firestore';
import Proptypes from 'prop-types';

import RoutineManager from '../model/RoutineManager';
import { TimeList } from '../components/TimeList';
import { RoutineItem } from '../components/RoutineItem';
import { CircleButton } from '../components/CircleButton';

import {
  styles,
  HEADER_ICON_SIZE,
  HEADER_TEXT_COLOR,
  UI_TEXT_COLOR,
} from '../styles/screens/EditRoutineScreen';

import {
  freqTypeText,
  goalTypeText,
  privacyText,
  shortPrivacyText,
  privacyIcon,
  durationTimes,
  freqDays,
} from '../constants/HardcodedTexts';

const ROUTINE_NAME_MIN_LEN = 3;
const ROUTINE_NAME_MAX_LEN = 50;

const ROUTINE_GOAL_MIN = 1;
const ROUTINE_GOAL_MAX = 100;

const MAX_CHECKIN_COUNT = 5;

const CollapseHeader = ({ title, icon, collapsed, onCollapse, style }) => {
  return (
    <TouchableOpacity style={[styles.dayContainer, style]} onPress={onCollapse}>
      <Ionicons size={HEADER_ICON_SIZE} color={HEADER_TEXT_COLOR} name={icon} />
      <View style={styles.dayContainerView}>
        <Text style={styles.dayContainerText}>{title}</Text>
      </View>
      <View style={styles.dropdown}>
        <Ionicons
          size={HEADER_ICON_SIZE}
          color={HEADER_TEXT_COLOR}
          name={collapsed ? 'ios-arrow-down' : 'ios-arrow-up'}
        />
      </View>
    </TouchableOpacity>
  );
};

CollapseHeader.propTypes = {
  title: Proptypes.string.isRequired,
  icon: Proptypes.string.isRequired,
  collapsed: Proptypes.bool.isRequired,
  onCollapse: Proptypes.func.isRequired,
};

const CollapseItem = ({ title, icon, backgroundColor, children }) => {
  const [collapsed, setCollapsed] = React.useState(true);
  return (
    <>
      <CollapseHeader
        icon={icon}
        title={title}
        style={{ backgroundColor: collapsed ? backgroundColor : 'transparent' }}
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
      />
      {!collapsed && <View style={styles.collapseItemContent}>{children}</View>}
    </>
  );
};

CollapseItem.propTypes = {
  title: Proptypes.string.isRequired,
  icon: Proptypes.string.isRequired,
  backgroundColor: Proptypes.string.isRequired,
  children: Proptypes.node.isRequired,
};

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
        styles.pillButtonView,
        { backgroundColor: selected ? selectedColor : color },
      ]}
    >
      <Text style={styles.pillButtonText}>{text}</Text>
    </View>
  </TouchableOpacity>
);
PillButton.propTypes = {
  color: Proptypes.string.isRequired,
  text: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired,
};

const LargeDropdownButton = ({
  color,
  selectedColor,
  onPress,
  style,
  selected,
  text,
  icon,
}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <View
      style={[
        styles.largeDropdownView,
        { backgroundColor: selected ? selectedColor : color },
      ]}
    >
      <Ionicons size={HEADER_ICON_SIZE} color={HEADER_TEXT_COLOR} name={icon} />
      <Text style={styles.largeDropdownText}>{text}</Text>
    </View>
  </TouchableOpacity>
);
LargeDropdownButton.propTypes = {
  color: Proptypes.string.isRequired,
  text: Proptypes.string.isRequired,
  icon: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired,
};

const dayOfWeekArrToMap = (arr) => {
  const m = {};
  arr.map((i) => {
    m[i] = true;
    return null;
  });
  return m;
};

const dayOfWeekMapToArr = (m) => {
  return Object.keys(m).map((key) => parseInt(key, 10));
};

// Temp code
export default function Temp() {
  return (
    <View>
      <Text>EditRoutineScreen</Text>
    </View>
  );
}

function EditRoutineScreen({ route, navigation }) {
  const categories = useSelector((state) => state.routines.categories);
  const routines = useSelector((state) => state.routines.routines);
  const { routineId } = route.params;
  const routine = routines[routineId];
  const category = categories[routine.category_id];
  const [checkinCount, setCheckinCount] = React.useState(routine.checkin_count);
  const [duration, setDuration] = React.useState(routine.duration_minutes);
  const [freqType, setFreqType] = React.useState(routine.repeat_type);
  const currentDayOfWeek = moment().isoWeekday();
  const [repeatDayOfWeek, setRepeatDayOfWeek] = React.useState(
    dayOfWeekArrToMap(routine.w_repeat_day_of_week || [currentDayOfWeek])
  );
  const [goalCount, setGoalCount] = React.useState(routine.goal_count || 0);
  const [goalType, setGoalType] = React.useState(routine.goal_type || null);
  const [routineName, setRoutineName] = React.useState(routine.name);
  const [privacyType, setPrivacyType] = React.useState(
    routine.privacy_type || 'privacy_public'
  );
  const [
    privacyDropdownCollapsed,
    setPrivacyDropdownCollapsed,
  ] = React.useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const routineManager = new RoutineManager(user.uid, dispatch);

  const validate = () => {
    if (
      routineName === null ||
      routineName.length < ROUTINE_NAME_MIN_LEN ||
      routineName.length > ROUTINE_NAME_MAX_LEN
    ) {
      return 'Invalid Name';
    }
    if (
      goalType != null &&
      (Number.isNaN(goalCount) ||
        parseInt(goalCount, 10) < ROUTINE_GOAL_MIN ||
        parseInt(goalCount, 10) > ROUTINE_GOAL_MAX)
    ) {
      return 'Invalid Goal Counter';
    }
    return '';
  };

  const isAnyDaySelected = (v) => Object.keys(v).length > 1;

  const handleSave = () => {
    const errMsg = validate();
    if (errMsg !== '') {
      Alert.alert('Cannot Save Routine', errMsg);
      return;
    }
    routine.name = routineName;
    routine.checkin_count = checkinCount;
    routine.duration_minutes = duration;
    routine.repeat_type = freqType;
    if (freqType === 'repeat_weekly') {
      routine.w_repeat_day_of_week = dayOfWeekMapToArr(repeatDayOfWeek);
    }

    routine.goal_type = goalType;
    routine.goal_count = parseInt(goalCount, 10);
    routine.privacy_type = privacyType;

    routineManager.saveRoutine(routine);
    navigation.pop();
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.navigationView}>
          <Button title="Save" onPress={handleSave} />
        </View>
      ),
    });
  });
  if (!routine || !category) {
    return null;
  }

  const isWeekDaySelected = (i) =>
    freqType === 'repeat_day' ||
    (freqType === 'repeat_weekly' && repeatDayOfWeek[i]);
  const toggleWeekDay = (i) => {
    if (freqType !== 'repeat_weekly') {
      return;
    }
    if (repeatDayOfWeek[i] && isAnyDaySelected(repeatDayOfWeek)) {
      delete repeatDayOfWeek[i];
    } else {
      repeatDayOfWeek[i] = true;
    }
    setRepeatDayOfWeek({ ...repeatDayOfWeek });
  };

  const incrementCheckinCount = () => {
    if (checkinCount < MAX_CHECKIN_COUNT) {
      setCheckinCount(checkinCount + 1);
    } else {
      setCheckinCount(1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.routineList}>
          <RoutineItem
            key={routine.id}
            name={routineName}
            desc={category.name}
            icon={category.icon_name}
            color={category.colors.light}
            dotColor={category.colors.dark}
            captionColor={category.colors.mutedLight}
            decoration={false}
          />
          <View
            style={[
              styles.elipseSelector,
              { backgroundColor: category.colors.dark },
            ]}
          >
            <View style={styles.editorView}>
              <TextInput
                style={[
                  styles.textInput,
                  styles.editorView,
                  { backgroundColor: category.colors.light },
                ]}
                onChangeText={setRoutineName}
              >
                {routine.name}
              </TextInput>
              <CircleButton
                color={category.colors.light}
                text={`${checkinCount}x`}
                onPress={incrementCheckinCount}
              />
            </View>
            <CollapseItem
              title="Duration"
              icon="ios-time"
              backgroundColor={category.colors.light}
            >
              <TimeList
                timeList={durationTimes}
                selectTimeButton={(time) => setDuration(time)}
                buttonColor={category.colors.dark}
                highlightColor={category.colors.darkHighlight}
                sizeOfList={6}
                hidden={false}
                selected={duration}
                captionColor={UI_TEXT_COLOR}
              />
            </CollapseItem>
            <CollapseItem
              title="Frequency"
              icon="ios-refresh-circle"
              backgroundColor={category.colors.light}
            >
              <View style={styles.frequencyView}>
                {freqDays.map((day, i) => (
                  <CircleButton
                    key={day}
                    text={day}
                    color={category.colors.light}
                    selectedColor={category.colors.darkHighlight}
                    style={styles.frequencyCircle}
                    selected={isWeekDaySelected(i + 1)}
                    onPress={() => toggleWeekDay(i + 1)}
                  />
                ))}
              </View>
              <View style={styles.pillContainer}>
                {['repeat_day', 'repeat_weekly'].map((t) => (
                  <PillButton
                    key={t}
                    color={category.colors.light}
                    selectedColor={category.colors.darkHighlight}
                    style={styles.frequencyRepeatView}
                    text={freqTypeText[t]}
                    selected={freqType === t}
                    onPress={() => setFreqType(t)}
                  />
                ))}
              </View>
            </CollapseItem>
            {false && (
              <CollapseItem
                title="Goal"
                icon="ios-flag"
                backgroundColor={category.colors.light}
              >
                <TextInput
                  style={[
                    styles.textInput,
                    styles.goalTextInput,
                    { backgroundColor: category.colors.light },
                  ]}
                  keyboardType="numeric"
                  onChangeText={setGoalCount}
                >
                  {goalCount}
                </TextInput>
                <View style={styles.pillContainer}>
                  {Object.keys(goalTypeText).map((t) => (
                    <PillButton
                      key={t}
                      color={category.colors.light}
                      selectedColor={category.colors.darkHighlight}
                      style={styles.goalView}
                      text={goalTypeText[t]}
                      selected={goalType === t}
                      onPress={() => {
                        (goalType === t ? setGoalType(null) : setGoalType(t))();
                      }}
                    />
                  ))}
                </View>
              </CollapseItem>
            )}
          </View>
          <View
            style={[
              styles.reverseElipse,
              { backgroundColor: category.colors.dark },
            ]}
          >
            <View style={styles.reverseElipseSubView}>
              <Text style={styles.reverseElipseText}>Who can see this?</Text>
              {privacyDropdownCollapsed ? (
                <TouchableOpacity
                  onPress={() => setPrivacyDropdownCollapsed(false)}
                >
                  <View
                    style={[
                      styles.reverseTouchableView,
                      { backgroundColor: category.colors.light },
                    ]}
                  >
                    <Ionicons
                      size={HEADER_ICON_SIZE}
                      color={UI_TEXT_COLOR}
                      name={privacyIcon[privacyType]}
                      style={styles.reverseIcon}
                    />
                    <Text style={styles.reverseText}>
                      {shortPrivacyText[privacyType]}
                    </Text>
                    <Ionicons
                      size={HEADER_ICON_SIZE}
                      color={UI_TEXT_COLOR}
                      name="ios-arrow-down"
                      style={{ marginRight: 10 }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setPrivacyDropdownCollapsed(true)}
                >
                  <Ionicons
                    size={HEADER_ICON_SIZE}
                    color={UI_TEXT_COLOR}
                    name="ios-arrow-up"
                    style={styles.privacyDropdown}
                  />
                </TouchableOpacity>
              )}
            </View>
            {!privacyDropdownCollapsed &&
              Object.keys(privacyText).map((p) => (
                <LargeDropdownButton
                  key={p}
                  color={category.colors.light}
                  selectedColor={category.colors.darkHighlight}
                  style={styles.privacyCollapse}
                  icon={privacyIcon[p]}
                  text={privacyText[p]}
                  selected={privacyType === p}
                  onPress={() => setPrivacyType(p)}
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

EditRoutineScreen.navigationOptions = {
  header: null,
};
