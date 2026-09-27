import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLOR } from '../Constants';
import { Picker } from '@react-native-picker/picker';

const Pagination = ({
  listItems,
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const historyList = listItems || [];
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, historyList.length);
  console.log(page);
  return (
    <View style={styles.paginationContainer}>
      <View style={styles.paginationItem}>
        <Text>Show </Text>
        <Picker
          style={styles.pickerStyle}
          selectedValue={itemsPerPage}
          onValueChange={value => setItemsPerPage(value)}
          dropdownIconColor="#34495e" // Android arrow native color mapping
        >
          <Picker.Item label="5" value="5" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="20" value="20" />
          <Picker.Item label="50" value="50" />
          <Picker.Item label="100" value="100" />
        </Picker>
      </View>
      <View style={styles.paginationItem}>
        <Text style={styles.paginationLabel}>
          {from + 1}-{Math.min(to, historyList.length)} of {historyList.length}
        </Text>

        <View style={styles.paginationActions}>
          {/* వెనక్కి వెళ్లే బటన్ */}
          <TouchableOpacity
            style={[styles.pageButton, page === 0 && styles.disabledButton]}
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
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    //backgroundColor: COLOR.sidebarBackground,
    gap: 20,
    borderRadius: 12,
  },
  paginationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  paginationLabel: {
    fontSize: 16,
    color: '#555',
    letterSpacing: 1.7,
  },
  paginationActions: {
    flexDirection: 'row',
    gap: 20,
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
