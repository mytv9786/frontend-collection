import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

export default function Home({ navigation }) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const isLargeScreen = dimensions.width > 768;

  const DrawerMenu = () => (
    <View style={styles.drawer}>
      <Text style={styles.drawerTitle}>Dashboard</Text>

      <TouchableOpacity style={[styles.menuItem, styles.activeMenuItem]}>
        <Text style={[styles.menuText, styles.activeMenuText]}>🏠 Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          if (!isLargeScreen) setIsDrawerOpen(false);
          navigation.navigate('Profile'); // 👈 ప్రొఫైల్ స్క్రీన్‌కి నావిగేట్ అవుతుంది
        }}
      >
        <Text style={styles.menuText}>👤 Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLargeScreen ? (
        <View style={styles.largeScreenContainer}>
          <DrawerMenu />
          <View style={styles.mainContent}>
            <Text style={styles.title}>Welcome to Home Screen</Text>
            <Text style={styles.subText}>
              Platform:{' '}
              {Platform.OS === 'web' ? 'Web View' : 'Android Tab View'}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.mobileContainer}>
          {/* మొబైల్ కస్టమ్ హెడర్ (నాటివ్ హెడర్ వద్దు అనుకుంటే navigation options లో hide చేయవచ్చు) */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setIsDrawerOpen(!isDrawerOpen)}
              style={styles.menuButton}
            >
              <Text style={styles.menuIconText}>☰ Menu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainContent}>
            <Text style={styles.title}>Welcome to Home Screen</Text>
            {isDrawerOpen && (
              <View style={styles.overlayContainer}>
                <TouchableOpacity
                  style={styles.backdrop}
                  onPress={() => setIsDrawerOpen(false)}
                />
                <View style={styles.mobileDrawerWrapper}>
                  <DrawerMenu />
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  largeScreenContainer: { flex: 1, flexDirection: 'row' },
  mobileContainer: { flex: 1 },
  header: {
    height: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  menuButton: { padding: 5 },
  menuIconText: { fontSize: 16, fontWeight: 'bold', color: '#6200ee' },
  drawer: {
    width: 250,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    paddingTop: 20,
    paddingHorizontal: 10,
    height: '100%',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  activeMenuItem: { backgroundColor: '#e3f2fd' },
  menuText: { fontSize: 16, color: '#555' },
  activeMenuText: { color: '#1976d2', fontWeight: 'bold' },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 16, color: '#666', marginTop: 10 },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 999,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mobileDrawerWrapper: { width: 250, height: '100%', backgroundColor: '#fff' },
});
