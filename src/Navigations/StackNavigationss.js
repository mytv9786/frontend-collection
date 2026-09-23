// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import Home from '../Screens/Home';
// import Profile from '../Screens/ProfileScreen';

// export default function Navigation() {
//   const [dimensions, setDimensions] = useState(Dimensions.get('window'));
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [activeScreen, setActiveScreen] = useState('Home');

//   useEffect(() => {
//     const subscription = Dimensions.addEventListener('change', ({ window }) => {
//       setDimensions(window);
//     });
//     return () => subscription?.remove();
//   }, []);

//   // వెబ్ లేదా ఆండ్రాయిడ్ టాబ్లెట్స్ (Width > 768) లార్జ్ స్క్రీన్‌గా పరిగణించబడుతుంది
//   const isLargeScreen = dimensions.width > 768;

//   // కరెంట్ స్క్రీన్‌ను రెండర్ చేయడానికి ఫంక్షన్
//   const renderActiveScreen = () => {
//     switch (activeScreen) {
//       case 'Home':
//         return <Home />;
//       case 'Profile':
//         return <Profile />;
//       default:
//         return <Home />;
//     }
//   };

//   const DrawerMenu = () => (
//     <View style={styles.drawer}>
//       <Text style={styles.drawerTitle}>MyApp Menu</Text>
//       {[
//         { name: 'Home', label: '🏠 Home' },
//         { name: 'Profile', label: '👤 Profile' },
//       ].map(item => (
//         <TouchableOpacity
//           key={item.name}
//           style={[
//             styles.menuItem,
//             activeScreen === item.name && styles.activeMenuItem,
//           ]}
//           onPress={() => {
//             setActiveScreen(item.name);
//             if (!isLargeScreen) setIsDrawerOpen(false); // మొబైల్‌లో ఐటెమ్ క్లిక్ చేయగానే డ్రాయర్ క్లోజ్ అవుతుంది
//           }}
//         >
//           <Text
//             style={[
//               styles.menuText,
//               activeScreen === item.name && styles.activeMenuText,
//             ]}
//           >
//             {item.label}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {isLargeScreen ? (
//         /* 1. 🖥️ వెబ్ & టాబ్లెట్ లార్జ్ స్క్రీన్ లేఅవుట్ (ఎల్లప్పుడూ ఓపెన్ ఉండే డ్రాయర్) */
//         <View style={styles.largeScreenContainer}>
//           <DrawerMenu />
//           <View style={styles.mainContent}>{renderActiveScreen()}</View>
//         </View>
//       ) : (
//         /* 2. 📱 మొబైల్ / చిన్న స్క్రీన్ లేఅవుట్ (టాగుల్ డ్రాయర్) */
//         <View style={styles.mobileContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() => setIsDrawerOpen(!isDrawerOpen)}
//               style={styles.menuButton}
//             >
//               <Text style={styles.menuIconText}>☰</Text>
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>{activeScreen}</Text>
//           </View>

//           <View style={styles.mainContent}>
//             {renderActiveScreen()}

//             {/* మొబైల్ డ్రాయర్ ఓవర్లే */}
//             {isDrawerOpen && (
//               <View style={styles.overlayContainer}>
//                 <TouchableOpacity
//                   style={styles.backdrop}
//                   onPress={() => setIsDrawerOpen(false)}
//                 />
//                 <View style={styles.mobileDrawerWrapper}>
//                   <DrawerMenu />
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   largeScreenContainer: { flex: 1, flexDirection: 'row' },
//   mobileContainer: { flex: 1 },
//   header: {
//     height: 60,
//     backgroundColor: '#6200ee',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//       },
//       android: { elevation: 4 },
//       web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' },
//     }),
//   },
//   menuButton: { marginRight: 20 },
//   menuIconText: { fontSize: 24, color: '#fff' },
//   headerTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
//   drawer: {
//     width: 260,
//     backgroundColor: '#ffffff',
//     borderRightWidth: 1,
//     borderRightColor: '#e0e0e0',
//     paddingTop: 30,
//     paddingHorizontal: 15,
//     height: '100%',
//   },
//   drawerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#333',
//   },
//   menuItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   activeMenuItem: { backgroundColor: '#e3f2fd' },
//   menuText: { fontSize: 16, color: '#555' },
//   activeMenuText: { color: '#1976d2', fontWeight: 'bold' },
//   mainContent: { flex: 1, position: 'relative', backgroundColor: '#f9f9f9' },
//   overlayContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     flexDirection: 'row',
//     zIndex: 999,
//   },
//   backdrop: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   mobileDrawerWrapper: { width: 260, height: '100%', backgroundColor: '#fff' },
// });

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Profile from '../Screens/ProfileScreen';
import LoginScreen from '../Screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: '🏠 Home Dashboard' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: '👤 My Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
