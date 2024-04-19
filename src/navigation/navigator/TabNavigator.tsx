import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RouteName from '../RouteName';
import HomeScreen from '../../screens/HomeScreen';
import CustomTab from './CustomTab';

import React from 'react';
import PostScreen from '../../screens/PostScreen';
import ChatScreen from '../../screens/ChatScreen';
import MeScreen from '../../screens/MeScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTab {...props} />}
      initialRouteName={RouteName.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={RouteName.HOME} component={HomeScreen} />
      <Tab.Screen name={RouteName.POST} component={PostScreen} />
      <Tab.Screen name={RouteName.CHAT} component={ChatScreen} />
      <Tab.Screen name={RouteName.ME} component={MeScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
