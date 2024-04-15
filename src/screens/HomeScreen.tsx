import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
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

      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
