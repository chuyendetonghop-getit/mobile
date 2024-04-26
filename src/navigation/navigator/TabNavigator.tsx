import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import ChatScreen from '../../screens/BottomTabs/ChatScreen';
import ClonePostScreen from '../../screens/BottomTabs/ClonePostScreen';
import HomeScreen from '../../screens/BottomTabs/HomeScreen';
import MeScreen from '../../screens/BottomTabs/MeScreen';
import RouteName from '../RouteName';
import CustomTab from './CustomTab';

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
      <Tab.Screen name={RouteName.CLONE_POST} component={ClonePostScreen} />
      <Tab.Screen name={RouteName.CHAT} component={ChatScreen} />
      <Tab.Screen name={RouteName.ME} component={MeScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
