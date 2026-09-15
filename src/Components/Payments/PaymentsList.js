import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { PaymentContext } from '../../Context/PaymentContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomerContext } from '../../Context/CustomerContext';

const PaymentsList = ({ route, visible }) => {
  // Get the filter type (e.g., 'paid') from navigation
  const navigation = useNavigation();
  const { customers } = useContext(CustomerContext);
  const { payments } = useContext(PaymentContext);
  const { filterType } = route.params || {};
  const [page, setPage] = useState(0);

  const itemsPerPage = 10;

  const paymentList = payments || [];
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, paymentList.length);
  // Filter data based on status

  const filteredData = React.useMemo(() => {
    if (!payments) return [];

    // Filter for PAID transactions (anything where money was actually collected)
    if (filterType === 'paid') {
      return payments.filter(item => parseFloat(item.paidAmount) > 0);
    }

    // Filter for DUE transactions (Grouping specific customers and summing balances)
    if (filterType === 'due') {
      const targetCustomers = customers.map(c => c.cbpName?.trim());

      const grouped = payments
        .filter(item => targetCustomers.includes(item.customerName?.trim()))
        .reduce((acc, current) => {
          const name = current.customerName.trim();
          const invoice = parseFloat(current.invoiceAmount || 0);
          const paid = parseFloat(current.paidAmount || 0);

          if (!acc[name]) {
            acc[name] = {
              ...current,
              invoiceAmount: invoice,
              paidAmount: paid,
              balance: invoice - paid,
              paymentDate: 'Summary', // Label it as a summary
            };
          } else {
            acc[name].invoiceAmount += invoice;
            acc[name].paidAmount += paid;
            acc[name].balance += invoice - paid;
          }
          return acc;
        }, {});

      return Object.values(grouped);
    }

    return payments;
  }, [payments, filterType, customers]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {filterType === 'paid' ? 'Paid Transactions' : 'All Transactions'}
        </Text>
      </View>

      <View style={[styles.tableWrapperCard]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={[styles.pureTableContainer]}>
            <View style={[styles.tableHeader]}>
              <Text style={[styles.headerCell, styles.columnWidth]}>
                Customer
              </Text>
              <Text style={[styles.headerCell, styles.columnWidth]}>
                Invoice Amount
              </Text>
              <Text style={[styles.headerCell, styles.columnWidth]}>
                Paid Amount
              </Text>
              <Text style={[styles.headerCell, styles.columnWidth]}>Date</Text>
              <Text style={[styles.headerCell, styles.columnWidth]}>
                Balance
              </Text>
              <Text style={[styles.headerCell, styles.columnWidth]}>
                Payment Mode
              </Text>
              <Text style={[styles.headerCell, styles.columnWidth]}>
                Cheque No
              </Text>
              <Text style={[styles.headerCell, styles.columnWidth]}>
                Bank Name
              </Text>
              <Text style={[styles.headerCell, styles.columnWidth]}>
                Receipt No
              </Text>
              <Text style={[styles.headerCell, styles.columnWidth]}>
                Remarks
              </Text>
            </View>

            {filteredData.slice(from, to).map((item, index) => (
              <View
                key={index}
                style={[styles.tableRow, index % 2 !== 0 && styles.bgColor]}
              >
                <View style={styles.columnWidth}>
                  <Text style={[styles.cellName]}>{item.customerName}</Text>
                </View>

                <View style={styles.columnWidth}>
                  <Text style={styles.cellName}>₹{item.invoiceAmount}</Text>
                </View>

                <View style={styles.columnWidth}>
                  <Text style={styles.cellName}>{item.paidAmount}</Text>
                </View>
                <View style={styles.columnWidth}>
                  <Text style={styles.cellName}>{item.paymentDate}</Text>
                </View>
                <View style={styles.columnWidth} c>
                  <Text style={styles.cellName}>{item.balance || '-'}</Text>
                </View>
                <View style={styles.columnWidth}>
                  <Text style={styles.cellName}>{item.paymentMode}</Text>
                </View>
                <View style={styles.columnWidth}>
                  <Text style={styles.cellName}>
                    {item.chequeNumber || '-'}
                  </Text>
                </View>
                <View style={styles.columnWidth} c>
                  <Text style={styles.cellName}>{item.bankName || '-'}</Text>
                </View>
                <View style={styles.columnWidth} c>
                  <Text style={styles.cellName}>{item.receiptNo || '-'}</Text>
                </View>
                <View style={styles.columnWidth} c>
                  <Text style={styles.cellName}>{item.remarks || '-'}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationLabel}>
            {from + 1}-{Math.min(to, filteredData.length)} of{' '}
            {filteredData.length}
          </Text>

          <View style={styles.paginationActions}>
            {/* వెనక్కి వెళ్లే బటన్ */}
            <TouchableOpacity
              style={[styles.pageButton, page === 0 && styles.disabledButton]}
              disabled={page === 0}
              onPress={() => setPage(page - 1)}
            >
              <Text style={styles.pageButtonText}>◀</Text>
            </TouchableOpacity>

            {/* ముందుకు వెళ్లే బటన్ */}
            <TouchableOpacity
              style={[
                styles.pageButton,
                to >= filteredData.length && styles.disabledButton,
              ]}
              disabled={to >= filteredData.length}
              onPress={() => setPage(page + 1)}
            >
              <Text style={styles.pageButtonText}>▶</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddPayment')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e1e3e7' },
  header: { padding: 15, alignItems: 'center' },
  headerTitle: { color: '#000', fontSize: 18, fontWeight: 'bold' },

  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  historyItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2, // Shadow for Android
  },
  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  date: { fontSize: 12, color: '#888', marginTop: 4 },
  amount: { fontSize: 16, fontWeight: 'bold' },
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
  scrollViewContainer: { flexGrow: 1 },
  //dabale data
  tableWrapperCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginTop: 20,
    width: '100%',
    //maxWidth: 1200,
    alignSelf: 'center',
  },
  pureTableContainer: {
    //flex: 1,
    //width: 960, // 💡 అన్ని కాలమ్స్ పక్కపక్కన ఫ్రీగా ఇమడటానికి కనీస వెడల్పు 960px ఇచ్చాను
    flexGrow: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
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
    borderBottomWidth: 2.5,
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
  // పేజినేషన్ స్టైల్స్
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 20,
  },
  paginationLabel: {
    fontSize: 13,
    color: '#555',
  },
  paginationActions: {
    flexDirection: 'row',
    gap: 10,
  },
  pageButton: {
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  disabledButton: {
    backgroundColor: '#CBD5E1',
    opacity: 0.6,
  },
  tableHeaders: {
    backgroundColor: '#eeeeee',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#2168c1',
    fontSize: 14,
  },
  columnHeader: {
    paddingHorizontal: 0,
  },
  columnWidths: {
    width: 120,
    ...Platform.select({
      web: {
        width: 380,
      },
    }),
  },
  rowStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    minHeight: 50,
  },
  bgColor: { backgroundColor: '#e8ebea' },
  cellName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  cellAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32', // Green for money
    backgroundColor: 'red',
  },
  cellDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default PaymentsList;
