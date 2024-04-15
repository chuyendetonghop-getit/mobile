import React from 'react';
import {Text} from 'react-native';
import Container from '../components/Container';
import {useAppDispatch} from '../redux/store';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Text
        onPress={() => {
          dispatch({type: 'auth/signOut'});
        }}>
        This is the Home Screen
      </Text>
    </Container>
  );
};

export default HomeScreen;
