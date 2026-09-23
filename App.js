import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import StackNavigationss from './src/Navigations/StackNavigationss';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6200ee" />
      <StackNavigationss />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
