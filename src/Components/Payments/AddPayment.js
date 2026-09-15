import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ManagerContext } from '../../Context/ManagerContext';
import { CustomerContext } from '../../Context/CustomerContext';
import { PaymentContext } from '../../Context/PaymentContext';

import InputField from '../../UI/InputField';
import CustomPicker from '../../UI/CustomPicker';

import { useInputCardWidth, getTodayFormatted } from '../../Constants';

const AddPayment = ({ navigation, visible, mainScreenWidth }) => {
  const { managers } = useContext(ManagerContext);
  const { customers } = useContext(CustomerContext);

  const { addPayment } = useContext(PaymentContext);
  const [form, setForm] = useState({
    cbpName: '',
    invoiceAmount: '',
    paidAmount: '',
    paymentDate: getTodayFormatted(), // Uses 10-10-1999 format
    paymentMode: 'Cheque',
    chequeNumber: '',
    bankName: '',
    receiptNo: '',
    remarks: '',
    accountManager: managers[0]?.id || managers?.id,
    manager: '',
  });
  const cardWidth = useInputCardWidth({ visible });

  // Sync accountManager once managers list is loaded
  useEffect(() => {
    if (managers.length > 0) {
      setForm(prev => ({ ...prev, accountManager: managers[0].id }));
    }
  }, [managers]);

  // Save Payments handler
  const handleSubmit = async () => {
    //console.log('Submitting Payment:', form);
    // Add logic here to save to a PaymentContext if needed
    if (!form.invoiceAmount || !form.paidAmount || !form.paymentMode) {
      if (Platform.OS === 'web') {
      } else {
        // ఆండ్రాయిడ్ & ఐఓఎస్ కోసం
        Alert.alert('సక్సెస్', 'ఇది మొబైల్ అలర్ట్ సందేశం!');
      }
      return;
    }
    try {
      // 2. Attempt to add payment
      // If your context function is async, use 'await'
      Alert.alert('Success', 'Payment added successfully!');
      const success = await addPayment(form);

      // 3. Only go back if success is true
      console.log(success);
      if (success) {
        Alert.alert('Success', 'Payment added successfully!');
        navigation?.goBack();
      } else {
        // If the API/Context returns false, stay on the page
        Alert.alert('Error', 'Failed to save payment. Please try again.');
      }
    } catch (error) {
      // 4. Handle unexpected crashes
      Alert.alert(
        'Error',
        'Something went wrong. Please check your connection.',
      );
      console.error(error);
    }
  };

  // Helper to update specific fields
  const updateField = (field, text) => setForm({ ...form, [field]: text });

  const handleInputChange = (field, val) => {
    setForm({ ...form, [field]: val });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.headerText}>Add New Payment</Text>
        <View style={[styles.scrollContent]}>
          <View style={[styles.fieldContainer, { width: cardWidth }]}>
            <Text style={styles.label}>Select Customer</Text>
            <CustomPicker
              selectedValue={form.cbpName}
              onValueChange={itemValue =>
                handleInputChange('cbpName', itemValue)
              }
              cardWidth={cardWidth}
              pickerList={customers}
            />
          </View>
          <InputField
            label="Top-Up Amount"
            value={form.topUpAmount}
            editable={true}
            keyboardType="numeric"
            onChangeText={val => updateField('invoiceAmount', val)}
            placeholder="1000"
            cardWidth={cardWidth}
          />
          <InputField
            label="Paid Amount"
            value={form.paidAmount}
            color="#e74c3c"
            editable={true}
            keyboardType="numeric"
            onChangeText={val => updateField('paidAmount', val)}
            placeholder="1000"
            cardWidth={cardWidth}
          />
          <InputField
            label="Payment Date"
            value={form.paymentDate}
            editable={true}
            onChangeText={val => updateField('paymentDate', val)}
            cardWidth={cardWidth}
          />
          <View style={[styles.fieldContainer, { width: cardWidth }]}>
            <Text style={styles.label}>Payment Mode</Text>

            {/* WEB AND ANDROID COMPATIBLE CONTAINER SWITCH */}
            {Platform.OS === 'web' ? (
              <select
                value={form.paymentMode}
                onChange={e => updateField('paymentMode', e.target.value)}
                style={styles.webSelect}
              >
                <option value="Cheque">Cheque</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </select>
            ) : (
              /* ANDROID & iOS NATIVE DROPDOWN BORDER COMPATIBILITY */
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={form.paymentMode}
                  onValueChange={val => updateField('paymentMode', val)}
                  dropdownIconColor="#34495e" // Android arrow native color mapping
                >
                  <Picker.Item label="Cheque" value="Cheque" />
                  <Picker.Item label="Cash" value="Cash" />
                  <Picker.Item label="Online" value="Online" />
                </Picker>
              </View>
            )}
          </View>
          <InputField
            label="Cheque Number"
            value={form.chequeNumber}
            editable={true}
            onChangeText={val => updateField('chequeNumber', val)}
            keyboardType="numeric"
            placeholder="123456"
            cardWidth={cardWidth}
          />
          <InputField
            label="Bank Name"
            value={form.bankName}
            editable={true}
            onChangeText={val => updateField('bankName', val)}
            placeholder="ABCD"
            cardWidth={cardWidth}
          />
          <InputField
            label="Receipt No"
            value={form.receiptNo}
            editable={true}
            onChangeText={val => updateField('receiptNo', val)}
            placeholder="1010"
            cardWidth={cardWidth}
          />
          <InputField
            label="Remarks"
            value={form.remarks}
            editable={true}
            placeholder="Enter payment notes..."
            multiline={true} // Enables multiple lines
            numberOfLines={4} // Suggests height for Android
            placeholderTextColor="#cac8c8"
            onChangeText={val => updateField('remarks', val)}
            cardWidth={cardWidth}
          />
          <View style={[styles.fieldContainer, { width: cardWidth }]}>
            <Text style={styles.label}>Account Manager</Text>
            <CustomPicker
              selectedValue={form.accountManager}
              onValueChange={itemValue =>
                updateField('accountManager', itemValue)
              }
              cardWidth={cardWidth}
              pickerList={managers}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Manager</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },

  pickerContainers: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },

  webSelect: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12, // Standardized for web visual balance
    fontSize: 16,
    color: '#34495e',
    backgroundColor: '#fff',
    width: '100%',
    outlineStyle: 'none', // Removes default browser blue outline focus
    height: 46,
  },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e6e8e9',
  },
  scrollContainer: {
    //flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    backgroundColor: '#ffffff',
    padding: 10,
    //maxWidth: Platform.OS === 'web' ? 600 : '100%',
    //alignSelf: Platform.OS === 'web' ? 'center' : 'auto',
  },
  scrollContent: {
    width: '100%',
    ...Platform.select({
      web: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        flexWrap: 'wrap',
      },
    }),
  },

  fieldWebWidth: {
    maxWidth: 360, // Hard boundaries overflow protection bounds
    flexBasis: '48%', // Tablet layout side-by-side split row grids ratio
  },
  fieldContainer: {
    marginBottom: 15,
    paddingHorizontal: 6,
    width: '100%',
    flexGrow: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderStyle: 'solid',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden', // Ensures picker contents don't clip the rounded borders
    width: '100%',
    height: 54, // Matches total padding layout heights of input components
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: '100%',
    color: '#34495e',
    backgroundColor: 'transparent', // Inherits wrapper color
  },

  saveButton: {
    backgroundColor: '#949aee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
    width: 160,
    cursor: Platform.OS === 'web' ? 'pointer' : 'auto',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AddPayment;
