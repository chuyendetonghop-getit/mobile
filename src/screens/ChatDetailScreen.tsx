import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import messageData from 'assets/data/messages.json';
import Header from 'components/Header';
import {ChatDetailScreenProps} from 'navigation/NavigationProps';
import {Icon, MD2Colors, MD3Colors} from 'react-native-paper';

const ChatDetailScreen = (props: ChatDetailScreenProps) => {
  const {mode, conversationId, receiverId} = props.route.params;
  console.log(
    'MODE - ID - Receiver ID: ',
    mode,
    '|',
    conversationId,
    '|',
    receiverId,
  );
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<any>();

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any[]) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  useEffect(() => {
    setMessages([
      ...messageData.map(message => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? 'You' : 'Bob',
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: 'All your base are belong to us',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot',
        },
      },
    ]);
  }, []);

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
          _id: 1,
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
