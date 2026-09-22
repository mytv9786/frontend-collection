import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { PaymentContext } from '../Context/PaymentContext';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit/v2';
import HomePaymentsCard from '../Components/HomePaymentsCard';
import {
  useHomeCardWidth,
  COLORS,
  BACKGROUND_COLORS,
  SPACING,
  WIDTH,
} from '../Constants';

const data = [
  { month: 'Jan', revenue: 52 },
  { month: 'Feb', revenue: 86 },
  { month: 'Mar', revenue: 58 },
  { month: 'Apr', revenue: 134 },
];

const HomeScreen = ({ navigation, visible }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;

  const { payments } = useContext(PaymentContext);
  const { width } = useWindowDimensions();

  const { cardWidth, chartWidthPixels } = useHomeCardWidth({ visible });

  // Recevied payments list from total payments list
  const recentPayments = payments.filter(
    recentPay => recentPay.paidAmount !== '0.00' && recentPay.paidAmount,
  );

  // How many payments show in per page in screen
  const historyList = recentPayments || [];
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, historyList.length);

  // Total invoice amount Calc
  const totalAmount = payments.reduce((sum, acc) => {
    return sum + Number(acc.invoiceAmount);
  }, 0);

  // Paid amount Calc
  const totalPaid = payments.reduce((sum, acc) => {
    return sum + Number(acc.paidAmount);
  }, 0);

  // Due amount Calc
  const totalDue = totalAmount - totalPaid;

  // 2. Format numbers back to Currency Strings for display
  const formatCurrency = num => `₹ ${num.toLocaleString('en-IN')}`;

  const paymentPieChartData = [
    {
      name: 'Total Top-Up',
      amount: totalAmount,
      color: '#003B71', // మీ కార్డ్ కలర్ (Dark Blue)
      legendFontColor: '#334155',
      legendFontSize: 12,
    },
    {
      name: 'Total Paid',
      amount: totalPaid,
      color: '#13BC85', // మీ కార్డ్ కలర్ (Green)
      legendFontColor: '#334155',
      legendFontSize: 12,
    },
    {
      name: `Total Due: ₹${totalDue.toLocaleString('en-IN')}`,
      amount: totalDue,
      color: '#FF685E', // మీ కార్డ్ కలర్ (Red)
      legendFontColor: '#334155',
      legendFontSize: 12,
    },
  ];

  return (
    <View style={[styles.homeContainer]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <ScrollView
        style={styles.outerScrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.mainContent}>
          <View style={[styles.mainScreen]}>
            {/* Card of Invoice , Paid , Due Amounts */}
            <View style={[styles.cardsContainer]}>
              {/* Total Invoice/TopUp Amount Card */}
              <HomePaymentsCard
                title="Total Top-Up"
                amount={formatCurrency(totalAmount)}
                onPress={() =>
                  navigation.navigate('PaymentsList', { filterType: null })
                }
                color={COLORS.primary}
                cardWidth={cardWidth}
              />
              {/* Paid/Recived Amount Card */}
              <HomePaymentsCard
                title="Total Paid"
                amount={formatCurrency(totalPaid)}
                onPress={() =>
                  navigation.navigate('PaymentsList', { filterType: 'paid' })
                }
                color={COLORS.success}
                cardWidth={cardWidth}
              />
              {/* Total Due Amount Card */}
              <HomePaymentsCard
                title="Total Due"
                amount={formatCurrency(totalDue)}
                onPress={() =>
                  navigation.navigate('PaymentsList', { filterType: 'due' })
                }
                color={COLORS.warning}
                cardWidth={cardWidth}
              />
            </View>
            {/* Recent Payments Title */}

            <View style={styles.chartContainer}>
              <View style={[styles.chartCard, { width: cardWidth }]}>
                <Text style={styles.chartTitle}>
                  Performance Trends {width} (chart){chartWidthPixels}(test){' '}
                  {cardWidth}
                </Text>
                <PieChart
                  data={paymentPieChartData} // 💡 ఇక్కడ మన కొత్త అమౌంట్స్ డేటా ఇచ్చాం
                  width={chartWidthPixels}
                  valueKey="amount"
                  labelKey="name"
                  height={220}
                  chartConfig={loginChartConfig}
                  //accessor="amount" // 💡 మీ డేటా ఆబ్జెక్ట్ లోని కీ పేరు (amount) ఇక్కడ ఇవ్వాలి
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                  hasLegend={false}
                  style={styles.chartStyle}
                />
              </View>
              <View style={[styles.chartCard, { width: cardWidth }]}>
                <Text style={styles.chartTitle}>Performance Trends (Line)</Text>
                <LineChart
                  data={data}
                  xKey="month"
                  yKey="revenue"
                  width={chartWidthPixels}
                  height={240}
                  fromZero={true}
                  bezier
                  chartConfig={loginChartConfig}
                  style={[styles.chartStyle]}
                />
              </View>
              <View style={[styles.chartCard, { width: cardWidth }]}>
                <Text style={styles.chartTitle}>Performance Trends (Line)</Text>
                <BarChart
                  data={data}
                  xKey="month"
                  yKey="revenue"
                  width={chartWidthPixels}
                  height={240}
                  fromZero={true}
                  bezier
                  chartConfig={loginChartConfig}
                  style={styles.chartStyle}
                />
              </View>
            </View>
            <Text style={styles.paymentTitle}>Recent Payment History</Text>
            {/* Recent Paymnets List  */}
            <View style={[styles.cardsContainer]}>
              <View style={styles.tableWrapperCard}>
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
                        Recipt No
                      </Text>
                      <Text style={[styles.headerCell, styles.columnWidth]}>
                        Remarks
                      </Text>
                    </View>

                    {/* 📊 టేబుల్ రోస్ (Table Rows Data) */}
                    {historyList.slice(from, to).map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.tableRow,
                          index % 2 !== 0 && styles.bgColor, // నీ జిబ్రా లైన్ కలర్ అలాగే ఉంచాను
                        ]}
                      >
                        <Text
                          style={[
                            styles.cellText,
                            styles.columnWidth,
                            styles.boldText,
                          ]}
                        >
                          {item.customerName}
                        </Text>
                        <Text style={[styles.cellText, styles.columnWidth]}>
                          ₹{item.invoiceAmount}
                        </Text>
                        <Text style={[styles.cellText, styles.columnWidth]}>
                          ₹{item.paidAmount}
                        </Text>
                        <Text style={[styles.cellText, styles.columnWidth]}>
                          {item.paymentDate}
                        </Text>
                        <Text style={[styles.cellText, styles.columnWidth]}>
                          {item.balance || '-'}
                        </Text>
                        <Text style={[styles.cellText, styles.columnWidth]}>
                          {item.paymentMode}
                        </Text>
                        <Text style={[styles.cellText, styles.columnWidth]}>
                          {item.chequeNumber || '-'}
                        </Text>
                        <Text style={[styles.cellText, styles.columnWidth]}>
                          {item.bankName || '-'}
                        </Text>
                        <Text style={[styles.cellText, styles.columnWidth]}>
                          {item.chequeNumber || '-'}
                        </Text>
                        <Text style={[styles.cellText, styles.columnWidth]}>
                          {item.bankName || '-'}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                {/* 🔢 2. ప్యూర్ క్రాస్-ప్లాట్‌ఫార్మ్ పేజినేషన్ (Custom Pagination) */}

                <View style={styles.paginationContainer}>
                  <Text style={styles.paginationLabel}>
                    {from + 1}-{Math.min(to, historyList.length)} of{' '}
                    {historyList.length}
                  </Text>

                  <View style={styles.paginationActions}>
                    {/* వెనక్కి వెళ్లే బటన్ */}
                    <TouchableOpacity
                      style={[
                        styles.pageButton,
                        page === 0 && styles.disabledButton,
                      ]}
                      disabled={page === 0}
                      onPress={() => setPage(page - 1)}
                    >
                      <Text style={styles.pageButtonText}>◀</Text>
                    </TouchableOpacity>

                    {/* ముందుకు వెళ్లే బటన్ */}
                    <TouchableOpacity
                      style={[
                        styles.pageButton,
                        to >= historyList.length && styles.disabledButton,
                      ]}
                      disabled={to >= historyList.length}
                      onPress={() => setPage(page + 1)}
                    >
                      <Text style={styles.pageButtonText}>▶</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const baseChartConfig = {
  backgroundColor: '#0d0ba1',
  backgroundGradientFrom: '#c72424',
  backgroundGradientTo: '#cca5a5',
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  style: { borderRadius: 6 },
};

const loginChartConfig = {
  ...baseChartConfig,
  color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // Indigo
  propsForDots: { r: '4', strokeWidth: '2', stroke: '#94c019' },
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.secondary,
  },
  outerScrollView: {
    flex: 1,
  },
  // 💡 3. లోపల ఉన్న కంటెంట్ కి కింద స్పేస్ (Padding) ఇవ్వడానికి ఇది వాడతాం
  scrollContentContainer: {
    paddingBottom: SPACING.massive,
  },
  mainContent: {
    flex: 1,
    padding: SPACING.sm,
  },
  mainScreen: {
    width: WIDTH.screen,
    flex: 1,
  },
  cardsContainer: {
    alignItems: 'center',
    width: WIDTH.screen,
    gap: 20,
    padding: 10,
    ...Platform.select({
      web: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flexWrap: 'wrap',
      },
      android: {
        flexDirection: 'column',
        justifyContent: 'center',
      },
    }),
  },
  paymentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },

  chartContainer: {
    //position: 'relative',
    backgroundColor: '#cecece',
    padding: 10,
    borderRadius: 12,
    gap: 15,
    elevation: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 15,
  },
  chartCard: {
    //position: 'absolute',
    backgroundColor: '#ffffff',
    paddingTop: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    //minHeight: 280,
    flexGrow: 1,
    overflow: 'hidden',
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
    paddingLeft: 5,
    overflow: 'hidden',
  },
  chartStyle: {
    borderRadius: 12,
    marginVertical: 5,
  },

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
  scrollViewContainer: { flexGrow: 1 },
  pureTableContainer: {
    //flex: 1,
    width: 960, // 💡 అన్ని కాలమ్స్ పక్కపక్కన ఫ్రీగా ఇమడటానికి కనీస వెడల్పు 960px ఇచ్చాను
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
  bgColor: {
    backgroundColor: '#e8ebea',
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
});

export default HomeScreen;
