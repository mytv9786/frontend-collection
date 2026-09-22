import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomerContext } from '../../Context/CustomerContext';
//import { DataTable } from 'react-native-paper';

const InfoRow = ({ label, value, isBold = false }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, isBold && styles.boldText]}>{value}</Text>
  </View>
);

const ManagerDetails = ({ route }) => {
  const { item } = route?.params;
  const { customers } = useContext(CustomerContext);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  const assignedCustomers = customers.filter(c => c.username === item.userName);

  const historyList = assignedCustomers || [];
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, historyList.length);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manager Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Employee Info Card */}
        <View style={styles.card}>
          <InfoRow label="Employee ID" value={item.emplId} isBold={true} />
          <InfoRow label="Name" value={item.fullName} />
          <InfoRow label="Mobile" value={item.mobile} />
          <InfoRow label="Email" value={item.email} />
        </View>

        {/* Assigned Customers Card */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Assigned Customers</Text>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          >
            <View style={[styles.card, { width: '100%' }]}>
              <View style={styles.tableHeader}>
                <View style={[styles.columnHeader, styles.columnWidth]}>
                  <Text style={styles.headerText}>CBP No</Text>
                </View>
                <View style={[styles.columnHeader, styles.columnWidth]}>
                  <Text style={styles.headerText}>Customer Name</Text>
                </View>
                <View style={[styles.columnHeader, styles.columnWidth]}>
                  <Text style={styles.headerText}>mobile</Text>
                </View>
              </View>

              {historyList.slice(from, to).map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    index % 2 !== 0 && { backgroundColor: '#e8ebea' },
                  ]}
                >
                  <View style={styles.columnWidth}>
                    <Text style={[styles.cellName]}>{item.cbpNo}</Text>
                  </View>
                  <View style={styles.columnWidth}>
                    <Text style={[styles.cellName]}>{item.cbpName}</Text>
                  </View>
                  <View style={styles.columnWidth}>
                    <Text style={[styles.cellName]}>{item.mobile}</Text>
                  </View>
                </View>
              ))}
              <View
                page={page}
                numberOfPages={
                  Math.ceil(historyList.length / itemsPerPage) || 1
                }
                onPageChange={setPage}
                label={`${from + 1}-${to} of ${historyList.length}`}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d8dadb' },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 15,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#d1d8e0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  label: { fontSize: 15, color: '#555', fontWeight: '600' },
  value: { fontSize: 15, color: '#333' },
  boldText: { fontWeight: 'bold', color: '#000' },
  cardHeader: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d8e0',
  },
  cardHeaderText: { color: '#1e66c9', fontWeight: 'bold', fontSize: 14 },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  customerName: {
    fontSize: 15,
    color: '#2c3e50',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#2168c1',
    fontSize: 14,
  },
  columnHeader: {
    paddingHorizontal: 0,
  },
  columnWidth: {
    width: 120,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 2.5,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  cellName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default ManagerDetails;
