import React, { useEffect, useState, Platform } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { baseApi } from '../../Services/BaseApi';
//import { DataTable } from 'react-native-paper';
import Pagination from '../../UI/Pagination';

const DetailRow = ({ label, value, valueStyle }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);

const CustomerDetails = ({ navigation, route }) => {
  const { cbpName } = route?.params;
  const [customerDetailsData, setCustomerDetailData] = useState({
    history: [],
    summary: {},
    customerName: '',
  });
  const [loading, setLoading] = useState(true);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //const itemsPerPage = 5;

  const historyList = customerDetailsData?.history || [];
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, historyList.length);

  useEffect(() => {
    const fetchPaymentData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseApi}/api/payments/individual/${cbpName}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          const fetchData = {
            customerName: result.customer,
            summary: result.summary,
            history: result.history.map(item => ({
              accountManager: item.account_manager,
              balance: item.balance,
              bankName: item.bank_name,
              chequeNumber: item.cheque_number,
              formattedDate: item.formatted_date,
              invoiceAmount: item.invoice_amount,
              paidAmount: item.paid_amount,
              paymentId: item.payment_id,
              paymentMode: item.payment_mode,
              rankId: item.rank_id,
              remarks: item.remarks,
            })),
          };
          setCustomerDetailData(fetchData);
        } else {
          const data = await response.json();
          setCustomerDetailData(data);
          Alert.alert(data.message);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentData();
  }, [cbpName]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Customer Details</Text>
      </View>
      <View style={styles.content}>
        {/* Main Amount Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>
              {customerDetailsData.customerName}
            </Text>
          </View>
          {customerDetailsData.summary && (
            <View style={styles.cardBody}>
              <DetailRow
                label="Top-Up Amount"
                value={customerDetailsData.summary.totalInvoice}
              />
              <DetailRow
                label="Paid Amount"
                value={customerDetailsData.summary.totalPaid}
              />
              <DetailRow
                label="Due Amount"
                value={customerDetailsData.summary.totalBalance}
                valueStyle={styles.dueAmount}
              />
            </View>
          )}
        </View>
        {/* Transaction Info Card */}
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <DetailRow label="Top-Up Date" value="16 Feb 2026" />
            <View style={styles.detailRow}>
              <Text style={styles.label}>Payment Method</Text>
              <View style={styles.paymentIconPlaceholder} />
            </View>
            <DetailRow label="Remarks" value="Accounts" />
          </View>
        </View>
        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddPayment', { cbpName })}
          >
            <Text style={styles.buttonText}>Add Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: historyVisible ? '#555' : '#1e66c9' },
            ]}
            onPress={() => setHistoryVisible(!historyVisible)} // FIXED: Function wrapper
          >
            <Text style={styles.buttonText}>
              {historyVisible ? 'Hide History' : 'View History'}
            </Text>
          </TouchableOpacity>
        </View>
        {historyVisible && (
          <View style={[styles.tableWrapperCard]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={[styles.historyContainer]}>
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
                  <Text style={[styles.headerCell, styles.columnWidth]}>
                    Date
                  </Text>
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

                {historyList.slice(from, to).map((item, index) => (
                  <View
                    key={index}
                    style={[styles.tableRow, index % 2 !== 0 && styles.bgColor]}
                  >
                    <View style={styles.columnWidth}>
                      <Text style={[styles.cellName]}>
                        {customerDetailsData.customerName}
                      </Text>
                    </View>

                    <View style={styles.columnWidth}>
                      <Text style={styles.cellName}>₹{item.invoiceAmount}</Text>
                    </View>

                    <View style={styles.columnWidth}>
                      <Text style={styles.cellName}>{item.paidAmount}</Text>
                    </View>
                    <View style={styles.columnWidth}>
                      <Text style={styles.cellName}>{item.formattedDate}</Text>
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
                      <Text style={styles.cellName}>
                        {item.bankName || '-'}
                      </Text>
                    </View>
                    <View style={styles.columnWidth} c>
                      <Text style={styles.cellName}>
                        {item.receiptNo || '-'}
                      </Text>
                    </View>
                    <View style={styles.columnWidth} c>
                      <Text style={styles.cellName}>{item.remarks || '-'}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
            <Pagination
              listItems={historyList}
              page={page}
              setPage={setPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 20,
    marginHorizontal: 6,
    marginVertical: 20,
    boxShadow:
      '4px 4px 12px 0px rgba(77, 38, 29, 0.45), -4px -4px 12px 0px rgba(101, 84, 80, 0.45)',
    borderRadius: 20,
    marginBottom: 180,
  },
  header: { paddingHorizontal: 15, paddingTop: 15 },
  headerText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 15 },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    boxShadow:
      '4px 4px 12px 0px rgba(77, 38, 29, 0.45), -4px -4px 12px 0px rgba(101, 84, 80, 0.45)',
    borderRadius: 20,
  },
  cardHeader: { backgroundColor: '#1e66c9', padding: 10, alignItems: 'center' },
  cardHeaderText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cardBody: { padding: 15 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: { fontSize: 14, color: '#555' },
  value: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  dueAmount: { color: '#e74c3c' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1e66c9',
    flex: 0.48,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  paymentIconPlaceholder: {
    width: 40,
    height: 25,
    backgroundColor: '#333',
    borderRadius: 4,
  }, // Replace with Image
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
    boxShadow:
      '4px 4px 12px 0px rgba(101, 84, 80, 0.45), -4px -4px 12px 0px rgba(101, 84, 80, 0.45)',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  historyContainer: {
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
  headerTexts: {
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
  bgColor: { backgroundColor: '#e8ebea' },
});

export default CustomerDetails;
