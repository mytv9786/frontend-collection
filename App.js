import React from 'react';
import { StatusBar } from 'react-native';
//import StackNavigationss from './src/Navigations/StackNavigationss';
import StackNavigation from './src/Navigations/StackNavigation';

import { NavigationContainer } from '@react-navigation/native';
import AppProviders from './src/AppProviders';

export default function App() {
  return (
    <AppProviders>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <StackNavigation />
      </NavigationContainer>
    </AppProviders>
  );
}
