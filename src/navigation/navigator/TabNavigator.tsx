import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import RouteName from '../RouteName';
import CustomTab from './CustomTab';
import HomeScreen from '../../screens/BottomTabs/HomeScreen';
import PostScreen from '../../screens/BottomTabs/PostScreen';
import ChatScreen from '../../screens/BottomTabs/ChatScreen';
import MeScreen from '../../screens/BottomTabs/MeScreen';

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
