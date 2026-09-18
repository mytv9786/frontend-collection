import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  async getItem(key) {
    if (Platform.OS === 'web') {
      return AsyncStorage.getItem(key);
    }
    return AsyncStorage.getItem(key);
  },
  async setItem(key, value) {
    if (Platform.OS === 'web') {
      AsyncStorage.setItem(key, value);
      return;
    }
    return AsyncStorage.setItem(key, value);
  },
  async removeItem(key) {
    if (Platform.OS === 'web') {
      AsyncStorage.removeItem(key);
      return;
    }
    return AsyncStorage.removeItem(key);
  },
};

export default Storage;
