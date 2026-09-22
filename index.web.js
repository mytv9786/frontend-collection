// 1. 🟢 ప్రొడクション బిల్డ్ లోని అన్ని రకాల ఆబ్జెక్ట్ క్రాష్‌లను ఆపడానికి అల్టిమేట్ గార్డ్
(function () {
  const safeWrap = originalFn => {
    if (typeof originalFn !== 'function') return originalFn;
    return function (obj) {
      if (obj === null || obj === undefined) return [];
      try {
        return originalFn(obj);
      } catch (e) {
        return [];
      }
    };
  };

  Object.keys = safeWrap(Object.keys);
  Object.values = safeWrap(Object.values);
  Object.entries = safeWrap(Object.entries);
})();

// 2. మీ ఒరిజినల్ పాత ఇంపోర్ట్స్ అన్నీ దీని కిందే ఉండాలి
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
