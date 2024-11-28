//index.js
/**
 * @format
 */

import 'react-native-gesture-handler'; 
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Registering the main application component
AppRegistry.registerComponent(appName, () => App);