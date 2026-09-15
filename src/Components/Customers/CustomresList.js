import React, { useContext, useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { CustomerContext } from '../../Context/CustomerContext';
import { AuthContext } from '../../Context/AuthContext';

// Logic for individual cards
const CustomerCard = ({ item, navigation, cardWidth }) => {
  return (
    <View style={[styles.listContent, { width: cardWidth }]}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('CustomerDetails', { cbpName: item.cbpName })
        }
      >
        <View style={styles.cardHeader}>
          <Text style={styles.customerName} numberOfLines={1}>
            {item.cbpName}
          </Text>
          <Text style={styles.customerCode}>(CBP-{item.cbpNo})</Text>
        </View>

        <View style={styles.detailsContainer}>
          <DetailRow
            label="Customer Name"
            value={item.contactName || item.customerName}
          />
          <DetailRow
            label="Contact Number"
            value={item.contactNumber || item.mobile}
          />
          <DetailRow label="Email" value={item.email} isGreen />
          <DetailRow
            label="Account Manager"
            value={item.accountManager}
            isGreen
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DetailRow = ({ label, value, isGreen }) => (
  <Text style={styles.detailText}>
    {label}:{' '}
    <Text style={[styles.boldText, isGreen && { color: '#27ae60' }]}>
      {value || 'N/A'}
    </Text>
  </Text>
);

const CustomersList = ({ navigation, visible }) => {
  const { user } = useContext(AuthContext) || {};
  const {
    customers = [],
    loading,
    refresh,
  } = useContext(CustomerContext) || {};
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTab = width >= 768 && width <= 1024;
  const isDesktop = width > 1024;

  let currentContentPixels = width;
  if (visible && !isMobile) {
    currentContentPixels = isDesktop ? width * 0.8 : width * 0.7;
  }

  // 1. FIXED WIDTH CALCULATIONS WITH REASONABLE BASE
  let cardWidth = '100%';

  if (currentContentPixels >= 768 && currentContentPixels <= 1024) {
    cardWidth = '48%'; // Above 768 -> 2 Items (Tablet)
  } else if (currentContentPixels > 1024 && currentContentPixels <= 1340) {
    cardWidth = '31%'; // Above 1024 -> 3 Items (Laptop)
  } else if (currentContentPixels > 1340) {
    cardWidth = '23%'; // Above 1440 -> 4 Items (Desktop Large Screen)
  }

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      c =>
        c.cbpName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.cbpNo?.toString().includes(searchQuery),
    );
  }, [customers, searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer List</Text>
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

      {/* 
        2. CRITICAL WEB FIX: FlatList స్థానంలో ScrollView + .map() వాడటం జరిగింది.
        ఇది బ్రౌజర్ లోపల ఉండే అదనపు డివ్ (div) లేయర్స్ ని రిమూవ్ చేసి flex-grow ని 100% యాక్టివేట్ చేస్తుంది.
      */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            tintColor="#2b6cb0"
          />
        }
      >
        {loading && customers.length === 0 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#2b6cb0" />
            <Text style={{ marginTop: 10, color: '#666' }}>
              Fetching Customers...
            </Text>
          </View>
        ) : filteredCustomers.length > 0 ? (
          filteredCustomers.map((item, index) => (
            <CustomerCard
              key={item?.id?.toString() || index.toString()}
              item={item}
              navigation={navigation}
              cardWidth={cardWidth}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No customers found.</Text>
        )}
      </ScrollView>

      {user?.role_name === 'superadmin' && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddCustomer')}
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
  },
  header: {
    //backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
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

  // 3. UNIFIED ROW LAYOUT STYLES FOR TRUE GRID FLEX GROW
  listContainer: {
    padding: 12,
    paddingBottom: 100,
    width: '100%',
    ...Platform.select({
      web: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // కార్డ్‌లు లెఫ్ట్ నుండి లైన్ గా అలైన్ అవుతాయి
        alignItems: 'stretch', // ఒకే లైన్ లో ఉన్న కార్డ్స్ సమానమైన హైట్ తీసుకుంటాయి
      },
    }),
  },
  listContent: {
    paddingHorizontal: 6,
    marginBottom: 15,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    // ఇక్కడ flexGrow పెట్టడం వల్ల వెబ్ బ్రౌజర్ మిగిలిన ఖాళీ స్పేస్ ని సమానంగా పెంచుతుంది
    ...Platform.select({
      web: {
        flexGrow: 1,
      },
    }),
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#2168c1',
    width: '100%',
    //height: '100%', // ఒకే లైన్ లో ఉన్న అన్ని కార్డ్స్ ఒకే ఎత్తులో సాగడానికి కచ్చితంగా కావాలి
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a202c',
    flex: 1,
  },
  customerCode: {
    fontWeight: 'normal',
    color: '#718096',
  },
  detailsContainer: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#4a5568',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#2d3748',
  },
  center: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    color: '#718096',
    marginTop: 40,
    fontSize: 16,
    width: '100%',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2168c1',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -4,
  },
});

export default CustomersList;
