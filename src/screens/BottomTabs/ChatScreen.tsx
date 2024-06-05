import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Appbar, MD3Colors, Text} from 'react-native-paper';

import {useGetConversationsQuery} from 'api/conversation.api';
import Container from 'components/Container';
import Conversation from 'components/chats/Conversation';
import useIsFirstRender from 'hooks/useIsFirstRender';
import {ChatDetailScreenProps} from 'navigation/NavigationProps';
import socketClient from 'services/socket';
import {ESocketEvents} from 'types/socket.type';

const ChatScreen = (props: ChatDetailScreenProps) => {
  const isFirstRender = useIsFirstRender();
  const navigation = props.navigation;

  const {data, isLoading, error, refetch} = useGetConversationsQuery(
    {
      limit: 999999999,
      page: 1,
    },
    {
      // skip: skip,
      refetchOnMountOrArgChange: true,
    },
  );

  const conversations = data?.data;

  useEffect(() => {
    socketClient.emit(ESocketEvents.CHAT_SUBSCRIBE_CONVERSATION_CHANGE);

    return () => {
      socketClient.emit(ESocketEvents.CHAT_UNSUBSCRIBE_CONVERSATION_CHANGE);
    };
  }, [socketClient]);

  useEffect(() => {
    socketClient.on(ESocketEvents.CHAT_CONVERSATION_CHANGE, () => {
      refetch();
    });
  }, [socketClient]);

  useEffect(() => {
    // force refetch when the screen is focused from goBack() navigation

    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Focused!', isFirstRender);
      if (!isFirstRender) {
        console.log('Refetching...');
        refetch();
      }
    });

    return unsubscribe;
  }, [navigation, refetch, isFirstRender]);

  return (
    <View style={styles.wrapper}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Trang tin nhắn" titleStyle={styles.titleStyle} />
      </Appbar.Header>
      <Container style={styles.container}>
        {isLoading && isFirstRender ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={conversations?.docs || []}
            keyExtractor={(item, index) => index.toString()}
            style={styles.listStyle}
            contentContainerStyle={styles.listContainerStyle}
            renderItem={({item, index}) => (
              <Conversation key={item?._id} {...item} />
            )}
            ListEmptyComponent={
              <Text style={styles.textEmpty}>Không có tin nhắn</Text>
            }
          />
        )}
      </Container>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: 'red',
  },
  header: {
    height: 48,
    // backgroundColor: 'red',
    paddingHorizontal: 0,
  },
  titleStyle: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    // backgroundColor: 'green',
    paddingTop: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  searchbar: {
    // width: '70%',
    height: 36,
    borderColor: 'lightblue',
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 6,
  },
  inputSearchbar: {
    minHeight: 0,
    // backgroundColor: MD3Colors.neutralVariant10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    padding: 0,
  },
  listStyle: {
    // marginTop: 0,
    // paddingTop: 0,
    // backgroundColor: 'pink',
    paddingBottom: 23,
  },
  listContainerStyle: {
    marginTop: 10,
    paddingBottom: 16,
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 16,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    // paddingVertical: 8,
    paddingBottom: 8,

    borderBottomWidth: 0.2,
    // borderTopWidth: 0.2,
    borderBottomColor: MD3Colors.neutralVariant10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeftImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  userWithTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTime: {
    color: MD3Colors.neutralVariant80,
  },
  textPostTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    color: MD3Colors.neutralVariant60,
  },
  textMessage: {
    fontSize: 12,
    color: MD3Colors.neutralVariant70,
  },
  imageRight: {
    width: 48,
    height: 48,
    borderRadius: 8,
    // marginRight: 16,
  },
  textEmpty: {
    textAlign: 'center',
  },
});
