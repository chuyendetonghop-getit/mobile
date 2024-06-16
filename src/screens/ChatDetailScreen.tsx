import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Bubble, GiftedChat, IMessage, Send} from 'react-native-gifted-chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {v4 as uuidv4} from 'uuid';

import {useGetMessagesByConversationIdQuery} from 'api/message.api';
import Header from 'components/Header';
import SelectMediaModal from 'components/modals/SelectMediaModal';
import {ChatDetailScreenProps} from 'navigation/NavigationProps';
import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';
import {formatWithMask} from 'react-native-mask-input';
import {
  ActivityIndicator,
  Icon,
  MD2Colors,
  MD3Colors,
  Text,
} from 'react-native-paper';
import {useAppSelector} from 'redux/store';
import socketClient from 'services/socket';
import {TMessage} from 'types/message.type';
import {ESocketEvents} from 'types/socket.type';
import {DEFAULT_FALLBACK_IMAGE} from 'utils/constant';
import {VNDMask} from './BottomTabs/PostScreen';

const ChatDetailScreen = (props: ChatDetailScreenProps) => {
  const {receiverId, postId, postTitle, postImage, postPrice, postAuthorName} =
    props.route.params;
  const user = useAppSelector(state => state.auth.user);
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  });
  const [visibleModal, setVisibleModal] = useState(false);

  const {
    data: messageData,
    isLoading: isMessageLoading,
    error: messageError,
    refetch: refetchMessages,
  } = useGetMessagesByConversationIdQuery(
    {
      receiverId: receiverId || '',
      postId: postId || '',
      page: pagination.page,
      limit: pagination.limit,
    },
    {refetchOnMountOrArgChange: true},
  );

  const listMessages = messageData?.data;

  const {masked, unmasked, obfuscated} = formatWithMask({
    // text: detailConversation?.post?.price.toString(),
    text: postPrice.toString(),
    mask: VNDMask,
  });

  const onSend = useCallback((messages: IMessage[] = []) => {
    const thisMessage = messages[0];
    console.log('onSend:', thisMessage);

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    socketClient.emit(ESocketEvents.CHAT_SEND_MESSAGE, {
      originId: thisMessage._id,
      text: thisMessage.text,
    });
  }, []);

  const onSendMedia = useCallback((mediaURLs: string[]) => {
    console.log('onSendMedia:', mediaURLs);

    const messagesMedia = mediaURLs.map(mediaURL => {
      const uuid = uuidv4();

      socketClient.emit(ESocketEvents.CHAT_SEND_MESSAGE, {
        originId: uuid,
        image: mediaURL,
      });

      return {
        _id: uuid,
        createdAt: new Date(),
        user: {_id: user?._id || 123},
        image: mediaURL,
      } as IMessage;
    });

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messagesMedia),
    );
  }, []);

  useEffect(() => {
    if (listMessages) {
      const messages = listMessages?.docs?.map(message => {
        return {
          _id: message._id || uuidv4(),
          text: message.text ?? '',
          image: message.image,
          createdAt: message.createdAt,
          user: {_id: message.senderId},
        } as IMessage;
      });

      setMessages(previousMessages => {
        const messageIds = new Set(previousMessages.map(m => m._id));
        const uniqueMessages = messages.filter(m => !messageIds.has(m._id));
        return GiftedChat.prepend(previousMessages, uniqueMessages);
      });
    }
  }, [listMessages]);

  useEffect(() => {
    socketClient.emit(ESocketEvents.CHAT_JOIN_CONVERSATION, {
      postId,
      receiverId,
    });

    return () => {
      socketClient.emit(ESocketEvents.CHAT_LEAVE_CONVERSATION);
    };
  }, [postId, receiverId]);

  useEffect(() => {
    socketClient.on(
      ESocketEvents.CHAT_RECEIVE_MESSAGE,
      ({
        _id,
        originId,
        conversationId,
        senderId,
        text,
        image,
        createdAt,
        updatedAt,
      }: TMessage) => {
        console.log('CHAT_RECEIVE_MESSAGE:', text, image, originId);

        setMessages(previousMessages => {
          if (!previousMessages.some(m => m._id === originId)) {
            return GiftedChat.append(previousMessages, {
              _id: originId,
              text,
              image,
              createdAt,
              user: {_id: senderId},
            } as any);
          }
          return previousMessages;
        });
      },
    );
  }, [socketClient]);
  return (
    <View style={styles.container}>
      {isMessageLoading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      ) : (
        <>
          <Header
            style={styles.header}
            hasBackButton={true}
            headerTitle={postAuthorName ?? 'Loading...'}
          />
          <TouchableOpacity
            style={styles.post}
            onPress={() => {
              // navigate to PostDetail
              navigate(RouteName.DETAIL_POST, {
                postId: postId,
              });
            }}>
            <Image
              source={{
                uri: postImage ?? DEFAULT_FALLBACK_IMAGE,
              }}
              style={styles.postImage}
            />
            <View style={styles.postInnerRight}>
              <Text numberOfLines={2} ellipsizeMode="tail">
                {postTitle}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.postPrice}>
                {masked} đ
              </Text>
            </View>
          </TouchableOpacity>
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
              <View style={styles.renderSend}>
                {text === '' && (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('onPress camera');
                      // show select media modal
                      setVisibleModal(true);
                    }}>
                    <Icon
                      source="camera"
                      color={MD3Colors.primary50}
                      size={20}
                    />
                  </TouchableOpacity>
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
            // ------

            // renderMessageImage={customMessageImages}
            // ---------
            infiniteScroll={true}
            onLoadEarlier={() => {
              console.log('Load earlier messages');
            }}
            isLoadingEarlier={true}
            renderLoadEarlier={() => {
              return <Text>Loading...</Text>;
            }}
            listViewProps={{
              // hide the scroll bar
              showsVerticalScrollIndicator: false,
              // scrollEventThrottle: 400,
              // onScroll: (nativeEvent: any) => {
              //   console.log('onScroll');
              // },
              onEndReachedThreshold: 0.3,
              // When the top of the content is within 3/10 of the visible length of the content
              onEndReached: () => {
                // console.log('onEndReached');
                if (listMessages?.hasNextPage) {
                  setPagination(prev => ({
                    ...prev,
                    page: prev.page + 1,
                  }));
                }
              },
            }}
          />
        </>
      )}

      {/* Select media modal */}
      <SelectMediaModal
        visible={visibleModal}
        onDismiss={() => setVisibleModal(false)}
        onSelectMedia={onSendMedia}
      />
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 0,
  },
  post: {
    height: 70,
    backgroundColor: MD2Colors.grey200,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  postInnerRight: {
    width: '80%',
  },
  postPrice: {
    color: 'red',
    fontWeight: 'bold',
  },
  renderSend: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 14,
  },
});
