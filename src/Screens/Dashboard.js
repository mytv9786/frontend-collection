import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../Context/AuthContext';

const ProfileOption = ({ icon, label, onPress, color = '#333' }) => (
  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    <View style={styles.optionLeft}>
      <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
        👤
      </Text>
      <Text style={[styles.optionLabel, { color }]}>{label}</Text>
    </View>
    <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
      ➜
    </Text>
  </TouchableOpacity>
);

const Dashboard = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    //navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Text
              style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}
            >
              👤
            </Text>
          </View>
          <Text style={styles.userName}>{user?.userName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Group */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <ProfileOption
            icon="person-outline"
            label="Personal Information"
            onPress={() => {}}
          />
          <ProfileOption
            icon="security"
            label="Login & Security"
            onPress={() => {}}
          />
          <ProfileOption
            icon="notifications-none"
            label="Notifications"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <ProfileOption
            icon="help-outline"
            label="Help Center"
            onPress={() => {}}
          />
          <ProfileOption
            icon="info-outline"
            label="About App"
            onPress={() => {}}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
            ➜
          </Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#1e66c9', padding: 15, alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20, paddingBottom: 50 },
  userCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  userEmail: { fontSize: 14, color: '#7f8c8d', marginBottom: 15 },
  editBtn: {
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editBtnText: { color: '#1e66c9', fontWeight: '600' },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#95a5a6',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionLabel: { marginLeft: 15, fontSize: 16, fontWeight: '500' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  logoutText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Dashboard;
