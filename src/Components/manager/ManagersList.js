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
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddManager')}
        >
          <Text style={styles.btnText}> Add Manager</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    boxShadow:
      '4px 4px 12px 0px rgba(101, 84, 80, 0.45), -4px -4px 12px 0px rgba(101, 84, 80, 0.45)',
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  filterText: {
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: '#C8DDD9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  listContainer: {
    paddingVertical: 12,
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
  header: {},
});

export default ManagersList;
