// 1. 🟢 అందరికంటే ముందే, ఫస్ట్ లైన్ లోనే ఈ సేఫ్టీ గార్డ్ ఉండాలి (ఇంపోర్ట్స్ కంటే ముందే!)
if (typeof Object.keys === 'function') {
  const originalKeys = Object.keys;
  Object.keys = function (obj) {
    if (obj === null || obj === undefined) {
      return [];
    }
    return originalKeys(obj);
  };
}

// 2. దీని తర్వాతే మీ మిగిలిన పాత ఇంపోర్ట్స్ అన్నీ రావాలి
import 'regenerator-runtime/runtime';
import { AppRegistry } from 'react-native';
import App from './App';
import appConfig from './app.json';
const appName = appConfig.name;

AppRegistry.registerComponent(appName, () => App);

const rootElement =
  document.querySelector('#app-root') || document.getElementById('app-root');

if (rootElement) {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: rootElement,
  });
} else {
  console.error('Error: #app-root element not found in HTML!');
}
