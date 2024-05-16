import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, MD3Colors, Text} from 'react-native-paper';

import {appWidth} from 'themes/spacing';

type Props = {
  phone: string | number;
  authorId: string | number;
  postTitle: string;
};

const PostAction = ({phone, authorId, postTitle}: Props) => {
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
  };
  return (
    <View style={styles.container}>
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
        <Icon source="chat-processing" size={32} color={MD3Colors.primary50} />
        <Text style={styles.itemText} variant="bodyMedium">
          Chat
        </Text>
      </TouchableOpacity>
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
    backgroundColor: '#d3d3d3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
