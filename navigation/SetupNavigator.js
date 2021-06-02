import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SetFullnameScreen from '../screens/SetFullnameScreen';
import SetUsernameScreen from '../screens/SetUsernameScreen';

import { styles } from '../styles/navigation/SetupNavigator';

const SetupStack = createStackNavigator();

export default function SetupNavigator() {
  return (
    <SetupStack.Navigator>
      <SetupStack.Screen
        name="SetFullname"
        component={SetFullnameScreen}
        options={{
          headerStyle: styles.defaultStackHeaders,
        }}
      />
      <SetupStack.Screen
        name="SetUsername"
        component={SetUsernameScreen}
        options={{
          headerStyle: styles.defaultStackHeaders,
        }}
      />
    </SetupStack.Navigator>
  );
}
