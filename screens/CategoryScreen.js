import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Proptypes from 'prop-types';
import MorIcon from '../components/shapes/MorIcon';
import Circle from '../components/shapes/Circle';
import TopHeaderTransparent from '../components/TopHeaderTransparent';

import CategoryList from '../components/CategoryRoutineList';
import Colors from '../constants/Colors';
import { styles } from '../styles/screens/CategoryScreen';

// Temp code
export default function Temp() {
  return (
    <View>
      <Text>CategoryScreen</Text>
    </View>
  );
}

function CategoryScreen({ navigation, route, onPress }) {
  const scrollA = useRef(new Animated.Value(0)).current;
  const categoryId = _.get(route, 'params.categoryId');
  const categories = useSelector((state) => state.routines.categories);

  // Data we need
  const category = categories[categoryId];
  const image = { uri: category.photo_url };
  const catList = Object.keys(categories).filter(
    (key) => ['cat-bedtime', 'cat-wakeup'].indexOf(key) === -1
  );
  const navigateToCategory = (catId) =>
    navigation.push('Category', { categoryId: catId });
  return (
    <View style={styles.mainContainer}>
      <TopHeaderTransparent
        categoryName={category.name}
        scrollA={scrollA}
        bgColor={category.colors.dark}
        navigation={navigation}
        mainNavigation={navigation}
      />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          {
            useNativeDriver: true,
          }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.bannerContainer}>
          <Animated.Image style={styles.banner(scrollA)} source={image} />
        </View>
        <View style={styles.scrollViewContainer}>
          <View style={styles.categoryNameContainer}>
            <Text
              style={[styles.categoryName, { color: category.colors.light }]}
            >
              {category.name}
            </Text>
            <Text
              style={[
                styles.categoryRoutineCount,
                { color: category.colors.light },
              ]}
            >
              {category.counter}
            </Text>
          </View>
          <View style={styles.categoryUpdateStatusContainer}>
            <MorIcon
              style={styles.categoryUpdateIcon}
              name="last-updated"
              size={12}
              color={Colors.midGrey}
            />
            <Text style={styles.categoryUpdateStatus}>
              Updated 11 hours ago
            </Text>
          </View>
          <Text style={styles.categoryDescription}>{category.description}</Text>

          <View style={styles.separatingLine} />
          <CategoryList navigation={navigation} categoryId={category.id} />
          <View style={styles.separatingLine} />

          <View style={styles.bottomContainer}>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>{category.slogan}</Text>
              <Text style={styles.bottomText}>
                Explore life beyond{' '}
                <Text style={{ color: category.colors.light }}>
                  {category.name}
                </Text>
              </Text>
            </View>
            <View style={styles.categoriesContainer}>
              {(catList || []).map((cat) => {
                if (category.id !== cat) {
                  return (
                    <TouchableOpacity
                      style={styles.categoryList}
                      onPress={() => navigateToCategory(cat)}
                      key={cat.public_id}
                    >
                      <Circle
                        style={styles.categoryListItem}
                        size={50}
                        color={categories[cat].colors.light}
                        onPress={onPress}
                      >
                        <MorIcon
                          name={categories[cat].icon_name}
                          size={20}
                          color={Colors.white}
                        />
                      </Circle>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

CategoryScreen.defaultProps = {
  onPress: null,
};
CategoryScreen.propTypes = {
  onPress: Proptypes.func,
};
