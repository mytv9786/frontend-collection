import 'regenerator-runtime/runtime';
import { AppRegistry } from 'react-native';
//import { name as appName } from './app.json';
import App from './App';
import appConfig from './app.json';
const appName = appConfig.name;

/* 
if (module.hot) {
  module.hot.accept();
}
*/

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag:
    document.querySelector('#app-root') || document.getElementById('app-root'),
});
