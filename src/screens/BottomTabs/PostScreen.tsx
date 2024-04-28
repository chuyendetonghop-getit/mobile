import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import MaskInput, {createNumberMask} from 'react-native-mask-input';
import {
  Appbar,
  Divider,
  Icon,
  MD3Colors,
  Text,
  TextInput,
} from 'react-native-paper';

import Container from '../../components/Container';
import Section from '../../components/Section';
import CategoryModal from '../../components/modals/CategoryModal';
import SelectMediaModal from '../../components/modals/SelectMediaModal';
import StatusModal from '../../components/modals/StatusModal';
import {PostScreenProps} from '../../navigation/NavigationProps';
import {goBack} from '../../navigation/NavigationUtils';
import {appWidth} from '../../themes/spacing';
import {category} from '../../utils/category';
import {EPostScreenTypes} from '../../utils/enum';

const fakeStore = {
  location: 'An Khánh, Hoài Đức, Hà Nội',
  category: category[0],
};

const VNDMask = createNumberMask({
  // prefix: ['R', '$', ' '],
  delimiter: '.',
  separator: ',',
  precision: 0,
});

type TModalTypes = 'category' | 'media' | 'status';

const PostScreen = (props: PostScreenProps) => {
  const [visibleModal, setVisibleModal] = React.useState<{
    [key: string]: boolean;
  }>({
    category: false,
    media: false,
    status: false,
  });

  const showModal = (type: TModalTypes) =>
    setVisibleModal({...visibleModal, [type]: true});
  const hideModal = (type: TModalTypes) =>
    setVisibleModal({...visibleModal, [type]: false});

  const [visible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const navigation = props.navigation;
  const [data, setData] = useState({
    category: category[0],
    images: [] as string[],
    title: '',
    price: '',
    status: '',
    description: '',
    phone: '',
  });

  const updateData = (key: string, value: string) => {
    setData({...data, [key]: value});
  };

  const screenMode = props.route.params?.mode ?? EPostScreenTypes.CREATE;

  console.log('Post Screen with mode:', screenMode);

  const postId: string | undefined =
    screenMode === EPostScreenTypes.UPDATE
      ? props.route.params?.postId
      : undefined;

  const titleByMode =
    screenMode === EPostScreenTypes.CREATE ? 'Đăng tin mới' : 'Chỉnh sửa tin';

  const onCancel = () => {
    console.log('Cancel post');
    goBack();
  };

  const onDone = () => {
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
    } else if (data.status.length === 0) {
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

    console.log('Post data:', data);
  };

  useEffect(() => {
    if (!postId) return;
    // Load post data by postId
    console.log('Load post data by postId:', postId);
    return () => {
      // second
    };
  }, [postId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      console.log('beforeRemove event');
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Hiển thị cảnh báo khi người dùng chuẩn bị rời khỏi màn hình PostScreen
      Alert.alert(
        'Bạn có chắc chắn?',
        'Dữ liệu bạn đang nhập có thể bị mất. Bạn có muốn tiếp tục?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
            onPress: () => {
              e.preventDefault(); // Ngăn chặn việc rời khỏi màn hình
            },
          },
          {
            text: 'Tiếp tục',
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
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <CategoryModal
        visible={visibleModal.category}
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
          <Text> {fakeStore.location}</Text>
        </Section>
        <Divider />

        {/* category */}
        <Section
          style={styles.location}
          touchable
          onPress={() => showModal('category')}>
          <Icon
            source={data.category.cat_icon}
            color={MD3Colors.primary50}
            size={20}
          />
          <Text> {data.category.cat_name}</Text>
          <Icon source="chevron-down" color={MD3Colors.primary50} size={20} />
        </Section>
        <Divider />

        {/* image upload */}
        <Section style={styles.uploadWrapper}>
          <TouchableOpacity
            style={styles.upload}
            onPress={() => showModal('media')}>
            <Icon source="camera-plus" color={MD3Colors.primary50} size={20} />
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
                style={{
                  borderRadius: 8,
                  width: (appWidth - 32 - 50) / 4,
                  height: (appWidth - 32 - 50) / 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
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
            label="Giá bán (0đ = Miễn phí)"
            value={data.price}
            // onChangeText={value => {
            //   updateData('price', value);
            // }}
            keyboardType="numeric"
            render={inputProps => (
              <MaskInput
                {...inputProps}
                value={data.price}
                mask={VNDMask}
                onChangeText={(masked, unmasked) => {
                  updateData('price', unmasked as string);

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
          <Text>{data?.status ? data.status : 'Chọn tình trạng'}</Text>
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
    backgroundColor: 'red',
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
  inputOutline: {},
  input: {
    fontSize: 14,
  },
});
