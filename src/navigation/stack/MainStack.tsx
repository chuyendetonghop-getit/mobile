import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RouteName from '../RouteName';
import TabNavigator from '../navigator/TabNavigator';
import SearchScreen from '../../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={RouteName.MAIN_TAB} component={TabNavigator} />
      <Stack.Screen name={RouteName.SEARCH} component={SearchScreen} />
    </Stack.Navigator>
  );
};
