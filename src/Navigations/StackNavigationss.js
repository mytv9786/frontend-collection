import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  useWindowDimensions,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Header from '../Components/Header';

import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import Dashboard from '../Screens/Dashboard';
import AddManager from '../Components/manager/AddManager';
import ManagersList from '../Components/manager/ManagersList';
import ManagerDetails from '../Components/manager/ManagerDetails';
import AddCustomer from '../Components/Customers/AddCustomer';
import CustomersList from '../Components/Customers/CustomresList';
import CustomerDetails from '../Components/Customers/CustomerDetails';
import AddPayment from '../Components/Payments/AddPayment';
import PaymentsList from '../Components/Payments/PaymentsList';

// Native Stack కి బదులుగా వెబ్ ఫ్రెండ్లీ స్టాండర్డ్ Stack వాడాము
const Stack = createStackNavigator();

// ─── AUTHENTICATED MASTER LAYOUT SHELL ───
const AppAuthenticatedShell = ({
  children,
  navigation,
  currentRoute,
  setVisible,
  visible,
  sidebarWidth,
}) => {
  const [preferencesOpen, setPreferencesOpen] = useState('');
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  const handleNavigation = screenName => {
    navigation.navigate(screenName);
    if (isMobile) setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6200ee" />

      {/* FIXED HEADER */}
      <Header
        visible={visible}
        setVisible={setVisible}
        logout={() => console.log('Logout Clicked')}
      />

      <View style={styles.mainBodyFrame}>
        {/* FIXED SIDEBAR */}
        <View
          style={[
            styles.sidebar,
            { width: sidebarWidth },
            isMobile && visible && styles.mobileSidebarOverlay,
          ]}
        >
          {visible && (
            <ScrollView style={styles.sidebarContent}>
              <Text style={styles.sidebarTitle}>మెనూ</Text>

              <TouchableOpacity
                onPress={() => handleNavigation('HomeScreen')}
                style={[
                  styles.menuItem,
                  currentRoute === 'HomeScreen' && styles.activeMenuItem,
                ]}
              >
                <Text style={styles.menuText}>🏠 Home Dashboard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleNavigation('Dashboard')}
                style={[
                  styles.menuItem,
                  currentRoute === 'Dashboard' && styles.activeMenuItem,
                ]}
              >
                <Text style={styles.menuText}>📊 Dashboard Reports</Text>
              </TouchableOpacity>

              {/* Managers Submenu */}
              <TouchableOpacity
                onPress={() =>
                  setPreferencesOpen(
                    preferencesOpen === 'manager' ? '' : 'manager',
                  )
                }
                style={styles.menuItem}
              >
                <Text style={styles.menuText}>👥 Managers Panel</Text>
                <Text style={styles.arrowIcon}>
                  {preferencesOpen === 'manager' ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
              {preferencesOpen === 'manager' && (
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('AddManager')}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'AddManager' && styles.activeText,
                      ]}
                    >
                      📄 Add Manager
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('ManagersList')}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'ManagersList' && styles.activeText,
                      ]}
                    >
                      📄 Managers List
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Customer Submenu */}
              <TouchableOpacity
                onPress={() =>
                  setPreferencesOpen(
                    preferencesOpen === 'customer' ? '' : 'customer',
                  )
                }
                style={styles.menuItem}
              >
                <Text style={styles.menuText}>👤 Customers Panel</Text>
                <Text style={styles.arrowIcon}>
                  {preferencesOpen === 'customer' ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
              {preferencesOpen === 'customer' && (
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('AddCustomer')}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'AddCustomer' && styles.activeText,
                      ]}
                    >
                      📄 Add Customer
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('CustomersList')}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'CustomersList' && styles.activeText,
                      ]}
                    >
                      📄 Customer List
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          )}
        </View>

        {/* SCREEN CONTENT DISPLAY AREA */}
        <View style={styles.contentFrame}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

// ─── MAIN MASTER NAVIGATION ROUTER ───
const StackNavigationss = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddManager" component={AddManager} />
      <Stack.Screen name="ManagersList" component={ManagersList} />
      <Stack.Screen name="ManagerDetails" component={ManagerDetails} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="CustomersList" component={CustomersList} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen name="AddPayment" component={AddPayment} />
      <Stack.Screen name="PaymentsList" component={PaymentsList} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  mainBodyFrame: { flex: 1, flexDirection: 'row' },
  sidebar: {
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
  },
  sidebarContent: { padding: 15 },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  activeMenuItem: { backgroundColor: '#e0dbff' },
  menuText: { fontSize: 16, color: '#333' },
  arrowIcon: { fontSize: 12, color: '#666' },
  dropdownContainer: { paddingLeft: 20, marginBottom: 10 },
  dropdownItem: { paddingVertical: 8 },
  dropdownItemText: { fontSize: 14, color: '#555' },
  activeText: { color: '#6200ee', fontWeight: 'bold' },
  contentFrame: { flex: 1, padding: 20 },
  mobileSidebarOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
  },
});

export default StackNavigationss;
export { AppAuthenticatedShell };
