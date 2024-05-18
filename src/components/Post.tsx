import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Divider, Text} from 'react-native-paper';

import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';
import {TPost} from 'types/post.type';
import {formatWithMask} from 'react-native-mask-input';
import {VNDMask} from 'screens/BottomTabs/PostScreen';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

type Props = TPost;

const Post = ({
  _id,
  title,
  description,
  location,
  price,
  images,
  createdAt,
}: Props) => {
  const {masked, unmasked, obfuscated} = formatWithMask({
    text: price.toString(),
    mask: VNDMask,
  });

  const imagesInternal = images;
  const image =
    imagesInternal && imagesInternal.length > 0
      ? imagesInternal[0]
      : 'https://picsum.photos/200/300';

  const onPress = () => {
    console.log('Post ID: ', _id);
    // navigate(RouteName.DETAIL_POST, {postId: props._id});
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Divider />
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View style={styles.right}>
        <Text variant="titleSmall" numberOfLines={1}>
          {title}
        </Text>
        <Text variant="bodySmall" numberOfLines={2}>
          {description}
        </Text>
        <Text variant="bodyMedium" style={styles.price}>
          {masked}đ
        </Text>
        <View style={styles.wrapperLocationTime}>
          <Text variant="bodySmall">{location?.displayName}</Text>
          <Text variant="bodySmall">{moment(createdAt).fromNow()}</Text>
        </View>
      </View>
      {/* <Divider /> */}
    </TouchableOpacity>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  right: {
    flex: 1,
    marginHorizontal: 8,
  },
  price: {
    color: 'black',
    fontWeight: 'bold',
  },
  wrapperLocationTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
