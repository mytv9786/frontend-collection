// import 'regenerator-runtime/runtime';
// import { AppRegistry } from 'react-native';
// //import { name as appName } from './app.json';
// import App from './App';
// import appConfig from './app.json';
// const appName = appConfig.name;

// /*
// if (module.hot) {
//   module.hot.accept();
// }
// */

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.runApplication(appName, {
//   initialProps: {},
//   rootTag:
//     document.querySelector('#app-root') || document.getElementById('app-root'),
// });

import 'regenerator-runtime/runtime';

// 1. 🟢 ప్రొడక్షన్ మోడ్‌లో వచ్చే Object.keys() క్రాష్‌ను ఆపడానికి గ్లోబల్ సేఫ్టీ గార్డ్
if (typeof Object.keys === 'function') {
  const originalKeys = Object.keys;
  Object.keys = function (obj) {
    if (obj === null || obj === undefined) {
      return []; // క్రాష్ అవ్వకుండా ఖాళీ అర్రేను పంపుతుంది
    }
    return originalKeys(obj);
  };
}

import { AppRegistry } from 'react-native';
import App from './App';
import appConfig from './app.json';
const appName = appConfig.name;

AppRegistry.registerComponent(appName, () => App);

// 2. 🟢 ఎలిమెంట్ ఉందో లేదో సేఫ్‌గా చెక్ చేసి అప్లికేషన్‌ను రన్ చేస్తాము
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
