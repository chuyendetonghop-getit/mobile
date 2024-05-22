import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import MaskInput, {createNumberMask} from 'react-native-mask-input';
import {
  ActivityIndicator,
  Appbar,
  Divider,
  Icon,
  MD3Colors,
  Text,
  TextInput,
} from 'react-native-paper';

import {
  useCreatePostMutation,
  useGetDetailPostQuery,
  useUpdatePostMutation,
} from 'api/post.api';
import {hideLoading, showLoading} from 'components/AppLoading';
import Container from 'components/Container';
import Section from 'components/Section';
import CategoryModal from 'components/modals/CategoryModal';
import SelectMediaModal from 'components/modals/SelectMediaModal';
import StatusModal from 'components/modals/StatusModal';
import {PostScreenProps} from 'navigation/NavigationProps';
import {goBack} from 'navigation/NavigationUtils';
import {useAppSelector} from 'redux/store';
import {appWidth} from 'themes/spacing';
import {TPostCreate} from 'types/post.type';
import {category} from 'utils/category';
import {EPostScreenTypes} from 'utils/enum';
import {TStatusItem} from 'types/status.type';
import {delay} from 'lodash';

const DEFAULT_CATEGORY = category[3];

export const VNDMask = createNumberMask({
  // prefix: ['R', '$', ' '],
  delimiter: '.',
  separator: ',',
  precision: 0,
});

type TModalTypes = 'category' | 'media' | 'status';

const PostScreen = (props: PostScreenProps) => {
  const screenMode = props.route.params?.mode ?? EPostScreenTypes.CREATE;

  // console.log('Post Screen with mode:', screenMode);

  const postId: string | undefined =
    screenMode === EPostScreenTypes.UPDATE
      ? props.route.params?.postId
      : undefined;

  const titleByMode =
    screenMode === EPostScreenTypes.CREATE ? 'Đăng tin mới' : 'Chỉnh sửa tin';

  const user = useAppSelector(state => state.auth.user);
  const location = user?.geoLocation?.location;

  const [createPostFn, {isSuccess: isCreateOk}] = useCreatePostMutation();
  const [updatePostFn, {isSuccess: isUpdateOk}] = useUpdatePostMutation();

  const {
    data: postDetail,
    isLoading,
    error,
  } = useGetDetailPostQuery(
    {
      postId: postId ?? '',
      lon: location?.coordinates[0] ?? 0,
      lat: location?.coordinates[1] ?? 0,
    },
    {
      skip: screenMode === EPostScreenTypes.CREATE,
      refetchOnMountOrArgChange: true,
    },
  );

  const postDetailData = postDetail?.data;

  // console.log('Post Detail:', postDetailData);

  const [visibleModal, setVisibleModal] = React.useState<{
    [key: string]: boolean;
  }>({
    category: false,
    media: false,
    status: false,
  });

  const [visible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const navigation = props.navigation;
  const [data, setData] = useState<TPostCreate>({
    userId: user?._id ?? '',
    location: {
      type: 'Point',
      coordinates: [
        screenMode === EPostScreenTypes.CREATE
          ? location?.coordinates[0] ?? 0
          : postDetailData?.location?.coordinates[0] ?? 0,
        location?.coordinates[1] ?? 0,
      ],
      lat:
        screenMode === EPostScreenTypes.CREATE
          ? location?.lat ?? '0'
          : postDetailData?.location?.lat ?? '0',
      lon:
        screenMode === EPostScreenTypes.CREATE
          ? location?.lon ?? '0'
          : postDetailData?.location?.lon ?? '0',
      displayName:
        screenMode === EPostScreenTypes.CREATE
          ? location?.displayName ?? 'Chưa xác định'
          : postDetailData?.location?.displayName ?? 'Chưa xác định',
    },
    category:
      screenMode === EPostScreenTypes.CREATE
        ? DEFAULT_CATEGORY
        : postDetailData?.category ?? DEFAULT_CATEGORY,
    images:
      screenMode === EPostScreenTypes.CREATE
        ? ([] as string[])
        : postDetailData?.images ?? [],
    title:
      screenMode === EPostScreenTypes.CREATE ? '' : postDetailData?.title ?? '',
    price:
      screenMode === EPostScreenTypes.CREATE ? '' : postDetailData?.price ?? '',
    status:
      screenMode === EPostScreenTypes.CREATE
        ? {
            id: '',
            name: '',
            name_en: '',
            description: '',
          }
        : (postDetailData?.status as TStatusItem),
    description:
      screenMode === EPostScreenTypes.CREATE
        ? ''
        : postDetailData?.description ?? '',
    phone:
      screenMode === EPostScreenTypes.CREATE
        ? user?.phone ?? ''
        : postDetailData?.phone ?? '',
  });

  const updateData = (key: string, value: string) => {
    setData({...data, [key]: value});
  };

  const onCancel = () => {
    console.log('Cancel post');
    goBack();
  };

  const onDone = async () => {
    // Check data before post

    if (data.images.length === 0) {
      Alert.alert('Ảnh không được để trống', 'Vui lòng chọn it nhất 01 ảnh');
      return;
    } else if (data.title.length < 3) {
      Alert.alert('Tiêu đề quá ngắn', 'Tiêu đề phải có ít nhất 3 ký tự');
      return;
    } else if (data.price.length === 0) {
      Alert.alert('Giá bán không được để trống', 'Vui lòng nhập giá bán');
      return;
    } else if (!data.status) {
      Alert.alert('Tình trạng không được để trống', 'Vui lòng chọn tình trạng');
      return;
    } else if (data.description.length < 20) {
      Alert.alert('Mô tả quá ngắn', 'Mô tả phải có ít nhất 20 ký tự');
      return;
    } else if (data.phone.length === 0) {
      Alert.alert(
        'Số điện thoại không được để trống',
        'Vui lòng nhập số điện thoại',
      );
      return;
    }

    if (screenMode === EPostScreenTypes.CREATE) {
      //  Call API to create post createPostFn
      try {
        showLoading();
        await createPostFn(data).unwrap();
        // console.log('Create post success: ->', reponse);
      } catch (error: any) {
        console.log('Failed to create post:', error);
      } finally {
        hideLoading();
        delay(() => goBack(), 500);
      }
    } else {
      // Call API to update post updatePostFn
      try {
        showLoading();
        await updatePostFn({
          id: postId ?? '',
          body: data,
        }).unwrap();
        // console.log('Update post success: ->', reponse);
      } catch (error: any) {
        console.log('Failed to update post:', error);
      } finally {
        hideLoading();
        delay(() => goBack(), 500);
      }
    }
  };

  const showModal = (type: TModalTypes) =>
    setVisibleModal({...visibleModal, [type]: true});
  const hideModal = (type: TModalTypes) =>
    setVisibleModal({...visibleModal, [type]: false});

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      console.log('beforeRemove event');
      // Prevent default behavior of leaving the screen
      // If isCreateOk or isUpdateOk is true, then allow the screen to be closed
      if (isCreateOk || isUpdateOk) {
        // console.log('isCreateOk or isUpdateOk is true');
        return;
      }
      e.preventDefault();

      // Hiển thị cảnh báo khi người dùng chuẩn bị rời khỏi màn hình PostScreen
      Alert.alert(
        'Bạn có chắc chắn?',
        'Dữ liệu bạn đang nhập có thể bị mất. Bạn có muốn tiếp tục?',
        [
          {
            text: 'Ở lại',
            style: 'cancel',
            onPress: () => {
              e.preventDefault(); // Ngăn chặn việc rời khỏi màn hình
            },
          },
          {
            text: 'Rời khỏi',
            onPress: () => {
              // Tiếp tục chuyển tab
              navigation.dispatch(e.data.action);
            },
          },
        ],
        {cancelable: false},
      );
    });

    return unsubscribe;
  }, [isCreateOk, isUpdateOk, navigation]);

  // useEffect để cập nhật state khi dữ liệu postDetailData thay đổi
  useEffect(() => {
    if (postDetailData) {
      setData({
        userId: user?._id ?? '',
        location: {
          type: 'Point',
          coordinates: postDetailData?.location?.coordinates ?? [0, 0],
          lat: postDetailData?.location?.lat ?? '0',
          lon: postDetailData?.location?.lon ?? '0',
          displayName: postDetailData?.location?.displayName ?? 'Chưa xác định',
        },
        category: postDetailData?.category ?? DEFAULT_CATEGORY,
        images: postDetailData?.images ?? [],
        title: postDetailData?.title ?? '',
        price: postDetailData?.price ?? '',
        status: postDetailData?.status as TStatusItem,
        description: postDetailData?.description ?? '',
        phone: user?.phone ?? '',
      });
    }
  }, [postDetailData, user]);

  return (
    <View style={styles.wrapper}>
      {screenMode === EPostScreenTypes.CREATE ? (
        <CategoryModal
          visible={
            screenMode === EPostScreenTypes.CREATE
              ? visibleModal.category
              : false
          }
          onDismiss={() => hideModal('category')}
          onSelectCategory={cat_id => {
            console.log('onSelectCategory =>', cat_id);
            setData({
              ...data,
              category:
                category.find(item => item.cat_id === cat_id) ?? category[0],
            });
          }}
        />
      ) : null}

      <SelectMediaModal
        visible={visibleModal.media}
        onDismiss={() => hideModal('media')}
        onSelectMedia={mediaURL => {
          console.log('mediaURL ->', mediaURL);
          // setData({...data, images: mediaURL});
          setData({...data, images: [...data.images, ...mediaURL]});
        }}
      />

      <StatusModal
        visible={visibleModal.status}
        onDismiss={() => hideModal('status')}
        onSelectStatus={status => {
          console.log('onSelectStatus ->', status);
          setData({...data, status});
        }}
      />

      <Appbar.Header mode="center-aligned">
        <Appbar.Action icon="close" onPress={onCancel} />
        <Appbar.Content title={titleByMode} titleStyle={styles.titleStyle} />
        <Appbar.Action icon="check" onPress={onDone} />
      </Appbar.Header>

      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <Container style={styles.container} scrollable>
          {/* location */}
          <Section
            style={styles.location}
            // touchable
            // onPress={() => showModal('location')}
          >
            <Text>Đăng bài tại: </Text>
            <Icon
              source="map-marker-radius"
              color={MD3Colors.primary50}
              size={20}
            />
            <Text numberOfLines={1} ellipsizeMode="tail">
              {' '}
              {screenMode === EPostScreenTypes.CREATE
                ? location?.displayName
                : postDetailData?.location?.displayName}
            </Text>
          </Section>
          <Divider />

          {/* category */}
          <Section
            style={styles.location}
            touchable={screenMode === EPostScreenTypes.CREATE}
            onPress={() => {
              if (screenMode === EPostScreenTypes.UPDATE) {
                return;
              }
              showModal('category');
            }}>
            <Icon
              source={data.category.cat_icon}
              color={MD3Colors.primary50}
              size={20}
            />
            <Text> {data.category.cat_name}</Text>
            {screenMode === EPostScreenTypes.CREATE ? (
              <Icon
                source="chevron-down"
                color={MD3Colors.primary50}
                size={20}
              />
            ) : null}
          </Section>
          <Divider />

          {/* image upload */}
          <Section style={styles.uploadWrapper}>
            <TouchableOpacity
              style={styles.upload}
              onPress={() => showModal('media')}>
              <Icon
                source="camera-plus"
                color={MD3Colors.primary50}
                size={20}
              />
              <Text>Đăng ảnh</Text>
            </TouchableOpacity>

            {data.images.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.upload,
                  {
                    borderWidth: 0,
                    borderColor: 'transparent',
                  },
                ]}
                onPress={() => {
                  setCurrentImage(index);
                  setIsVisible(true);
                }}
                key={index}>
                {/* clear icon */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.clearIcon}
                  onPress={() => {
                    console.log('Clear image :', index + 1);
                    const newImages = data.images.filter((_, i) => i !== index);
                    setData({...data, images: newImages});
                  }}>
                  <Icon
                    source="close-circle"
                    color={MD3Colors.primary50}
                    size={24}
                  />
                </TouchableOpacity>

                <Image
                  resizeMode="cover"
                  source={{
                    uri: item,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </Section>

          {/* title */}
          <Divider />
          <Section>
            <TextInput
              mode="outlined"
              outlineStyle={styles.inputOutline}
              style={styles.input}
              label="Tiêu đề (tối thiểu 3 ký tự)"
              value={data.title}
              onChangeText={value => {
                updateData('title', value);
              }}
            />
          </Section>
          <Divider />

          {/* price */}
          <Section>
            <TextInput
              mode="outlined"
              outlineStyle={styles.inputOutline}
              style={styles.input}
              label="Giá bán (đ)"
              value={data.price.toString()}
              // onChangeText={value => {
              //   updateData('price', value);
              // }}
              keyboardType="numeric"
              render={inputProps => (
                <MaskInput
                  {...inputProps}
                  value={data.price.toString()}
                  mask={VNDMask}
                  onChangeText={(masked, unmasked) => {
                    updateData('price', unmasked);

                    // assuming you typed "123456":
                    console.log(masked); // "R$ 1.234,56"
                    console.log(unmasked); // "123456"
                  }}
                />
              )}
            />
          </Section>
          <Divider />

          {/* status */}
          <Section
            style={styles.location}
            touchable
            onPress={() => showModal('status')}>
            <Icon source="menu" color={MD3Colors.primary50} size={20} />
            <Text>Tình trạng: </Text>
            <Text>
              {data?.status?.name ? data?.status?.name : 'Chọn tình trạng'}
            </Text>
            <Icon source="chevron-down" color={MD3Colors.primary50} size={20} />
          </Section>
          <Divider />

          {/* description */}
          <Section>
            <TextInput
              multiline
              mode="outlined"
              numberOfLines={5}
              outlineStyle={styles.inputOutline}
              style={styles.input}
              label="Mô tả (tối thiểu 20 ký tự)"
              value={data.description}
              onChangeText={value => {
                updateData('description', value);
              }}
            />
          </Section>
          <Divider />

          {/* contact */}
          <Section>
            <TextInput
              mode="outlined"
              outlineStyle={styles.inputOutline}
              style={styles.input}
              label="Số điện thoại liên hệ"
              value={data.phone}
              // onChangeText={value => {
              //   updateData('price', value);
              // }}
              editable={screenMode === EPostScreenTypes.CREATE}
              keyboardType="numeric"
              render={inputProps => (
                <MaskInput
                  {...inputProps}
                  value={data.phone}
                  mask={[
                    /\d/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                  ]}
                  onChangeText={(masked, unmasked) => {
                    updateData('phone', unmasked as string);

                    // assuming you typed "123456":
                    console.log(masked); // "R$ 1.234,56"
                    console.log(unmasked); // "123456"
                  }}
                />
              )}
            />
          </Section>
          <Divider />
        </Container>
      )}

      <ImageView
        images={data.images.map(item => ({uri: item}))}
        imageIndex={currentImage}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: 'red',
  },
  header: {
    height: 64,
  },
  container: {
    flex: 1,
    // backgroundColor: '#d2d2d2',
    paddingTop: 0,
  },
  titleStyle: {
    fontSize: 20,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  uploadWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    // backgroundColor: 'red',
  },
  upload: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 16,
    width: (appWidth - 32 - 50) / 4,
    height: (appWidth - 32 - 50) / 4,
    // backgroundColor: 'pink',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    // overflow: 'hidden',
  },
  clearIcon: {
    position: 'absolute',
    top: -8,
    right: -5.8,
    zIndex: 1,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  image: {
    borderRadius: 8,
    width: (appWidth - 32 - 50) / 4,
    height: (appWidth - 32 - 50) / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputOutline: {},
  input: {
    fontSize: 14,
  },
});
