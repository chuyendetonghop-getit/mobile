import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import RouteName from 'navigation/RouteName';
import TabNavigator from 'navigation/navigator/TabNavigator';
import PostScreen from 'screens/BottomTabs/PostScreen';
import DetailPostScreen from 'screens/DetailPostScreen';
import SearchScreen from 'screens/SearchScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={RouteName.MAIN_TAB} component={TabNavigator} />
      <Stack.Screen name={RouteName.SEARCH} component={SearchScreen} />
      <Stack.Screen name={RouteName.POST} component={PostScreen} />
      <Stack.Screen name={RouteName.DETAIL_POST} component={DetailPostScreen} />
    </Stack.Navigator>
  );
};
