import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import StackNavigationss from './src/Navigations/StackNavigationss';
import StackNavigation from './src/Navigations/StackNavigation';

import { NavigationContainer } from '@react-navigation/native';
import AppProviders from './src/AppProviders';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppProviders>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#6200ee" />
          <StackNavigation />
        </NavigationContainer>
      </AppProviders>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
