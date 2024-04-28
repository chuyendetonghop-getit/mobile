import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
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
import StatusModal from '../../components/modals/StatusModal';
import {PostScreenProps} from '../../navigation/NavigationProps';
import {goBack} from '../../navigation/NavigationUtils';
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

const PostScreen = (props: PostScreenProps) => {
  const [visibleModal, setVisibleModal] = React.useState<{
    [key: string]: boolean;
  }>({
    category: false,
    status: false,
  });

  const showModal = (type: 'category' | 'status') =>
    setVisibleModal({...visibleModal, [type]: true});
  const hideModal = (type: 'category' | 'status') =>
    setVisibleModal({...visibleModal, [type]: false});

  const navigation = props.navigation;
  const [data, setData] = useState({
    category: category[0],
    images: [],
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

  const onDone = () => console.log('Done post');

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

        {/* title */}
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
  inputOutline: {},
  input: {
    fontSize: 14,
  },
});
