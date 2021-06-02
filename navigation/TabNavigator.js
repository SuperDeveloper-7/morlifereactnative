import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import _ from 'lodash';

import HomeScreen from '../screens/HomeScreen';
// import MenuScreen from '../screens/MenuScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import CatalogScreen from '../screens/CatalogScreen';
import Colors from '../constants/Colors';
import TopHeader from './TopHeader';
import MorIcon from '../components/shapes/MorIcon';
import CategoryScreen from '../screens/CategoryScreen';

import { styles } from '../styles/navigation/TabNavigator';

const Tab = createBottomTabNavigator();

const CatalogStack = createStackNavigator();
const HomeStack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const getSearchBarShown = (route) => {
  switch (route) {
    case 'Menu':
      return false;
    default:
      return true;
  }
};

const getHeaderStyleAccent = (route) => {
  switch (route) {
    default:
      return false;
  }
};

function CatalogNavigator({ navigation, route }) {
  return (
    <CatalogStack.Navigator headerMode="screen">
      <CatalogStack.Screen
        options={{
          headerShown: true,
          header: () => (
            <TopHeader
              style={styles.topHeaderStyle}
              showSearch={getSearchBarShown('Catalog')}
              bgColor={Colors.morOrange}
              accent={true}
              navigation={navigation}
              mainNavigation={route.params.mainNavigation}
            />
          ),
        }}
        name="Catalog"
        component={CatalogScreen}
      />
      <CatalogStack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          headerShown: false,
        }}
      />
    </CatalogStack.Navigator>
  );
}

function HomeNavigator({ navigation, route }) {
  return (
    <HomeStack.Navigator headerMode="screen">
      <HomeStack.Screen
        options={{
          headerShown: true,
          header: () => (
            <TopHeader
              style={styles.topHeaderStyle}
              showSearch={getSearchBarShown('Home')}
              accent={getHeaderStyleAccent('Home')}
              navigation={navigation}
              mainNavigation={route.params.mainNavigation}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
}

export default function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{ showLabel: true, style: styles.tabNavigator, labelStyle: styles.tabLabel }}
      hiddenTabs={['Login']}
      headerMode="screen"
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        initialParams={{
          mainNavigation: navigation,
        }}
        options={{
          headerShown: true,
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <MorIcon name="home" size={27} color={focused ? Colors.charcoal : Colors.midGrey} />
          ),
        }}
      />
      <Tab.Screen
        name="Catalog"
        component={CatalogNavigator}
        initialParams={{
          mainNavigation: navigation,
        }}
        options={{
          title: 'Catalog',
          tabBarIcon: ({ focused }) => (
            <MorIcon name="catalog" size={27} color={focused ? Colors.charcoal : Colors.midGrey} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          title: 'Me',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MorIcon name="me" size={27} color={focused ? Colors.charcoal : Colors.midGrey} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
