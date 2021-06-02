import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Proptypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/components/daily/Choice';
import Circle from '../shapes/Circle';
import Colors from '../../constants/Colors';

const Choice = ({ isSelected, colorSelected, text, onPressSelect, onPressUnSelect }) => {
  if (isSelected) {
    return (
      <TouchableOpacity
        onPress={() => {
          onPressUnSelect();
        }}
        style={[styles.choice, { backgroundColor: colorSelected }]}
      >
        <Circle size={24} color={Colors.white} style={styles.selectedCircle}>
          <Ionicons size={24} color={colorSelected} name="ios-checkmark" />
        </Circle>
        <Text style={[styles.choiceText, { color: Colors.white }]}>{text}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        onPressSelect();
      }}
      style={[styles.choice, styles.container]}
    >
      <Circle size={24} style={styles.borderCircle} />
      <Text style={[styles.choiceText, { color: Colors.charcoal }]}>{text}</Text>
    </TouchableOpacity>
  );
};

Choice.defaultProps = {
  isSelected: false,
};
Choice.propTypes = {
  isSelected: Proptypes.bool,
  colorSelected: Proptypes.string.isRequired,
  text: Proptypes.string.isRequired,
  onPressSelect: Proptypes.func.isRequired,
  onPressUnSelect: Proptypes.func.isRequired,
};

export default Choice;
