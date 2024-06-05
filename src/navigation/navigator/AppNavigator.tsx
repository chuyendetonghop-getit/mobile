import {NavigationContainer} from '@react-navigation/native';
import React from 'react-native';
import {MainStack} from '../stack/MainStack';
import {AuthStack} from '../stack/AuthStack';
import {useAppSelector} from '../../redux/store';
import {navigation} from '../NavigationUtils';

export const AppNavigator = () => {
  const isSignIn = useAppSelector(state => state.auth.isSignedIn);
  const user = useAppSelector(state => state.auth.user);
  return (
    <NavigationContainer ref={navigation}>
      {isSignIn && user?.verify ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
