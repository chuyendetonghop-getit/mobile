import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import RouteName from 'navigation/RouteName';
import TabNavigator from 'navigation/navigator/TabNavigator';
import PostScreen from 'screens/BottomTabs/PostScreen';
import DetailPostScreen from 'screens/DetailPostScreen';
import SearchScreen from 'screens/SearchScreen';
import ListPostScreen from 'screens/ListPostScreen';
import UpdateProfileScreen from 'screens/UpdateProfileScreen';
import PostManagementScreen from 'screens/PostManagementScreen';
import ChatDetailScreen from 'screens/ChatDetailScreen';
import socketClient from 'services/socket';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  // implement socket.io in here to resolve the issue when token is undefined
  useEffect(() => {
    // implement socket.io in here
    socketClient.on('connect', () => {
      console.log('Connected to server');
    });

    return () => {
      socketClient.disconnect();
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={RouteName.MAIN_TAB} component={TabNavigator} />
      <Stack.Screen name={RouteName.SEARCH} component={SearchScreen} />
      <Stack.Screen name={RouteName.POST} component={PostScreen} />
      <Stack.Screen name={RouteName.DETAIL_POST} component={DetailPostScreen} />
      <Stack.Screen name={RouteName.LIST_POST} component={ListPostScreen} />
      <Stack.Screen
        name={RouteName.UPDATE_PROFILE}
        component={UpdateProfileScreen}
      />
      <Stack.Screen
        name={RouteName.MANAGER_POST}
        component={PostManagementScreen}
      />
      <Stack.Screen name={RouteName.CHAT_DETAIL} component={ChatDetailScreen} />
    </Stack.Navigator>
  );
};
