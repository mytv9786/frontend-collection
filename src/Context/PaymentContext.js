import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from './AuthContext';

export const PaymentContext = createContext();

const PaymentReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PAYMENT':
      return action.payload || [];
    case 'ADD_PAYMENT':
      return [action.payload, ...state];
    case 'REMOVE_PAYMENT':
      return state.filter(p => p.id !== action.payload);
    default:
      return state;
  }
};

export const PaymentContextProvider = ({ children }) => {
  // const { token } = useContext(AuthContext);
  const [payments, dispatch] = useReducer(PaymentReducer, []);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const initialPayment = async () => {
      try {
        const response = await fetch(
          `http://192.168.88.137:5000/api/payments`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const result = await response.json();

          const formattedData = result.map(item => ({
            paymentId: item.payment_id,
            customerName: item.cbp_name,
            invoiceAmount: item.invoice_amount,
            paidAmount: item.paid_amount,
            balance: item.balance,
            bankName: item.bank_name,
            chequeNumber: item.cheque_number,
            paymentDate: item.payment_date,
            paymentMode: item.payment_mode,
            receiptNo: item.receipt_no,
            accountManager: item.account_manager,
            rankId: item.rank_id,
            remarks: item.remarks,
          }));
          dispatch({ type: 'LOAD_PAYMENT', payload: formattedData });
        } else {
          const data = await response.json();
        }
      } catch (error) {
        console.error('Fetch Managers Failure', error);
      } finally {
      }
    };
    initialPayment();
  }, [token]);

  const addPayment = async form => {
    try {
      const response = await fetch('http://192.168.88.137:5000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include if your route is protected
        },
        body: JSON.stringify({
          cbp_name: form.cbpName, // Matches cbp_name in MySQL
          invoice_amount: parseFloat(form.invoiceAmount),
          paid_amount: parseFloat(form.paidAmount),
          payment_date: form.paymentDate, // Expected YYYY-MM-DD
          payment_mode: form.paymentMode,
          cheque_number: form.chequeNumber || null,
          bank_name: form.bankName || null,
          receipt_no: form.receiptNo,
          remarks: form.remarks || null,
          account_manager_id: form.accountManager,
        }),
      });
      const result = await response.json();
      //console.log(result);
      if (response.ok) {
        Alert.alert('Success', 'Payment recorded successfully!');
        dispatch({ type: 'ADD_PAYMENT', payload: form });
        return { success: true };
      } else {
        Alert.alert('Error', result.error || 'Failed to save payment');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your connection.');
    }
  };

  return (
    <PaymentContext.Provider value={{ payments, addPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};
