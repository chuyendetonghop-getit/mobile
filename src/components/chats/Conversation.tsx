import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MD3Colors, Text} from 'react-native-paper';

import {ChatDetailScreenParams} from 'navigation/NavigationParams';
import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';
import {TConversationItem} from 'types/conversation.type';
import {DEFAULT_AVATAR, DEFAULT_FALLBACK_IMAGE} from 'utils/constant';
import {EChatDetailScreenTypes} from 'utils/enum';

const Conversation = (item: TConversationItem) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      activeOpacity={!item?.partner?._id || !item?.post?._id ? 1 : 0.8}
      onPress={() => {
        // navigate to ChatDetail
        if (!item?.partner?._id || !item?.post?._id) return;
        navigate<ChatDetailScreenParams>(RouteName.CHAT_DETAIL, {
          receiverId: item.partner._id.toString(),
          postId: item.post._id.toString(),
          postTitle: item.post.title,
          postImage: item.post.images[0] ?? DEFAULT_FALLBACK_IMAGE,
          postPrice: item.post.price,
          postAuthorName: item.partner.name,
        });
      }}>
      <View style={styles.itemLeft}>
        <Image
          source={
            item.partner.avatar
              ? {
                  uri: item.partner.avatar,
                }
              : DEFAULT_AVATAR
          }
          style={styles.itemLeftImage}
        />

        <View
          style={{
            width: '70%',
            // backgroundColor: 'red',
          }}>
          <View style={styles.userWithTime}>
            <Text>{item.partner.name}</Text>
            <Text> - </Text>
            <Text style={styles.textTime}>
              {moment(item.updatedAt).fromNow()}
            </Text>
          </View>
          <Text
            style={styles.textPostTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item?.post?.title ?? 'Tin đăng đã bị xóa'}
          </Text>
          <Text
            style={styles.textMessage}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.lastMessage?.text}
          </Text>
        </View>
      </View>

      <Image
        source={{
          uri: item?.post?.images[0] ?? DEFAULT_FALLBACK_IMAGE,
        }}
        style={styles.imageRight}
      />
    </TouchableOpacity>
  );
};

export default Conversation;

const styles = StyleSheet.create({
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
    width: '100%',
  },
  textMessage: {
    fontSize: 12,
    color: MD3Colors.neutralVariant70,
    width: '80%',
  },
  imageRight: {
    width: 48,
    height: 48,
    borderRadius: 8,
    // marginRight: 16,
  },
});
