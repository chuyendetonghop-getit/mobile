import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RouteName from '../RouteName';
import HomeScreen from '../../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={RouteName.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};
