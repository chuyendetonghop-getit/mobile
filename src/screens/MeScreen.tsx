import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Container from '../components/Container';
import {useAppDispatch} from '../redux/store';

const MeScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Text
        style={styles.text}
        onPress={() => {
          dispatch({type: 'auth/signOut'});
        }}>
        This is the Me Screen
      </Text>

      {/* <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button> */}
    </Container>
  );
};

export default MeScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  text: {
    textAlign: 'center',
  },
});
