// index.js లోపల కూడా ఈ అల్టిమేట్ గార్డ్ పెట్టండి
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

import { AppRegistry } from 'react-native';
import App from './App';
import appConfig from './app.json';
const appName = appConfig.name;

AppRegistry.registerComponent(appName, () => App);
