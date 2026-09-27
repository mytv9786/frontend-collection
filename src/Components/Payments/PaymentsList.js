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
//import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomerContext } from '../../Context/CustomerContext';
import Pagination from '../../UI/Pagination';

const PaymentsList = ({ route, visible }) => {
  // Get the filter type (e.g., 'paid') from navigation
  const navigation = useNavigation();
  const { customers } = useContext(CustomerContext);
  const { payments } = useContext(PaymentContext);
  const { filterType } = route.params || {};
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  //const itemsPerPage = 10;

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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {filterType === 'paid' ? 'Paid Transactions' : 'All Transactions'}
        </Text>
        <View style={styles.filterAndAddBtn}>
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
        <Pagination
          listItems={filteredData}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddPayment')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 12 },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  filterAndAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%',
  },
  filterBtn: {
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#000',
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
    //marginTop: 20,
    width: '100%',
    //maxWidth: 1200,
    alignSelf: 'center',
    boxShadow:
      '4px 4px 12px 0px rgba(101, 84, 80, 0.45), -4px -4px 12px 0px rgba(101, 84, 80, 0.45)',
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
