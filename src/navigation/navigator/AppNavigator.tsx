import {NavigationContainer} from '@react-navigation/native';
import React from 'react-native';
import {MainStack} from '../stack/MainStack';
import {AuthStack} from '../stack/AuthStack';
import {useAppSelector} from '../../redux/store';

export const AppNavigator = () => {
  const isSignIn = useAppSelector(state => state.auth.isSignedIn);
  return (
    <NavigationContainer>
      {isSignIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
