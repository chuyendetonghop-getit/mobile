import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react'; // Import the 'React' module to fix eslint

import RouteName from 'navigation/RouteName';
import LoginScreen from 'screens/Auth/LoginScreen';
import ResetPassScreen from 'screens/Auth/ResetPassScreen';
import SignupScreen from 'screens/Auth/SignupScreen';
import UpdatePasswordScreen from 'screens/Auth/UpdatePasswordScreen';
import VerifyOTPScreen from 'screens/Auth/VerifyOTPScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={RouteName.LOGIN} component={LoginScreen} />
      <Stack.Screen name={RouteName.SIGNUP} component={SignupScreen} />
      <Stack.Screen
        name={RouteName.RESET_PASSWORD}
        component={ResetPassScreen}
      />
      <Stack.Screen name={RouteName.VERIFY_OTP} component={VerifyOTPScreen} />
      <Stack.Screen
        name={RouteName.UPDATE_PASSWORD}
        component={UpdatePasswordScreen}
      />
    </Stack.Navigator>
  );
};
