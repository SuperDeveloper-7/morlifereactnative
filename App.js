import React, { useRef } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Host } from 'react-native-portalize';
import { styles } from './styles/App';

import { store, persistor } from './store/store';

import MainNavigator from './navigation/MainNavigator';
import AppContainer from './containers/appContainer';

export default function App() {
  const containerRef = useRef();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef}>
            <Host>
              <AppContainer>
                <MainNavigator />
              </AppContainer>
            </Host>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}
