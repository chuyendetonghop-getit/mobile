import React from 'react';
import {NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppNavigator} from './src/navigation/navigator/AppNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {PaperProvider} from 'react-native-paper';

if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];

  Reactotron.setAsyncStorageHandler?.(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({host: scriptHostname}) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}

export default App;
