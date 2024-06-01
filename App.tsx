import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {NativeModules} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import Reactotron from 'reactotron-react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {EventProvider} from 'react-native-outside-press';

import AppLoading, {loadingRef} from './src/components/AppLoading';
import {AppNavigator} from './src/navigation/navigator/AppNavigator';
import {persistor, store} from './src/redux/store';
import socketClient from 'services/socket';

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
          <EventProvider>
            <AppNavigator />
          </EventProvider>
          <AppLoading ref={loadingRef} />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}

export default App;
