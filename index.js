/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Fix for the error: crypto.getrandomvalues() not supported | works as a polyfill for the global crypto.getRandomValues
import 'react-native-get-random-values';

AppRegistry.registerComponent(appName, () => App);
