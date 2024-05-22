import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Divider,
  Icon,
  IconButton,
  MD2Colors,
  MD3Colors,
  Text,
} from 'react-native-paper';
import OutsidePressHandler from 'react-native-outside-press';

import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';
import {TPost} from 'types/post.type';
import {formatWithMask} from 'react-native-mask-input';
import {VNDMask} from 'screens/BottomTabs/PostScreen';
import moment from 'moment';
import 'moment/locale/vi';
import {useDeletePostMutation} from 'api/post.api';
import {hideLoading, showLoading} from './AppLoading';
import {PostScreenParams} from 'navigation/NavigationParams';
import {EPostScreenTypes} from 'utils/enum';

moment.locale('vi');

type Props = TPost & {
  distance?: number;
  isShowMore?: boolean;
  refetch?: () => void;
};

const Post = ({
  _id,
  title,
  description,
  location,
  price,
  images,
  createdAt,
  distance,
  isShowMore = false,
  refetch,
}: Props) => {
  const [deletePostFn, {isLoading}] = useDeletePostMutation();

  const [isShowMoreAction, setIsShowMoreAction] = useState(false);

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
    navigate(RouteName.DETAIL_POST, {postId: _id});
  };

  const onDelete = async () => {
    try {
      showLoading();
      const response = await deletePostFn({
        id: _id,
      });
      console.log('Delete Post Response:', response);
    } catch (error) {
      console.log('Delete Post Error:', error);
    } finally {
      hideLoading();
      refetch && refetch();
    }
  };

  const actions = [
    // {
    //   icon: 'camera',
    //   label: 'Ẩn',
    //   onPress: () => {
    //     console.log('Ẩn');
    //   },
    // },
    {
      icon: 'pencil',
      label: 'Sửa',
      onPress: () => {
        console.log('Sửa');
        navigate<PostScreenParams>(RouteName.POST, {
          mode: EPostScreenTypes.UPDATE,
          postId: _id,
        });
      },
    },
    {
      icon: 'delete',
      label: 'Xoá',
      onPress: () => {
        console.log('Xoá');
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
              onPress: onDelete,
            },
          ],
          {cancelable: false},
        );
      },
    },
  ];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          paddingVertical: isShowMore ? 20 : 8,
        },
      ]}
      onPress={onPress}>
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
          {masked} đ
        </Text>
        <View style={styles.wrapperLocationTime}>
          <Text variant="bodySmall" style={styles.location}>
            {!Boolean(distance) ? 0.01 : distance?.toFixed(2)} km
          </Text>

          <Text style={styles.dotDivider}> • </Text>
          <Text
            variant="bodySmall"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.location,
              {
                width: 120,
              },
            ]}>
            {location?.displayName}
          </Text>
          <Text style={styles.dotDivider}> • </Text>
          <Text variant="bodySmall">{moment(createdAt).fromNow()}</Text>
        </View>
      </View>
      {/* <Divider /> */}
      {isShowMore ? (
        <View style={styles.wrapperMore}>
          <IconButton
            icon="dots-vertical"
            iconColor="black"
            size={20}
            style={styles.moreIcon}
            onPress={() => {
              setIsShowMoreAction(!isShowMoreAction);
            }}
          />
          {/* {isShowMoreAction ? <PostAction /> : null} */}
          {isShowMoreAction ? (
            <View style={styles.wrapperPostAction}>
              <OutsidePressHandler
                onOutsidePress={() => {
                  console.log('Pressed outside the box!');
                  setIsShowMoreAction(false);
                }}>
                {actions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.actionItem}
                    onPress={() => {
                      setIsShowMoreAction(false);
                      item.onPress();
                    }}>
                    <Icon
                      source={item.icon}
                      color={MD3Colors.primary50}
                      size={20}
                    />
                    <Text style={[]}>{item.label}</Text>
                    <Divider />
                  </TouchableOpacity>
                ))}
              </OutsidePressHandler>
            </View>
          ) : null}
        </View>
      ) : null}
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
    color: 'red',
    fontWeight: 'bold',
  },
  wrapperLocationTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  location: {
    color: MD2Colors.grey800,
  },
  dotDivider: {
    color: MD2Colors.grey400,
    fontSize: 10,
  },

  // Post Action
  wrapperPostAction: {
    position: 'absolute',
    top: 28,
    right: 8,

    // width: 50,
    height: 70,

    backgroundColor: 'white',
    // borderWidth: 1,
    borderRadius: 8,
    padding: 4,

    justifyContent: 'space-evenly',
    alignItems: 'center',
    // gap: 4,

    zIndex: 20,
    overflow: 'hidden',

    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 10,
    shadowColor: '#52006A',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,

    // backgroundColor: 'red',
    marginTop: 4,
  },
  wrapperMore: {
    padding: 0,
    margin: 0,
    // backgroundColor: 'red',
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
  },
  moreIcon: {
    // padding: 0,
    margin: 0,
    // backgroundColor: 'pink',
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
  },
});
