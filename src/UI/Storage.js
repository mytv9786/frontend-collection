import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  getItem: key => AsyncStorage.getItem(key),
  setItem: (key, value) => AsyncStorage.setItem(key, value),
  removeItem: key => AsyncStorage.removeItem(key),
};

export default Storage;
