import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import '@firebase/firestore';

import Proptypes from 'prop-types';
import MorIcon from '../components/shapes/MorIcon';
import Circle from '../components/shapes/Circle';
import CategoryRoutineList from '../components/CategoryRoutineList';
import { styles } from '../styles/screens/CatalogScreen';

// Temp code
export default function Temp() {
  return (
    <View>
      <Text>CatalogScreen</Text>
    </View>
  );
}

function CatalogScreen({ navigation, onPress }) {
  const categories = useSelector((state) => state.routines.categories);
  const feed = useSelector((state) => state.routines.feed);

  const catList = Object.keys(categories).filter(
    (key) => ['cat-bedtime', 'cat-wakeup'].indexOf(key) === -1
  );

  const navigateToCategory = (catId) =>
    navigation.push('Category', { categoryId: catId });
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.welcomeText}>the Mor Catalog</Text>
          <Text style={styles.updateText}>2 moves added this week</Text>
        </View>
        <View style={styles.horizontalScrollView}>
          <ScrollView horizontal={true} style={styles.categoryList}>
            {(catList || []).map((cat) => (
              <TouchableOpacity
                onPress={() => navigateToCategory(cat)}
                key={categories[cat].id}
              >
                <Circle
                  style={styles.categoryListItem}
                  size={48}
                  color={categories[cat].colors.light}
                  onPress={onPress}
                >
                  <MorIcon
                    name={categories[cat].icon_name}
                    size={18}
                    color="#ffffff"
                  />
                </Circle>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.journeyLine} />
        {(feed.category_list || []).map((cat) => (
          <View key={cat} style={styles.category}>
            <View style={styles.categoryRoutineList}>
              <TouchableOpacity onPress={() => navigateToCategory(cat)}>
                <View style={styles.categoryRoutineTitle}>
                  <MorIcon
                    name={categories[cat].icon_name}
                    size={25}
                    color={categories[cat].colors.light}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      { color: categories[cat].colors.light },
                    ]}
                  >
                    {categories[cat].name}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={[styles.categoryTextCounter]}>Showing 3 of 11</Text>
            </View>
            <CategoryRoutineList navigation={navigation} categoryId={cat} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

CatalogScreen.navigationOptions = {
  header: null,
};
CatalogScreen.defaultProps = {
  onPress: null,
};
CatalogScreen.propTypes = {
  onPress: Proptypes.func,
};
