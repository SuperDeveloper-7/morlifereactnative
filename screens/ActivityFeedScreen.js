import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import _ from 'lodash';
import '@firebase/firestore';
import PropTypes from 'prop-types';
import { styles } from '../styles/screens/ActivityFeedScreen';

import pluralize from '../util/pluralize';
import Colors from '../constants/Colors';
import TextStyle from '../constants/TextStyle';
import Layout from '../constants/Layout';
import { ACTIVITY_ADD, ACTIVITY_COMPLETE } from '../constants/Routine';

import { setPublicRoutines, deleteRoutine as reduxDeleteRoutine } from '../store/routines/actions';
import { setLoading } from '../store/loading/actions';
import { setActivityFeed } from '../store/activity/actions';

import { convertPublicRoutine } from '../model/Routine';

import {
  getActivityFeed,
  loadPublicRoutines,
  addRoutines,
  scheduleRoutines,
  descheduleRoutines,
  deleteRoutine,
} from '../api/firebase';

import { RoutineItem } from '../components/RoutineItem';
import Circle from '../components/shapes/Circle';
import RoutineActionModal from '../components/RoutineActionModal';

export default function ActivityFeedScreen() {
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const user = useSelector((state) => state.user);
  const routines = useSelector((state) => state.routines.routines);
  const activityFeed = useSelector((state) => state.activity.feed);
  const categories = useSelector((state) => state.routines.categories);
  const publicRoutines = useSelector((state) => state.routines.publicRoutines);
  const dispatch = useDispatch();

  const collectRoutineIds = (feed) => {
    return Object.values(feed).flatMap((item) =>
      item.feed.map((activityItem) => activityItem.routine_id)
    );
  };

  React.useEffect(() => {
    const initAsync = async () => {
      const feed = await getActivityFeed(new Date(), 10);
      dispatch(setActivityFeed(feed));
      const routineIds = collectRoutineIds(feed);
      if (!routineIds.length) {
        return;
      }
      const inPublicRoutines = await loadPublicRoutines(routineIds);
      dispatch(setPublicRoutines(inPublicRoutines));
    };
    initAsync();
  }, []);

  const ownedPublicRoutines = {};
  Object.values(routines).forEach((routine) => {
    ownedPublicRoutines[routine.public_id] = routine.id;
  });
  const ownsSelctedRoutine = () => ownedPublicRoutines[_.get(selectedRoutine, 'id')];

  const addPublicRoutine = async (publicRoutine) => {
    const routine = convertPublicRoutine(publicRoutine);
    const newRoutineIds = await addRoutines(user.uid, [routine]);
    return scheduleRoutines(newRoutineIds);
  };

  const removePublicRoutine = async (publicRoutine) => {
    const routineId = ownedPublicRoutines[publicRoutine.id];
    await deleteRoutine(user.uid, routineId); // TODO
    dispatch(reduxDeleteRoutine(routineId));
    return descheduleRoutines([routineId]);
  };

  const handleRoutineAction = () => {
    setShowActionModal(false);
    dispatch(setLoading(true));
    setTimeout(async () => {
      if (ownedPublicRoutines[selectedRoutine.id]) {
        await removePublicRoutine(selectedRoutine);
      } else {
        await addPublicRoutine(selectedRoutine);
      }
      dispatch(setLoading(false));
    });
  };

  const formatActivityLine = (item) => {
    if (item.activity_type === ACTIVITY_ADD) {
      if (item.users.length === 1) {
        return `${item.users[0].full_name} added a new routine`;
      }
      if (item.users.length > 1) {
        return (
          `${item.users[0].full_name} and ` +
          `${item.users.length - 1} ${pluralize('other', item.users.length - 1)} added this routine`
        );
      }
      return '';
    }
    if (item.activity_type === ACTIVITY_COMPLETE) {
      if (item.users.length === 1) {
        return `Done by ${item.users[0].full_name}`;
      }
      if (item.users.length > 1) {
        return (
          `Done by ${item.users[0].full_name} and ` +
          `${item.users.length - 1} ${pluralize('other', item.users.length - 1)}`
        );
      }
      return '';
    }
    return '';
  };

  const isCurrentDateKey = (dateKey) => {
    return dateKey === moment().format('YYYY-MM-DD');
  };

  const Separator = ({ dateKey }) => (
    <View style={styles.seperatorView}>
      <View style={styles.separatorLine} />
      <View style={styles.separatorPill}>
        <Text style={styles.seperatorText}>{moment(dateKey).format('dddd, MMMM D')}</Text>
      </View>
      <View style={styles.separatorLine} />
    </View>
  );
  Separator.propTypes = {
    dateKey: PropTypes.string.isRequired,
  };

  const FeedPage = ({ style, dateKey, feed }) => (
    <View style={style}>
      {isCurrentDateKey(dateKey) ? (
        <Text style={[Layout.calendarSection, TextStyle.sectionHeadingText]}>
          Today&apos;s Activity
        </Text>
      ) : (
        <Separator dateKey={dateKey} />
      )}
      {feed.length === 0 && (
        <Text style={styles.noActivity>No Activity</Text>
      )}
      {feed.map((item) => {
        const routine = publicRoutines[item.routine_id];
        if (!routine) {
          return null;
        }
        const category = categories[routine.category_id];
        if (!category) {
          return null;
        }
        let icon = null;
        switch (item.activity_type) {
          case 'add':
            icon = 'ios-refresh';
            break;
          case 'complete':
            icon = 'ios-checkmark';
            break;
          default:
            icon = '';
            break;
        }

        return (
          <View key={`${item.routine_id}-${item.activity_type}`}>
            <RoutineItem
              name={routine.name}
              desc={category.name}
              icon={category.icon_name}
              color={category.colors.light}
              dotColor={category.colors.dark}
              decoration={ownedPublicRoutines[routine.id] ? 'remove' : 'add'}
              repeatType={routine.repeat_type}
              repeatEvery={routine.checkin_count}
              onDotPress={() => {
                setSelectedRoutine(routine);
                setShowActionModal(true);
              }}
            />
            <View style={[styles.flippedElipse, { backgroundColor: category.colors.dark }]}>
              <Circle color={category.colors.light} size={24}>
                {icon && <Ionicons size={20} name={icon} color="white" />}
              </Circle>
              <Text style={styles.feedPageText}>{formatActivityLine(item)}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
  FeedPage.propTypes = {
    feed: PropTypes.arrayOf({
      routine_id: PropTypes.string.isRequired,
      activity_type: PropTypes.string.isRequired,
    }).isRequired,
    dateKey: PropTypes.string.isRequired,
  };
  // Past 5 days
  const dateKeys = Array(5)
    .fill('')
    .map((a, i) => moment(new Date()).add(-i, 'days').format('YYYY-MM-DD'));

  return (
    <View style={styles.container}>
      <RoutineActionModal
        visible={showActionModal}
        routine={selectedRoutine}
        onCancel={() => setShowActionModal(false)}
        onAction={handleRoutineAction}
        actionButtonText={ownsSelctedRoutine() ? 'Remove' : 'Add'}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {dateKeys.map((dateKey) => {
          const feed = _.get(activityFeed, [dateKey, 'feed'], []);
          return <FeedPage style={styles.feedPage} key={dateKey} dateKey={dateKey} feed={feed} />;
        })}
      </ScrollView>
    </View>
  );
}
