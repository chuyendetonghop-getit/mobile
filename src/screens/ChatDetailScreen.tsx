import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import messageData from 'assets/data/messages.json';
import Header from 'components/Header';
import {ChatDetailScreenProps} from 'navigation/NavigationProps';
import {Icon, MD2Colors, MD3Colors} from 'react-native-paper';
import socketClient from 'services/socket';
import {ESocketEvents} from 'types/socket.type';
import {TMessage} from 'types/message.type';
import {useAppSelector} from 'redux/store';

const ChatDetailScreen = (props: ChatDetailScreenProps) => {
  const {mode, conversationId, receiverId, postId} = props.route.params;

  console.log(
    'MODE - ID - Receiver ID: ',
    mode,
    '|',
    conversationId,
    '|',
    receiverId,
    '|',
    postId,
  );

  const user = useAppSelector(state => state.auth.user);

  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = useCallback((messages: IMessage[] = []) => {
    const thisMessage = messages[0];
    console.log('onSend:', thisMessage);

    setMessages((previousMessages: IMessage[]) =>
      GiftedChat.append(previousMessages, messages),
    );

    // emit message to server
    socketClient.emit(ESocketEvents.CHAT_SEND_MESSAGE, {
      originId: thisMessage._id,
      text: thisMessage.text,
      // TODO: no media for now
      // media: thisMessage.media
    });
  }, []);

  // useEffect(() => {
  //   setMessages([
  //     ...messageData.map(message => {
  //       return {
  //         _id: message.id,
  //         text: message.msg,
  //         createdAt: new Date(message.date),
  //         user: {
  //           _id: message.from,
  //           name: message.from ? 'You' : 'Bob',
  //         },
  //       };
  //     }),
  //     {
  //       _id: 0,
  //       system: true,
  //       text: 'All your base are belong to us',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 0,
  //         name: 'Bot',
  //       },
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    // this is temporary message

    setMessages([
      {
        _id: '1',
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
        },
      },
    ]);
  }, []);

  useEffect(() => {
    socketClient.emit(ESocketEvents.CHAT_JOIN_CONVERSATION, {
      postId,
      receiverId,
    });

    return () => {
      socketClient.emit(ESocketEvents.CHAT_LEAVE_CONVERSATION);
    };
  }, []);

  useEffect(() => {
    socketClient.on(
      ESocketEvents.CHAT_RECEIVE_MESSAGE,
      ({
        _id,
        originId,
        conversationId,
        senderId,
        text,
        media,
        createdAt,
        updatedAt,
      }: TMessage) => {
        console.log('CHAT_RECEIVE_MESSAGE:', text, originId);

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, {
            _id: originId,
            text: text,
            createdAt: createdAt,
            user: {
              _id: senderId,
            },
          }),
        );
      },
    );
  }, [socketClient]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Header
        style={styles.header}
        hasBackButton={true}
        headerTitle="Nguyen Van A"
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        onInputTextChanged={setText}
        user={{
          _id: user?._id || 123,
        }}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={70}
        renderSystemMessage={() => null}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: '#000',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: MD2Colors.grey200,
                },
                right: {
                  backgroundColor: MD3Colors.primary70,
                },
              }}
            />
          );
        }}
        // ------
        renderSend={props => (
          <View
            style={{
              height: 44,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              paddingHorizontal: 14,
            }}>
            {text === '' && (
              <>
                <Icon source="camera" color={MD3Colors.primary50} size={20} />
              </>
            )}
            {text !== '' && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: 'center',
                }}>
                <Icon source="send" color={MD3Colors.primary50} size={20} />
              </Send>
            )}
          </View>
        )}
        // ---------
      />
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 0,
  },
});
