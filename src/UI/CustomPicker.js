import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const CustomPicker = ({ selectedValue, onValueChange, pickerList = [] }) => {
  const managerList = Array.isArray(pickerList)
    ? pickerList
    : [pickerList].filter(Boolean);
  //console.log(managers);

  if (Platform.OS === 'web') {
    return (
      <select
        value={selectedValue}
        onChange={e => onValueChange(e.target.value)}
        style={styles.webSelect} // Web input style parameters
      >
        <option value="">Select Option...</option>
        {managerList.map(m => (
          <option
            key={m.id || m._id}
            value={m.cbpName || m.id || m._id || m.userName || m.role_name}
          >
            {m.cbpName || m.userName || m.name || m.role_name}
          </option>
        ))}
      </select>
    );
  }

  // ANDROID & iOS: Wrapper view to enforce identical border style
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.input}
        dropdownIconColor="#34495e" // Android arrow color customization
      >
        <Picker.Item label="Select a Manager..." value="" />
        {managerList.map(m => (
          <Picker.Item
            key={m.id || m._id}
            label={m.cbpName || m.userName || m.name || m.role_name}
            value={m.cbpName || m.id || m._id || m.role_name}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderStyle: 'solid',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden', // Ensures picker contents don't clip the rounded borders
    width: '100%',
    //height: 54, // Matches total padding layout heights of input components
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: Platform.OS === 'web' ? 40 : 50,
  },
  webSelect: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16, // Standardized for web visual balance
    fontSize: 16,
    color: '#34495e',
    backgroundColor: '#fff',
    width: '100%',
    outlineStyle: 'none', // Removes default browser blue outline focus
    height: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
    color: '#34495e',
    flexGrow: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      web: {
        paddingVertical: 8,
        flexGrow: 1,
      },
    }),
  },
});

export default CustomPicker;
