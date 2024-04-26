import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Divider, Text} from 'react-native-paper';
import {navigate} from '../navigation/NavigationUtils';
import RouteName from '../navigation/RouteName';

type Props = {
  id: string | number;
  title: string;
  description: string;
  address: string;
  time: string;
  price: string | number;
  image: string;
};

const Post = ({id, title, description, address, time, price, image}: Props) => {
  const onPress = () => {
    console.log('Post ID: ', id);
    navigate(RouteName.DETAIL_POST, {postId: id});
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
        <Text variant="titleSmall">{title}</Text>
        <Text variant="bodySmall">{description}</Text>
        <Text variant="bodySmall">{address}</Text>
        <Text variant="bodySmall">{time}</Text>
        <Text variant="bodyMedium" style={styles.price}>
          {price}
        </Text>
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
});
