import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  window,
} from 'react-native';
import { ManagerContext } from '../../Context/ManagerContext';
import { useInputCardWidth } from '../../Constants';

import InputField from '../../UI/InputField';
import CustomPicker from '../../UI/CustomPicker';

const AddManager = ({ navigation, visible }) => {
  const { addManager } = useContext(ManagerContext);
  const [roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    employeeId: '',
    username: '',
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    roleId: '',
  });

  let cardWidth = useInputCardWidth({ visible });

  const handleInputChange = (field, val) => {
    setForm({ ...form, [field]: val });
  };

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSave = () => {
    if (
      !form.employeeId ||
      !form.username ||
      !form.firstName ||
      !form.password ||
      !form.roleId
    ) {
      showAlert(
        'Error',
        'Please fill in all required fields including User Role',
      );
      return;
    }

    addManager(form);
    if (navigation && navigation.goBack) {
      //navigation.goBack();
      navigation.navigate('ManagersList');
    }
  };

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response = await fetch(
          'http://192.168.88.137:5000/api/users/roles',
          {
            method: 'GET',
          },
        );
        if (response.ok) {
          const rolesData = await response.json();
          setRoles(rolesData);
          if (rolesData.length > 0) {
            // UPDATED: Use functional state update to preserve other fields
            setForm(prev => ({ ...prev, roleId: rolesData[0].id }));
          }
        }
      } catch (error) {}
    };
    fetchRoleData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.headerText}>Add New Manager</Text>
        <View style={styles.scrollContent}>
          <InputField
            label="Employee ID *"
            placeholder="Enter Employee ID"
            value={form.employeeId}
            onChangeText={val => handleInputChange('employeeId', val)}
            cardWidth={cardWidth}
          />
          <InputField
            label="Username *"
            placeholder="Enter Username"
            value={form.username}
            onChangeText={val => handleInputChange('username', val)}
            cardWidth={cardWidth}
          />
          <InputField
            label="First Name *"
            placeholder="Enter First Name"
            value={form.firstName}
            onChangeText={val => handleInputChange('firstName', val)}
            cardWidth={cardWidth}
          />
          <InputField
            label="Last Name"
            placeholder="Enter Last Name"
            value={form.lastName}
            onChangeText={val => handleInputChange('lastName', val)}
            cardWidth={cardWidth}
          />
          <InputField
            label="Mobile"
            placeholder="Enter Mobile Number"
            keyboardType={Platform.OS === 'web' ? 'text' : 'phone-pad'}
            value={form.mobile}
            onChangeText={val => handleInputChange('mobile', val)}
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
            label="Password *"
            placeholder="Enter Password"
            value={form.password}
            onChangeText={val => handleInputChange('password', val)}
            cardWidth={cardWidth}
          />
          <View style={[styles.fieldContainer, { width: cardWidth }]}>
            <Text style={styles.label}>User Role *</Text>
            <CustomPicker
              selectedValue={form.roleId}
              onValueChange={itemValue =>
                handleInputChange('roleId', itemValue)
              }
              pickerList={roles}
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
  container: {
    flex: 1,
    backgroundColor: '#e6e8e9',
    padding: 8,
  },
  scrollContainer: {
    //flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    backgroundColor: '#ffffff',
    padding: 10,
    //maxWidth: Platform.OS === 'web' ? 600 : '100%',
    //alignSelf: Platform.OS === 'web' ? 'center' : 'auto',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
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
  fieldContainer: {
    marginBottom: 15,
    paddingHorizontal: 6,
    width: '100%',
    flexGrow: 1,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    backgroundColor: '#c5c1c1',
    overflow: 'hidden',
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

export default AddManager;
