import {
  ChatDetailScreenParams,
  PostScreenParams,
} from 'navigation/NavigationParams';
import {goBack, navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';
import React from 'react';
import {Alert, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, MD2Colors, MD3Colors, Text} from 'react-native-paper';

import {useDeletePostMutation} from 'api/post.api';
import {appWidth} from 'themes/spacing';
import {EChatDetailScreenTypes, EPostScreenTypes} from 'utils/enum';
import {hideLoading, showLoading} from './AppLoading';

type Props = {
  isAuthor: boolean;
  phone: string;
  authorId: string;
  postId: string;
  postTitle: string;
  postImage: string;
  postPrice: number;
  postAuthorName: string;
};

const PostAction = ({
  phone,
  authorId,
  postTitle,
  postId,
  isAuthor,
  postImage,
  postPrice,
  postAuthorName,
}: Props) => {
  const [deletePostFn, {isLoading}] = useDeletePostMutation();

  const onCall = async () => {
    console.log('Call to seller');
    Linking.openURL(`tel:${phone}`);
  };

  const onSMS = async () => {
    console.log('SMS with seller');
    const body = `Xin chào, tôi muốn hỏi về bài đăng ${postTitle} của bạn`;
    Linking.openURL(`sms:${phone}?body=${body}`);
  };

  const onChat = async () => {
    console.log('Chat with seller ID:', authorId);
    navigate<ChatDetailScreenParams>(RouteName.CHAT_DETAIL, {
      receiverId: authorId,
      postId: postId,
      postTitle: postTitle,
      postImage: postImage,
      postPrice: postPrice,
      postAuthorName: postAuthorName,
    });
  };

  const deleteHandler = async () => {
    try {
      showLoading();
      const response = await deletePostFn({
        id: postId,
      });
      console.log('Delete Post Response:', response);
      goBack();
    } catch (error) {
      console.log('Delete Post Error:', error);
    } finally {
      hideLoading();
    }
  };

  const onDelete = async () => {
    console.log('Delete post');
    Alert.alert(
      'Bạn có chắc chắn?',
      'Bạn có chắc chắn muốn xoá bài đăng này?',
      [
        {
          text: 'Huỷ bỏ',
          style: 'cancel',
          onPress: () => {
            // Huỷ bỏ việc xoá
          },
        },
        {
          text: 'Xoá',
          onPress: deleteHandler,
        },
      ],
      {cancelable: false},
    );
  };

  const onEdit = async () => {
    console.log('Edit post');
    navigate<PostScreenParams>(RouteName.POST, {
      mode: EPostScreenTypes.UPDATE,
      postId: postId,
    });
  };

  return (
    <View style={styles.container}>
      {isAuthor ? (
        <>
          <TouchableOpacity style={styles.item} onPress={onDelete}>
            <Icon source="delete" size={32} color={MD3Colors.primary50} />
            <Text style={styles.itemText} variant="bodyMedium">
              Đã bán/Xoá tin
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item} onPress={onEdit}>
            <Icon source="pencil" size={32} color={MD3Colors.primary50} />
            <Text style={styles.itemText} variant="bodyMedium">
              Sửa tin
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.item} onPress={onCall}>
            <Icon source="phone" size={32} color={MD3Colors.primary50} />
            <Text style={styles.itemText} variant="bodyMedium">
              Gọi điện
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item} onPress={onSMS}>
            <Icon source="message-text" size={32} color={MD3Colors.primary50} />
            <Text style={styles.itemText} variant="bodyMedium">
              Nhắn tin
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item} onPress={onChat}>
            <Icon
              source="chat-processing"
              size={32}
              color={MD3Colors.primary50}
            />
            <Text style={styles.itemText} variant="bodyMedium">
              Chat
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default PostAction;

const styles = StyleSheet.create({
  container: {
    height: 56,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    backgroundColor: MD2Colors.grey300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  item: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: (appWidth - 32) / 3 - 16,
    // backgroundColor: '#14c0f4',
    gap: 12,
  },

  itemText: {
    fontSize: 12,
    // color: 'white',
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'white',
  },
});
