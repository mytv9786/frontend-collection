import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import File from 'lucide-react-native/icons/file';

import {
  useWindowDimensions,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import Header from '../Components/Header';

import BottomTabNavigation from '../Navigations/BottomTabNavigation';
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
import { AuthContext } from '../Context/AuthContext';

const Stack = createNativeStackNavigator();

// ─── AUTHENTICATED MASTER LAYOUT SHELL ───
// Ikkada 'children' mariyu direct 'navigation' object ni safe ga parameters laga catch chestunnam
const AppAuthenticatedShell = ({
  children,
  navigation,
  currentRoute,
  setVisible,
  visible,
  sidebarWidth,
  mainScreenWidth,
}) => {
  const [preferencesOpen, setPreferencesOpen] = useState('');
  const { logout } = useContext(AuthContext);
  const { width } = useWindowDimensions();

  const isMobile = width <= 768;

  const handleNavigation = screenName => {
    navigation.navigate(screenName); // Correct native stack context mapping!
    if (isMobile) setVisible(false); // Mobile view automatic side overlay panel closing triggers
    //setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6200ee" />

      {/* ─── GLOBAL FIXED HEADER ─── */}

      <Header visible={visible} setVisible={setVisible} logout={logout} />

      <View style={styles.mainBodyFrame}>
        {/* ─── GLOBAL FIXED SIDEBAR ─── */}
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

              {/* Managers Submenu Dropdown */}
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
                    <File size={20} />
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'AddManager' && styles.activeText,
                      ]}
                    >
                      Add Manager
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('ManagersList')}
                  >
                    <File size={20} />
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'ManagersList' && styles.activeText,
                      ]}
                    >
                      Managers List
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Customer Dropdown */}
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
                    <File size={20} />
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'AddCustomer' && styles.activeText,
                      ]}
                    >
                      Add Customer
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('CustomersList')}
                  >
                    <File size={20} />
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'CustomersList' && styles.activeText,
                      ]}
                    >
                      Customer List
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Payment Dropdown */}
              <TouchableOpacity
                onPress={() =>
                  setPreferencesOpen(
                    preferencesOpen === 'payment' ? '' : 'payment',
                  )
                }
                style={styles.menuItem}
              >
                <Text style={styles.menuText}>👤 Payments Panel</Text>
                <Text style={styles.arrowIcon}>
                  {preferencesOpen === 'payment' ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
              {preferencesOpen === 'payment' && (
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('AddPayment')}
                  >
                    <File size={20} />
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'AddPayment' && styles.activeText,
                      ]}
                    >
                      Add Payment
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('PaymentsList')}
                  >
                    <File size={20} />
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentRoute === 'PaymentsList' && styles.activeText,
                      ]}
                    >
                      Payments List
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          )}
        </View>

        {/* ─── DYNAMIC CORE INJECTED SCREEN CONTENT ─── */}
        <View style={[styles.mainScreenContent, { width: mainScreenWidth }]}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

// ─── STACK ROUTER ENTRY MAIN COMPONENT ───
const StackNavigation = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(!isAuthenticated);

  // Sidebar toggling dynamic tracking states
  const [visible, setVisible] = useState(true);
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  const isDesktop = width > 1024;
  const isTab = width > 768 && width <= 1024;
  const isMobile = width <= 768;

  let sidebarWidth = '0%';
  if (visible) {
    if (isDesktop) sidebarWidth = '20%';
    else if (isTab) sidebarWidth = '30%';
    else sidebarWidth = '70%';
  }

  const mainScreenWidth =
    visible && !isMobile ? (isDesktop ? '80%' : '70%') : '100%';

  // Ee Higher-Order Layout Injector function valla code repetition lekunda React Navigation perfect ga work avvadaniki sahayapadutundi.
  const WrapWithShell = (Component, routeName) => {
    return props => (
      <AppAuthenticatedShell
        navigation={props.navigation}
        currentRoute={routeName}
        visible={visible}
        setVisible={setVisible}
        sidebarWidth={sidebarWidth}
        mainScreenWidth={mainScreenWidth}
      >
        <Component
          {...props}
          visible={visible}
          sidebarWidth={sidebarWidth}
          mainScreenWidth={mainScreenWidth}
        />
      </AppAuthenticatedShell>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      {!isAuthenticated ? (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      ) : isWeb ? (
        <>
          {/* wrapWithShell function prathi dynamic container loop route structure context layout logic maintain chesthundi */}

          <Stack.Screen
            name="HomeScreen"
            component={WrapWithShell(HomeScreen, 'HomeScreen')}
          />
          <Stack.Screen
            name="Dashboard"
            component={WrapWithShell(Dashboard, 'Dashboard')}
          />
          <Stack.Screen
            name="AddManager"
            component={WrapWithShell(AddManager, 'AddManager')}
          />
          <Stack.Screen
            name="ManagersList"
            component={WrapWithShell(ManagersList, 'ManagersList')}
          />
          <Stack.Screen
            name="ManagerDetails"
            component={WrapWithShell(ManagerDetails, 'ManagerDetails')}
          />
          <Stack.Screen
            name="AddCustomer"
            component={WrapWithShell(AddCustomer, 'AddCustomer')}
          />
          <Stack.Screen
            name="CustomersList"
            component={WrapWithShell(CustomersList, 'CustomersList')}
          />
          <Stack.Screen
            name="CustomerDetails"
            component={WrapWithShell(CustomerDetails, 'CustomerDetails')}
          />
          <Stack.Screen
            name="AddPayment"
            component={WrapWithShell(AddPayment, 'AddPayment')}
          />
          <Stack.Screen
            name="PaymentsList"
            component={WrapWithShell(PaymentsList, 'PaymentsList')}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          {/* మొబైల్‌లో లోపలి పేజీలకు వెళ్ళినప్పుడు బాటమ్ ట్యాబ్స్ హైడ్ అవ్వడానికి స్టాక్‌లో విడిగా పెట్టాము */}
          <Stack.Screen
            name="AddManager"
            component={AddManager}
            options={{ headerShown: true, title: 'Add Manager' }}
          />
          <Stack.Screen
            name="ManagerDetails"
            component={ManagerDetails}
            options={{ headerShown: true, title: 'Manager Details' }}
          />
          <Stack.Screen
            name="AddCustomer"
            component={AddCustomer}
            options={{ headerShown: true, title: 'Add Customer' }}
          />
          <Stack.Screen
            name="CustomerDetails"
            component={CustomerDetails}
            options={{ headerShown: true, title: 'Customer Details' }}
          />
          <Stack.Screen
            name="AddPayment"
            component={AddPayment}
            options={{ headerShown: true, title: 'Add Payment' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerContainer: {
    height: 60,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContext: 'space-between',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  toggleButton: { padding: 10, borderRadius: 5 },
  buttonText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  titleArea: { alignItems: 'center' },
  mainTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  subText: { color: '#CCCCCC', fontSize: 11, marginTop: 2 },
  mainBodyFrame: { flex: 1, flexDirection: 'row' },
  sidebar: {
    backgroundColor: '#F8F9FA',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    overflow: 'hidden',
  },
  mobileSidebarOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 5,
  },
  sidebarContent: { padding: 15 },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingHorizontal: 5,
  },
  activeMenuItem: { backgroundColor: '#f0e6ff', borderRadius: 4 },
  menuText: { fontSize: 15, fontWeight: '500' },
  arrowIcon: { fontSize: 12, color: '#888' },
  dropdownContainer: {
    backgroundColor: '#F1F3F5',
    paddingLeft: 15,
    borderRadius: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#495057',
    marginLeft: 6,
  },
  activeText: { color: '#6200ee', fontWeight: 'bold' },
  mainScreenContent: { flex: 1 },
});

export default StackNavigation;
