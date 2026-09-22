import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import Dashboard from '../Screens/Dashboard';
import AddManger from '../Components/manager/AddManager';
import AddCustomer from '../Components/Customers/AddCustomer';

import { AuthContext } from '../Context/AuthContext';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      {!isAuthenticated ? (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          {/* <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="AddManager" component={AddManger} />
          <Stack.Screen name="AddCustomer" component={AddCustomer} /> */}
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
