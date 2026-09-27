import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ManagerContext } from '../../Context/ManagerContext';
import { AuthContext } from '../../Context/AuthContext';
import { useCardWidth, WIDTH } from '../../Constants';
import Pagination from '../../UI/Pagination';

const RenderManager = ({ item, navigation, index }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ManagerDetails', { item })}
    >
      <View
        key={index}
        style={[
          styles.tableRow,
          index % 2 !== 0 && styles.bgColor, // నీ జిబ్రా లైన్ కలర్ అలాగే ఉంచాను
        ]}
      >
        <Text style={[styles.cellText, styles.columnWidth, styles.boldText]}>
          {item?.userName}
        </Text>
        <Text style={[styles.cellText, styles.columnWidth, styles.boldText]}>
          {item?.fullName}
        </Text>
        <Text style={[styles.cellText, styles.columnWidth, styles.boldText]}>
          {item?.emplId}
        </Text>
        <Text style={[styles.cellText, styles.columnWidth, styles.boldText]}>
          {item?.mobile}
        </Text>
        <Text style={[styles.cellText, styles.columnWidth, styles.boldText]}>
          {item?.email}
        </Text>
        <Text style={[styles.cellText, styles.columnWidth, styles.boldText]}>
          {item?.role}
        </Text>
        <Text style={[styles.cellText, styles.columnWidth, styles.boldText]}>
          20
        </Text>
        <Text style={[styles.cellText, styles.columnWidth, styles.boldText]}>
          Active
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ManagerList = ({ visible }) => {
  const navigation = useNavigation();
  const { loading, setLoading } = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { managers } = useContext(ManagerContext);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const itemsPerPage = 2;

  // How many payments show in per page in screen
  const historyList = managers || [];
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, historyList.length);

  // 1. FIXED WIDTH CALCULATIONS WITH REASONABLE BASE
  let cardWidth = useCardWidth({ visible });

  const managersArray = Array.isArray(managers)
    ? managers
    : managers
    ? [managers]
    : [];

  return (
    <View style={styles.managersContainer}>
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
        {user?.role_name === 'superadmin' && (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddManager')}
          >
            <Text style={styles.btnText}> Add Manager</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Recent Paymnets List  */}
      <View style={[styles.paymentsContainer]}>
        {/* 🔢 1. ప్యూర్ క్రాస్-ప్లాట్‌ఫార్మ్ పేజినేషన్ (Custom Pagination) */}
        <Pagination
          listItems={managers}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
        />
        <View style={[styles.tableWrapperCard]}>
          {/* 1. కాలమ్స్ ఎక్కువ ఉన్నాయి కాబట్టి హారిజాంటల్ స్క్రోల్ లోపల ప్యూర్ వ్యూస్ తో టేబుల్ బిల్డ్ చేసాం */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={[styles.pureTableContainer]}>
              {/* 🏆 టేబుల్ హెడర్ (Table Header) */}

              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, styles.columnWidth]}>
                  Username
                </Text>
                <Text style={[styles.headerCell, styles.columnWidth]}>
                  full Name
                </Text>
                <Text style={[styles.headerCell, styles.columnWidth]}>
                  EMPL ID
                </Text>
                <Text style={[styles.headerCell, styles.columnWidth]}>
                  Mobile No
                </Text>
                <Text style={[styles.headerCell, styles.columnWidth]}>
                  Email ID
                </Text>
                <Text style={[styles.headerCell, styles.columnWidth]}>
                  Role
                </Text>
                <Text style={[styles.headerCell, styles.columnWidth]}>
                  Customers
                </Text>
                <Text style={[styles.headerCell, styles.columnWidth]}>
                  Status
                </Text>
              </View>

              {/* 📊 టేబుల్ రోస్ (Table Rows Data) */}
              <View
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
              >
                {loading && managersArray.length === 0 ? (
                  <View>
                    <ActivityIndicator size="large" color="#2b6cb0" />
                    <Text style={{ marginTop: 10, color: '#666' }}>
                      Fetching Customers...
                    </Text>
                  </View>
                ) : historyList.length > 0 ? (
                  historyList
                    .slice(from, to)
                    .map((item, index) => (
                      <RenderManager
                        key={item?.id?.toString() || index.toString()}
                        item={item}
                        index={index}
                        navigation={navigation}
                      />
                    ))
                ) : (
                  <Text style={styles.emptyText}>No customers found.</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
        {/* 🔢 2. ప్యూర్ క్రాస్-ప్లాట్‌ఫార్మ్ పేజినేషన్ (Custom Pagination) */}
        <Pagination
          listItems={managers}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
        />
      </View>
    </View>
  );
};

export default ManagerList;

const styles = StyleSheet.create({
  managersContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    boxShadow:
      '4px 4px 12px 0px rgba(101, 84, 80, 0.45), -4px -4px 12px 0px rgba(101, 84, 80, 0.45)',
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  header: {},
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
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
  paymentsContainer: {
    width: WIDTH.screen,
    //gap: 20,
    //paddingHorizontal: 10,
    marginTop: 40,
    borderRadius: 20,
  },
  tableWrapperCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    width: '100%',
    //maxWidth: 1200,
    //alignSelf: 'center',
    boxShadow:
      '4px 4px 12px 0px rgba(101, 84, 80, 0.45), -4px -4px 12px 0px rgba(101, 84, 80, 0.45)',
    marginBottom: 10,
  },
  scrollViewContainer: { flexGrow: 1 },
  pureTableContainer: {
    //flex: 1,
    width: '100%', // 💡 అన్ని కాలమ్స్ పక్కపక్కన ఫ్రీగా ఇమడటానికి కనీస వెడల్పు 960px ఇచ్చాను
    //flexGrow: 1,
  },

  tableHeader: {
    flexDirection: 'row',
    //backgroundColor: 'blue',
    paddingVertical: 14,
    //paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    margin: 6,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#1A1A2E',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: '600',
  },
  columnWidth: {
    width: 120, // 💡 ప్రతీ కాలమ్ సమానంగా 120px వెడల్పుతో నీట్ గా అలైన్ అవుతుంది
  },
});
