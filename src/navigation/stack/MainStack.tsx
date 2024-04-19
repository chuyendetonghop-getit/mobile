import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RouteName from '../RouteName';
import TabNavigator from '../navigator/TabNavigator';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={RouteName.MAIN_TAB} component={TabNavigator} />
      {/* <Stack.Screen name={RouteName.HOME} component={HomeScreen} /> */}
    </Stack.Navigator>
  );
};
