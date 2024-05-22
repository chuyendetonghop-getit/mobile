import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MD3Colors, Text} from 'react-native-paper';
import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';
import {ChatDetailScreenParams} from 'navigation/NavigationParams';
import {EChatDetailScreenTypes} from 'utils/enum';

type TConversation = {
  id: number;
  name: string;
  postTitle: string;
  message: string;
  time: string;
  avatar: string;
  postImage: string;
};

const Conversation = (item: TConversation) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        console.log('Conversation: ', item);
        // navigate to ChatDetail
        navigate<ChatDetailScreenParams>(RouteName.CHAT_DETAIL, {
          mode: EChatDetailScreenTypes.VIEW,
          conversationId: item.id.toString(),
        });
      }}>
      <View style={styles.itemLeft}>
        <Image
          source={{
            uri: item.avatar,
          }}
          style={styles.itemLeftImage}
        />

        <View>
          <View style={styles.userWithTime}>
            <Text>{item.name}</Text>
            <Text> - </Text>
            <Text style={styles.textTime}>{item.time}</Text>
          </View>
          <Text style={styles.textPostTitle}>{item.postTitle}</Text>
          <Text style={styles.textMessage}>{item.message}</Text>
        </View>
      </View>

      <Image
        source={{
          uri: item.postImage,
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
});
