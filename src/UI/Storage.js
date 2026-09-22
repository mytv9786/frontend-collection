import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  async getItem(key) {
    try {
      // వెబ్ ప్లాట్‌ఫారమ్ అయితే నేరుగా బ్రౌజర్ localStorage వాడుతుంది
      if (Platform.OS === 'web') {
        const value = window.localStorage.getItem(key);
        return value === 'undefined' ? null : value;
      }
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async setItem(key, value) {
    try {
      if (Platform.OS === 'web') {
        window.localStorage.setItem(key, value);
        return;
      }
      return await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  },

  async removeItem(key) {
    try {
      if (Platform.OS === 'web') {
        window.localStorage.removeItem(key);
        return;
      }
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  },
};

export default Storage;
