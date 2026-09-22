import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  async getItem(key) {
    try {
      // వెబ్ ప్లాట్‌ఫారమ్ అయితే నేరుగా బ్రౌజర్ localStorage వాడుతుంది
      if (Platform.OS === 'web') {
        // window ని ఇంపోర్ట్ చేయకుండా నేరుగా ఇలా వాడాలి
        const value =
          typeof window !== 'undefined'
            ? window.localStorage.getItem(key)
            : null;
        return value === 'undefined' ? null : value;
      }
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error('Error in getItem:', e);
      return null;
    }
  },

  async setItem(key, value) {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, value);
        }
        return;
      }
      return await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Error in setItem:', e);
    }
  },

  async removeItem(key) {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key);
        }
        return;
      }
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Error in removeItem:', e);
    }
  },
};

export default Storage;
