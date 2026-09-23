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

// 2. ఇంపోర్ట్స్
import 'regenerator-runtime/runtime';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import appConfig from './app.json';
const appName = appConfig.name;

AppRegistry.registerComponent(appName, () => App);

// 3. 🌐 వెబ్ (Vercel) కోసం మాత్రమే ఈ కండిషన్ రన్ అవుతుంది, మొబైల్‌లో రన్ అవ్వదు
if (Platform.OS === 'web') {
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
}
