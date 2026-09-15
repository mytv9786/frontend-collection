import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen';
import PaymentsList from '../Components/Payments/PaymentsList';
import ManagersList from '../Components/manager/ManagersList';
import CustomersList from '../Components/Customers/CustomresList';
import Dashboard from '../Screens/Dashboard';

import House from 'lucide-react-native/icons/house';
import CreditCard from 'lucide-react-native/icons/credit-card';
import UserCheck from 'lucide-react-native/icons/user-check';
import Users from 'lucide-react-native/icons/users';
import User from 'lucide-react-native/icons/user';

const Tab = createBottomTabNavigator();

// 1. Move the icon logic outside the component
const getTabBarIcon = (routeName, focused, color, size) => {
  const strokeWidth = focused ? 2.5 : 2;

  switch (routeName) {
    case 'HomeScreen':
      return <House size={28} color={color} strokeWidth={strokeWidth} />;
    case 'PaymentsList':
      return <CreditCard size={28} color={color} strokeWidth={strokeWidth} />;
    case 'ManagersList':
      return <UserCheck size={28} color={color} strokeWidth={strokeWidth} />;
    case 'CustomersList':
      return <Users size={28} color={color} strokeWidth={strokeWidth} />;
    case 'Dashboard':
      return <User size={28} color={color} strokeWidth={strokeWidth} />;
    default:
      return <House size={28} color={color} strokeWidth={strokeWidth} />;
  }
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        // 2. Pass the external function here
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 8,
        },
        tabBarStyle: {
          position: 'absolute', // Makes it float
          bottom: 0, // Distance from bottom
          left: 20, // Side padding
          right: 20, // Side padding
          elevation: 5, // Shadow for Android
          backgroundColor: '#FFFFFF',
          borderRadius: 15, // Rounded corners
          height: 70, // Taller bar for better tap targets
          paddingBottom: 10, // Space for labels
          alignItems: 'center',
          justifyContent: 'center',
          // Shadow for iOS
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarIcon: props =>
          getTabBarIcon(route.name, props.focused, props.color, props.size),
        tabBarIconStyle: {
          marginTop: 6,
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="PaymentsList"
        component={PaymentsList}
        options={{ tabBarLabel: 'Payments' }}
      />
      <Tab.Screen
        name="ManagersList"
        component={ManagersList}
        options={{ tabBarLabel: 'Managers' }}
      />
      <Tab.Screen
        name="CustomersList"
        component={CustomersList}
        options={{ tabBarLabel: 'Customers' }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
