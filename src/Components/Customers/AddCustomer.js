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
import { ManagerContext } from '../../Context/ManagerContext';
import { CustomerContext } from '../../Context/CustomerContext';
import { useInputCardWidth } from '../../Constants';
import InputField from '../../UI/InputField';
import CustomPicker from '../../UI/CustomPicker';

const AddCustomer = ({ navigation, visible, mainScreenWidth }) => {
  const { managers } = useContext(ManagerContext);
  const { addCustomer } = useContext(CustomerContext);
  const [loading, setLoading] = useState(false);

  const cardWidth = useInputCardWidth({ visible });

  const [form, setForm] = useState({
    cbpNo: '',
    cbpName: '',
    contactName: '',
    contactNumber: '',
    email: '',
    address: '',
    accountManager: '',
  });

  // Sync accountManager once managers list is loaded
  useEffect(() => {
    if (managers.length > 0) {
      setForm(prev => ({ ...prev, accountManager: managers[0].id }));
    }
  }, [managers]);

  //console.log(form.accountManager);
  const handleSave = async () => {
    //console.log('Customer Data:', form);
    // Add logic to save customer to context or API
    // Basic Validation
    if (!form.cbpNo || !form.cbpName || !form.contactNumber) {
      Alert.alert(
        'Error',
        'Please fill in all required fields (CBP No, Name, Mobile)',
      );
      return;
    }
    setLoading(true);
    try {
      // 1. Send to Backend API
      const response = await fetch('http://192.168.88.137:5000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cbp_no: form.cbpNo,
          cbp_name: form.cbpName,
          contact_name: form.contactName,
          contact_number: form.contactNumber,
          email: form.email,
          address: form.address,
          account_manager_id: form.accountManager,
        }),
      });
      console.log(response);
      if (response.ok) {
        // 2. Update Global Context State
        addCustomer(form);
        Alert.alert('Success', 'Customer added successfully!');
        navigation.navigate('CustomersList');
        //navigation.goBack();
      } else {
        throw new Error('Failed to save to server');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error: ', 'Could not sync with server.');
      // Still add to local context so user sees it immediately
      //addCustomer(form);
      //navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  // Helper to update specific fields
  const updateField = (field, text) => setForm({ ...form, [field]: text });
  //console.log(form);

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
        <Text style={styles.headerText}>Add New Customer</Text>
        <View style={[styles.scrollContent]}>
          <InputField
            label="CBP No"
            value={form.cbpNo}
            onChangeText={text => updateField('cbpNo', text)}
            placeholder="CBP No"
            cardWidth={cardWidth}
          />
          <InputField
            label="CBP Name"
            value={form.cbpName}
            onChangeText={text => updateField('cbpName', text)}
            placeholder="Cbp Name"
            cardWidth={cardWidth}
          />
          <InputField
            label="Contact Name"
            value={form.contactName}
            onChangeText={text => updateField('contactName', text)}
            placeholder="Contact Name"
            cardWidth={cardWidth}
          />
          <InputField
            label="Contact Number"
            value={form.contactNumber}
            keyboardType="number"
            onChangeText={text => updateField('contactNumber', text)}
            placeholder="Contact Number"
            cardWidth={cardWidth}
          />
          <InputField
            label="Email"
            placeholder="Enter Email Address"
            keyboardType={Platform.OS === 'web' ? 'text' : 'email-address'}
            value={form.email}
            onChangeText={val => handleInputChange('email', val)}
            cardWidth={cardWidth}
          />
          <InputField
            label="Full Address"
            placeholder="Full Address"
            placeholderTextColor="#7f8c8d"
            style={styles.input}
            value={form.address}
            onChangeText={text => setForm({ ...form, address: text })}
            multiline={true}
            cardWidth={cardWidth}
          />
          <View style={[styles.fieldContainer, { width: cardWidth }]}>
            <Text style={styles.label}>Account Manager</Text>
            <CustomPicker
              selectedValue={form.accountManager}
              onValueChange={itemValue =>
                handleInputChange('accountManager', itemValue)
              }
              cardWidth={cardWidth}
              pickerList={managers}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
  fieldContainer: {
    marginBottom: 15,
    paddingHorizontal: 6,
    width: '100%',
    flexGrow: 1,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
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

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    backgroundColor: '#c5c1c1',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: Platform.OS === 'web' ? 40 : 50,
  },
  webSelect: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    border: 'none',
    outline: 'none',
    backgroundColor: '#fff',
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

export default AddCustomer;
