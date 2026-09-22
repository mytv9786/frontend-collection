import React, { useEffect, useState } from 'react';
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
    customer: '',
  });
  const [loading, setLoading] = useState(true);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [page, setPage] = React.useState(0);

  const itemsPerPage = 5;

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

          const fetchData = {
            customer: result.customer,
            summary: result.summary,
            history: result.history.map(item => ({
              accountManager: item.account_manager,
              balance: item.balance,
              bankName: item.back_name,
              chequeNumber: item.cheque_number,
              formattedDate: item.formatted_date,
              invoiceAmount: item.invoice_amount,
              paidAmount: item.paid_amount,
              paymentId: item.payment_id,
              paymentDate: item.payment_mode,
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
  //console.log(customerDetailsData);
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
              {customerDetailsData.customer}
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollCcontainer}
          >
            <View style={[styles.historyContainer]}>
              <View style={styles.tableHeader}>
                <View style={[styles.columnHeader, styles.columnWidth]}>
                  <Text style={styles.headerTexts}>Date</Text>
                </View>
                <View style={[styles.columnHeader, styles.columnWidth]}>
                  <Text style={styles.headerTexts}>Invoice</Text>
                </View>
                <View style={[styles.columnHeader, styles.columnWidth]}>
                  <Text style={styles.headerTexts}>Paid</Text>
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
                    <Text style={[styles.cellName]}>{item.formattedDate}</Text>
                  </View>
                  <View style={styles.columnWidth}>
                    <Text style={[styles.cellName]}>{item.invoiceAmount}</Text>
                  </View>
                  <View style={styles.columnWidth}>
                    <Text style={[styles.cellName]}>{item.paidAmount}</Text>
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
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#d8dadb' },
  header: { paddingHorizontal: 15, paddingTop: 15 },
  headerText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
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
  scrollCcontainer: { flex: 1, marginTop: 20 },
  historyContainer: {
    flex: 1,
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
});

export default CustomerDetails;
