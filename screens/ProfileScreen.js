import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { DEFAULT_PROFILE_IMAGE_URL } from '../constants/User';
import Layout from '../constants/Layout';
import { RoutineItem } from '../components/RoutineItem';
import { dedupePublicRoutines } from '../util/routine';
import { styles } from '../styles/screens/ProfileScreen';

// Temp code
export default function Temp() {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
}

function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const routines = useSelector((state) => state.routines.routines);
  const username = user.username || 'username';
  const name = user.displayName || '[Full Name]';
  const photoURL = user.photoURL || DEFAULT_PROFILE_IMAGE_URL;
  const categories = useSelector((state) => state.routines.categories);

  const usedCategoryIds = Object.values(routines).map((r) => r.category_id);
  const usedCategories = Object.values(categories).filter((c) =>
    usedCategoryIds.includes(c.id)
  );
  let profileRoutines = Object.values(routines);
  profileRoutines = dedupePublicRoutines(profileRoutines);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scroll}>
          <Image source={{ uri: photoURL }} style={styles.image} />
          <View style={styles.nameContainer}>
            <Text style={styles.scrollText}>{name}</Text>
            <Text style={styles.username}>@{username}</Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={[Layout.calendarSection, styles.calendarHead]}>
            Calendar
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.catContainer}>
              {usedCategories.map((cat) => {
                return (
                  <View key={cat.id} style={styles.categoryView}>
                    <Text style={styles.categoryText}>
                      <Ionicons size={18} name={cat.icon_name} /> {cat.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          {profileRoutines.map((routine) => {
            const category = categories[routine.category_id];
            if (!category) {
              return null;
            }
            return (
              <RoutineItem
                key={routine.id}
                name={routine.name}
                desc={category.name}
                icon={category.icon_name}
                color={category.colors.light}
                dotColor={category.colors.dark}
                captionColor="rgba(255,255,255,0.8)"
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
