import {NavigationContainer} from '@react-navigation/native';
import React from 'react-native';
import {MainStack} from '../stack/MainStack';
import {AuthStack} from '../stack/AuthStack';
import {useAppSelector} from '../../redux/store';
import {navigation} from '../NavigationUtils';

export const AppNavigator = () => {
  const isSignIn = useAppSelector(state => state.auth.isSignedIn) || true;
  return (
    <NavigationContainer ref={navigation}>
      {isSignIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
