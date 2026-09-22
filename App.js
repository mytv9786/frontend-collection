import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './src/AppProviders';
import StackNavigationss from './src/Navigations/StackNavigationss';

const App1 = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <StackNavigationss />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App1;
