import React from 'react';
// ❌ పాత native-stack ఇంపోర్ట్ తీసేశాము
// 🟢 కొత్త స్టాండర్డ్ stack ఇంపోర్ట్ యాడ్ చేశాము
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../Screens/LoginScreen';

// Native Stack కి బదులుగా నార్మల్ Stack వాడాలి
const Stack = createStackNavigator();

const StackNavigationss = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigationss;
