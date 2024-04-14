import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react'; // Import the 'React' module to fix eslint
import LoginScreen from '../../screens/Auth/LoginScreen';
import SignupScreen from '../../screens/Auth/SignupScreen';
import RouteName from '../RouteName';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={RouteName.LOGIN} component={LoginScreen} />
      <Stack.Screen name={RouteName.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
};
