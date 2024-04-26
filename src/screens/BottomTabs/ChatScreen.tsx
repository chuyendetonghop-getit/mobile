import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Appbar, Text} from 'react-native-paper';
import Container from '../../components/Container';

const ChatScreen = () => {
  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  return (
    <View style={styles.wrapper}>
      <Appbar.Header style={styles.header}>
        {/* <Appbar.BackAction onPress={goBack} /> */}
        <Appbar.Content
          title="Danh sách tin nhắn"
          // titleStyle={styles.titleStyle}
        />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
      <Container style={styles.container} scrollable>
        <Text>Post Screen</Text>
      </Container>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    height: 64,
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  titleStyle: {
    fontSize: 20,
  },
});
