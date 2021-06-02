import * as React from 'react';
import { Text, View, Image } from 'react-native';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { styles } from '../../styles/components/daily/DailyCard';
import MorIcon from '../shapes/MorIcon';
import { DEFAULT_PROFILE_IMAGE_URL } from '../../constants/User';

import Colors from '../../constants/Colors';
import Circle from '../shapes/Circle';
import Choice from './Choice';

const DailyCard = ({ type, category, isPublic, routineName, daily }) => {
  const user = useSelector((state) => state.user);
  const name = user.displayName || '[Full Name]';
  const photoURL = user.photoURL || DEFAULT_PROFILE_IMAGE_URL;
  const [chosen, setChosen] = React.useState(daily?.chosen || undefined);

  const getBody = () => {
    if (type === 'text') {
      return <Text style={styles.quoteText}>{daily?.body || ''}</Text>;
    }
    if (type === 'completion') {
      return (
        <View>
          <Text style={[styles.titleText, { color: category?.colors?.dark }]}>{routineName}</Text>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Circle size={12} color={category?.colors?.dark} style={styles.checkCircle}>
              <Ionicons size={12} color={'white'} name={'ios-checkmark'} />
            </Circle>
            <Text style={styles.routineDescription}>{daily?.templated_text || ''}</Text>
          </View>
        </View>
      );
    }
    if (type === 'multiple_choice') {
      return (
        <View>
          <Text style={[styles.titleText, { color: Colors.charcoal }]}>{daily?.heading || ''}</Text>
          <Text style={styles.multipleChoiceDescription}>{daily?.subheading || ''}</Text>
          {daily?.choices?.map((item) => (
            <Choice
              text={item}
              isSelected={item === chosen}
              colorSelected={category?.colors?.dark}
              onPressSelect={() => {
                setChosen(item);
              }}
              onPressUnSelect={() => {
                setChosen(undefined);
              }}
            />
          ))}
        </View>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: category?.colors?.mutedMid }]}>
        <View style={styles.headerLeft}>
          {type === 'completion' ? (
            <View style={styles.row}>
              <Image style={styles.profileImage} source={{ uri: photoURL }} />
              <Text style={[styles.nameText, { color: category?.colors?.dark }]}>{name}</Text>
            </View>
          ) : (
            <View style={styles.row}>
              <View style={styles.iconCategory}>
                <MorIcon name={category?.icon_name} size={17} color={category?.colors?.dark} />
              </View>
              <Text style={[styles.nameText, { color: category?.colors?.dark }]}>
                {' '}
                <Text style={[styles.nameText, { color: Colors.charcoal }]}>Mor </Text>Running
              </Text>
            </View>
          )}
        </View>
        {!isPublic && (
          <View style={styles.headerRight}>
            <Text style={styles.justYouText}>Just you</Text>
          </View>
        )}
      </View>
      <View style={styles.body}>{getBody()}</View>
      <View style={[styles.footer, { backgroundColor: category?.colors?.mutedLight }]}>
        <Text style={[styles.hastagText, { color: category?.colors?.dark }]}>{daily.hashtags}</Text>
        {daily?.added_time && (
          <Text style={styles.smallDate}>
            {moment(daily.added_time?.toDate()).format('h:mm a MMMM Do, YYYY')}
          </Text>
        )}
      </View>
    </View>
  );
};

DailyCard.defaultProps = {
  isPublic: true,
  routineName: undefined,
};
DailyCard.propTypes = {
  routineName: Proptypes.string,
  type: Proptypes.string.isRequired,
  isPublic: Proptypes.bool,
};

export default DailyCard;
