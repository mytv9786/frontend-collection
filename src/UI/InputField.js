import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import React from 'react';

const InputField = ({
  label,
  placeholder,
  showArrow = false,
  keyboardType = 'default',
  value,
  onChangeText,
  multiline,
  cardWidth,
}) => {
  return (
    <View style={[styles.fieldContainer, { width: cardWidth }]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#7f8c8d"
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
      {showArrow && <Text style={styles.arrow}>{'>'}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
    paddingHorizontal: 6,
    width: '100%',
    flexGrow: 1,
  },
  fieldWebWidth: {
    maxWidth: 360, // Hard boundaries overflow protection bounds
    flexBasis: '48%', // Tablet layout side-by-side split row grids ratio
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
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
  arrow: {
    position: 'absolute',
    right: 15,
    top: 35,
    fontSize: 18,
    color: '#7f8c8d',
  },
});
