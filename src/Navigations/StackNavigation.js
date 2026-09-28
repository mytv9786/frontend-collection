import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import File from 'lucide-react-native/icons/file';
import { COLOR, TEST_COLORS } from '../Constants';

import {
  useWindowDimensions,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';

import {
  CircleUserRound,
  House,
  Users,
  CreditCard,
  LogOut,
} from 'lucide-react-native';

import Header from '../Components/Header';

import BottomTabNavigation from '../Navigations/BottomTabNavigation';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import Dashboard from '../Screens/Dashboard';
import AddManager from '../Components/manager/AddManager';
import ManagersList from '../Components/manager/ManagersList';
import ManagerList from '../Components/manager/ManagerList';
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
  const { logout, user } = useContext(AuthContext);
  const { width } = useWindowDimensions();

  const isMobile = width <= 768;

  const handleNavigation = screenName => {
    navigation.navigate(screenName); // Correct native stack context mapping!
    if (isMobile) setVisible(false); // Mobile view automatic side overlay panel closing triggers
    //setVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6200ee" />

      {/* ─── GLOBAL FIXED HEADER ─── */}

      <View style={styles.mainBodyFrame}>
        {/* ─── GLOBAL FIXED SIDEBAR ─── */}
        <View
          style={[
            styles.sidebar,
            { width: sidebarWidth },
            isMobile && visible && styles.mobileSidebarOverlay,
          ]}
        >
          <ScrollView contentContainerStyle={styles.sidebarContent}>
            <View>
              {isMobile && visible && (
                <TouchableOpacity
                  style={styles.toggleButtonMenu}
                  onPress={() => setVisible(!visible)}
                >
                  <Text style={styles.toggleButtonText}>☰</Text>
                </TouchableOpacity>
              )}
              <View style={styles.sidebarProfile}>
                <CircleUserRound size={visible ? 80 : 24} />
                {visible && (
                  <Text style={styles.sidebarTitle}>Welcome Saiteja</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => handleNavigation('HomeScreen')}
                style={[
                  styles.menuItem,
                  currentRoute === 'HomeScreen' && styles.activeMenuItem,
                ]}
              >
                <View style={styles.menuIcon}>
                  <House size={visible ? 30 : 24} />
                  {visible && (
                    <View style={styles.menuIcon}>
                      <Text style={styles.menuText}>Dashboardd</Text>
                      <Text style={styles.arrowIcon}></Text>
                    </View>
                  )}
                </View>
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
                <View style={styles.menuIcon}>
                  <Users size={24} />
                  {visible && (
                    <View style={styles.menuIcon}>
                      <Text style={styles.menuText}>Managers Panel</Text>
                      <Text style={styles.arrowIcon}>
                        {preferencesOpen === 'manager' ? '▲' : '▼'}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              {preferencesOpen === 'manager' && (
                <View style={styles.dropdownContainer}>
                  {user?.role_name === 'superadmin' && (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleNavigation('AddManager')}
                    >
                      <View style={styles.menuIcon}>
                        <File size={20} />
                        <Text
                          style={[
                            styles.dropdownItemText,
                            currentRoute === 'AddManager' && styles.activeText,
                          ]}
                        >
                          Add Manager
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('Manager')}
                  >
                    <View style={styles.menuIcon}>
                      <File size={20} />
                      <Text
                        style={[
                          styles.dropdownItemText,
                          currentRoute === 'Manager' && styles.activeText,
                        ]}
                      >
                        Manager
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('ManagersList')}
                  >
                    <View style={styles.menuIcon}>
                      <File size={20} />
                      <Text
                        style={[
                          styles.dropdownItemText,
                          currentRoute === 'ManagersList' && styles.activeText,
                        ]}
                      >
                        Managers List
                      </Text>
                    </View>
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
                <View style={styles.menuIcon}>
                  <Users size={24} />
                  {visible && (
                    <View style={styles.menuIcon}>
                      <Text style={styles.menuText}>Customers Panel</Text>
                      <Text style={styles.arrowIcon}>
                        {preferencesOpen === 'manager' ? '▲' : '▼'}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              {preferencesOpen === 'customer' && (
                <View style={styles.dropdownContainer}>
                  {user?.role_name === 'superadmin' && (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleNavigation('AddCustomer')}
                    >
                      <View style={styles.menuIcon}>
                        <File size={20} />
                        <Text
                          style={[
                            styles.dropdownItemText,
                            currentRoute === 'AddCustomer' && styles.activeText,
                          ]}
                        >
                          Add Customer
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('CustomersList')}
                  >
                    <View style={styles.menuIcon}>
                      <File size={20} />
                      <Text
                        style={[
                          styles.dropdownItemText,
                          currentRoute === 'CustomersList' && styles.activeText,
                        ]}
                      >
                        Customer List
                      </Text>
                    </View>
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
                <View style={styles.menuIcon}>
                  <CreditCard size={24} />
                  {visible && (
                    <View style={styles.menuIcon}>
                      <Text style={styles.menuText}>Payments Panel</Text>
                      <Text style={styles.arrowIcon}>
                        {preferencesOpen === 'manager' ? '▲' : '▼'}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              {preferencesOpen === 'payment' && (
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('AddPayment')}
                  >
                    <View style={styles.menuIcon}>
                      <File size={20} />
                      <Text
                        style={[
                          styles.dropdownItemText,
                          currentRoute === 'AddPayment' && styles.activeText,
                        ]}
                      >
                        Add Payment
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation('PaymentsList')}
                  >
                    <View style={styles.menuIcon}>
                      <File size={20} />
                      <Text
                        style={[
                          styles.dropdownItemText,
                          currentRoute === 'PaymentsList' && styles.activeText,
                        ]}
                      >
                        Payments List
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.logoutItem}
              onPress={() => logout()}
            >
              <LogOut size={24} />
              {visible && (
                <View style={styles.menuIcons}>
                  <Text style={styles.menuText}>LogOut</Text>
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* ─── DYNAMIC CORE INJECTED SCREEN CONTENT ─── */}
        <View
          style={[
            styles.mainScreenContent,
            {
              width: mainScreenWidth,
            },
          ]}
        >
          <Header
            visible={visible}
            setVisible={setVisible}
            currentRoute={currentRoute}
            logout={logout}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

// ─── STACK ROUTER ENTRY MAIN COMPONENT ───
const StackNavigation = () => {
  const { isAuthenticated } = useContext(AuthContext);
  //console.log(isAuthenticated);

  // Sidebar toggling dynamic tracking states
  const [visible, setVisible] = useState(true);
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  const isDesktop = width > 1024;
  const isTab = width > 768 && width <= 1024;
  const isMobile = width <= 768;

  let sidebarWidth = '0';
  if (visible) {
    if (isDesktop) sidebarWidth = '20%';
    else if (isTab) sidebarWidth = '30%';
    else sidebarWidth = '60%';
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
            component={WrapWithShell(HomeScreen, 'Dashboard')}
          />
          <Stack.Screen
            name="Profile"
            component={WrapWithShell(Dashboard, 'Profile')}
          />
          <Stack.Screen
            name="AddManager"
            component={WrapWithShell(AddManager, 'Add Manager')}
          />
          <Stack.Screen
            name="Manager"
            component={WrapWithShell(ManagerList, 'Managers')}
          />
          <Stack.Screen
            name="ManagersList"
            component={WrapWithShell(ManagersList, 'Managers List')}
          />
          <Stack.Screen
            name="ManagerDetails"
            component={WrapWithShell(ManagerDetails, 'Manager Details')}
          />
          <Stack.Screen
            name="AddCustomer"
            component={WrapWithShell(AddCustomer, 'Add Customer')}
          />
          <Stack.Screen
            name="CustomersList"
            component={WrapWithShell(CustomersList, 'Customers List')}
          />
          <Stack.Screen
            name="CustomerDetails"
            component={WrapWithShell(CustomerDetails, 'Customer Details')}
          />
          <Stack.Screen
            name="AddPayment"
            component={WrapWithShell(AddPayment, 'Add Payment')}
          />
          <Stack.Screen
            name="PaymentsList"
            component={WrapWithShell(PaymentsList, 'Payments List')}
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
  container: {
    backgroundColor: COLOR.mutedCoralPink,
    ...Platform.select({
      web: {
        width: '100vw',
        height: '100vh',
      },
    }),
  },
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
    //position: 'relative',
    paddingVertical: 40,
    backgroundColor: COLOR.sidebarBackground,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    overflow: 'hidden',
    boxShadow:
      '4px 4px 12px 0px rgba(120, 140, 135, 0.35), -4px -4px 10px 0px rgba(255, 255, 255, 0.75)',
    ...Platform.select({
      web: {
        transitionProperty: 'width',
        transitionDuration: '0.2s',
      },
    }),
  },
  mobileSidebarOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 5,
  },
  sidebarContent: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  toggleButtonMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  toggleButtonText: {
    color: COLOR.darkCharcoalBrown,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sidebarProfile: {
    alignItems: 'center',
    marginVertical: 20,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingHorizontal: 12,
    gap: 20,
  },
  menuIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  activeMenuItem: { backgroundColor: '#f0e6ff', borderRadius: 12 },
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
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  mainScreenContent: { flex: 1, backgroundColor: COLOR.mainBackground },

  mainScreenArea: {
    flex: 1,
    height: '100%',
  },
});

export default StackNavigation;
