import * as React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import RoundButton from '../components/RoundButton';

import '@firebase/firestore';
import moment from 'moment';

import {
  styles,
  PILL_HEIGHT,
  ICON_SIZE,
  CIRCLE_COLOR,
} from '../styles/screens/HomeScreen';

import DayView from './DayView';
import Circle from '../components/shapes/Circle';
import { AlertBox } from '../components/AlertBox';
import RoutineManager from '../model/RoutineManager';

import { SIGN_OUT_START } from '../store/user';

// Temp code
export default function Temp() {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>HomeScreen</Text>
      <RoundButton onPress={() => dispatch({ type: SIGN_OUT_START })}>
        SignOut
      </RoundButton>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const routineManager = new RoutineManager(user.uid, dispatch);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [alertData, setAlertData] = React.useState();
  const [routineAlertBox, setRoutineAlertBox] = React.useState();

  const handleDateReset = () => {
    setCurrentDate(new Date());
  };

  const handleDateIncrement = (delta) => {
    setCurrentDate(moment(currentDate).add(delta, 'days').toDate());
  };
  const handleLeftPress = () => {
    handleDateIncrement(-1);
  };
  const handleRightPress = () => {
    handleDateIncrement(1);
  };

  const handleAlertBox = (category, routine) => {
    setAlertData({
      viewColor: category?.colors?.mutedLight,
      textColor: category?.colors?.dark,
      text: routine?.name,
    });
    setRoutineAlertBox(routine);
  };
  const getToday = () => {
    const compareDate = moment(currentDate).startOf('day').hour(12);
    const today = moment().startOf('day').hour(12);
    const diff = compareDate.diff(today, 'days');

    let text = '';
    if (diff === 0) {
      text = 'Today';
    } else if (diff === 1) {
      text = 'Tomorrow';
    } else if (diff === -1) {
      text = 'Yesterday';
    } else {
      text = currentDate.toLocaleDateString('en', { weekday: 'short' });
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.theDate}>
          <Text style={styles.monthDay}>
            {currentDate.toLocaleDateString('en', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text style={[styles.weekDay]}>{getToday()}</Text>
        </View>
        <View style={[styles.calnav]}>
          <TouchableOpacity style={styles.navButtons} onPress={handleLeftPress}>
            <Circle size={PILL_HEIGHT} color={CIRCLE_COLOR}>
              <Ionicons
                style={styles.arrowLeft}
                size={ICON_SIZE}
                name="ios-arrow-back"
                color="white"
              />
            </Circle>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButtons}
            onPress={handleRightPress}
          >
            <Circle size={PILL_HEIGHT} color={CIRCLE_COLOR}>
              <Ionicons
                style={styles.arrowRight}
                size={ICON_SIZE}
                name="ios-arrow-forward"
                color="white"
              />
            </Circle>
          </TouchableOpacity>
        </View>
      </View>
      <DayView
        handleAlertBox={handleAlertBox}
        navigation={navigation}
        currentDate={currentDate}
        onDateReset={handleDateReset}
      />
      {alertData && (
        <AlertBox
          viewColor={alertData.viewColor}
          textColor={alertData.textColor}
          text={alertData.text}
          undoAction={() => {
            setAlertData();
            setRoutineAlertBox();
          }}
          doneAction={async () => {
            if (routineAlertBox) {
              try {
                await routineManager.removeRoutine(routineAlertBox);
                setAlertData();
              } catch (error) {}
            }

            setRoutineAlertBox();
          }}
        />
      )}
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};
