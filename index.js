/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

//AppRegistry.registerComponent(appName, () => App);

// ఈ రెండు లైన్లను యాడ్ చేయండి. ఏ పేరుతో అడిగినా యాప్ ఓపెన్ అవుతుంది.
AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent('rncproject', () => App);
