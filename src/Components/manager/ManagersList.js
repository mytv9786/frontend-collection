import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Platform,
  TextInput,
} from 'react-native';
import { ManagerContext } from '../../Context/ManagerContext';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';

import { useCardWidth } from '../../Constants';

const RenderManager = ({ item, navigation, cardWidth }) => {
  return (
    <TouchableOpacity
      style={[styles.managerCard, { width: cardWidth }]}
      onPress={() => navigation.navigate('ManagerDetails', { item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.nameText}>Username : {item?.userName}</Text>
        <Text style={styles.empIdText}>EMPL ID : {item?.emplId}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.label}>Full Name : </Text>
        <Text style={styles.value}>{item?.fullName}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.label}>Mobile : </Text>
        <Text style={styles.value}>{item?.mobile}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.label}>Email : </Text>
        <Text style={styles.value}>{item?.email}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.label}>Role : </Text>
        <Text style={styles.value}>{item?.role}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ManagersList = ({ visible }) => {
  const navigation = useNavigation();
  const { loading, setLoading } = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { managers } = useContext(ManagerContext);
  const { user } = useContext(AuthContext);

  // 1. FIXED WIDTH CALCULATIONS WITH REASONABLE BASE
  let cardWidth = useCardWidth({ visible });

  const managersArray = Array.isArray(managers)
    ? managers
    : managers
    ? [managers]
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manager List</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name or CBP No..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            //onRefresh={refresh}
            tintColor="#2b6cb0"
          />
        }
      >
        {loading && managersArray.length === 0 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#2b6cb0" />
            <Text style={{ marginTop: 10, color: '#666' }}>
              Fetching Customers...
            </Text>
          </View>
        ) : managersArray.length > 0 ? (
          managersArray.map((item, index) => (
            <RenderManager
              key={item?.id?.toString() || index.toString()}
              item={item}
              cardWidth={cardWidth}
              navigation={navigation}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No customers found.</Text>
        )}
      </ScrollView>
      {user?.role_name === 'superadmin' && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddManager')}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e3e7',
    padding: 6,
  },
  searchContainer: {
    padding: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    alignSelf: 'center',
  },
  listContainer: {
    padding: 12,
    paddingBottom: 100,
    width: '100%',
    gap: 10,
    ...Platform.select({
      web: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // కార్డ్‌లు లెఫ్ట్ నుండి లైన్ గా అలైన్ అవుతాయి
        alignItems: 'stretch', // ఒకే లైన్ లో ఉన్న కార్డ్స్ సమానమైన హైట్ తీసుకుంటాయి
      },
    }),
  },
  content: { padding: 15 },
  managerCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#2168c1',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    pb: 5,
  },
  empIdText: { fontSize: 12, color: '#7f8c8d', fontWeight: 'bold' },
  nameText: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  detailsRow: { flexDirection: 'row', marginTop: 4 },
  label: {
    fontWeight: '600',
    color: '#34495e',
    width: 90,
  },
  value: { color: '#7f8c8d' },
  empty: { textAlign: 'center', marginTop: 50, color: '#bdc3c7' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#2168c1',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    zIndex: 1,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -2, // Visual centering adjustment
  },
});

export default ManagersList;
