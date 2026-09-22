import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './src/AppProviders';
import StackNavigation from './src/Navigations/StackNavigation';

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
