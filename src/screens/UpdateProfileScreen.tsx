import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  Button,
  Divider,
  HelperText,
  IconButton,
  MD2Colors,
  MD3Colors,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';

import {
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from 'api/auth.api';
import {hideLoading, showLoading} from 'components/AppLoading';
import Container from 'components/Container';
import Header from 'components/Header';
import Section from 'components/Section';
import SelectMediaModal from 'components/modals/SelectMediaModal';
import {useAppSelector} from 'redux/store';
import {appWidth} from 'themes/spacing';
import {DEFAULT_AVATAR} from 'utils/constant';

const UpdateProfileScreen = () => {
  const user = useAppSelector(state => state.auth?.user);

  const [updateProfileFn, {isLoading: isLoadingProfile, error: errorProfile}] =
    useUpdateProfileMutation();
  const [
    updatePasswordFn,
    {isLoading: isLoadingPassword, error: errorPassword},
  ] = useUpdatePasswordMutation();

  const [updatedData, setUpdatedData] = useState({
    avatar: user?.avatar,
    name: user?.name,
    email: user?.email,
  });

  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [isShowPicker, setIsShowPicker] = useState(false);

  //   SnackBar state
  const [visible, setVisible] = useState(false);

  const onUpdate = async () => {
    if (!updatedData.name) {
      return;
    }

    if (
      password.newPassword &&
      password.newPassword !== password.confirmPassword
    ) {
      return;
    }

    try {
      showLoading();

      //   detect if name, email or avatar is changed
      if (
        updatedData.name !== user?.name ||
        updatedData.email !== user?.email ||
        updatedData.avatar !== user?.avatar
      ) {
        console.log('Update profile -> updatedData');
        await updateProfileFn({
          id: user?._id as string,
          name: updatedData.name,
          email: updatedData.email,
          avatar: updatedData.avatar,
        });
      }

      if (
        password.newPassword &&
        password.newPassword === password.confirmPassword
      ) {
        console.log('Update password -> password');

        await updatePasswordFn({
          phone: user?.phone as string,
          newPassword: password.newPassword,
        });

        // Clear password
        setPassword({newPassword: '', confirmPassword: ''});
      }
    } catch (error) {
      console.log('Update profile -> error', error);
    } finally {
      setVisible(true);
      hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        hasBackButton={true}
        headerTitle="Cập nhật thông tin"
      />

      <Container style={styles.containerContent} scrollable>
        <Section style={[styles.sectionAvatar]}>
          <Image
            source={
              updatedData.avatar ? {uri: updatedData.avatar} : DEFAULT_AVATAR
            }
            style={styles.avatar}
          />
          <IconButton
            icon="camera-plus"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={() => setIsShowPicker(true)}
            style={styles.cameraIcon}
          />
        </Section>

        <Section>
          <TextInput
            mode="outlined"
            label="Tên người dùng"
            value={updatedData?.name}
            onChangeText={text => {
              setUpdatedData(prev => ({...prev, name: text}));
            }}
            editable={true}
            outlineStyle={styles.input}
          />
        </Section>

        <Section style={[styles.sectionWithoutPaddingTop]}>
          <TextInput
            mode="outlined"
            label="* Số điện thoại"
            value={user?.phone}
            // onChangeText={text => console.log(text)}
            editable={false}
            outlineStyle={styles.input}
          />
        </Section>

        <Section style={[styles.sectionWithoutPaddingTop]}>
          <TextInput
            mode="outlined"
            label="Email"
            value={updatedData?.email}
            onChangeText={text => {
              console.log(text);

              setUpdatedData(prev => ({...prev, email: text}));
            }}
            editable={true}
            outlineStyle={styles.input}
          />
        </Section>

        <Divider />

        <Section style={[]}>
          <Text variant="bodyMedium">Đổi mật khẩu</Text>
        </Section>

        <Section style={[styles.sectionWithoutPaddingTop]}>
          <TextInput
            mode="outlined"
            label="Mật khẩu mới"
            value={password.newPassword}
            onChangeText={text => {
              setPassword(prev => ({...prev, newPassword: text}));
            }}
            editable={true}
            outlineStyle={styles.input}
          />
        </Section>

        <Section style={[styles.sectionWithoutPaddingTop]}>
          <TextInput
            mode="outlined"
            label="Nhập lại khẩu mới"
            value={password.confirmPassword}
            onChangeText={text => {
              setPassword(prev => ({...prev, confirmPassword: text}));
            }}
            editable={true}
            outlineStyle={styles.input}
          />
          {password.newPassword !== password.confirmPassword ? (
            <HelperText
              type="error"
              visible={password.newPassword !== password.confirmPassword}
              padding="none">
              Mật khẩu không khớp
            </HelperText>
          ) : null}
        </Section>

        <Divider />

        <HelperText type="info" visible padding="none">
          * Thông tin bắt buộc - không thể thay đổi
        </HelperText>

        <Section>
          <Button
            mode="contained"
            onPress={() => {
              console.log('Pressed update profile');
              onUpdate();
            }}
            loading={isLoadingProfile || isLoadingPassword}
            style={[]}>
            Cập nhật
          </Button>
        </Section>
      </Container>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => {
            setVisible(false);
          },
        }}
        style={styles.snackBar}>
        <Text style={styles.snackbarText}>
          Cập nhật thông tin{' '}
          {errorProfile || errorPassword ? 'thất bại!' : 'thành công!'}
        </Text>
      </Snackbar>
      <SelectMediaModal
        visible={isShowPicker}
        onDismiss={() => setIsShowPicker(false)}
        onSelectMedia={mediaURL => {
          //   console.log('mediaURL XXXXX->', mediaURL[0]);
          setUpdatedData(prev => ({...prev, avatar: mediaURL[0]}));
        }}
      />
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 0,
  },
  containerContent: {
    // flex: 1,
    paddingTop: 0,
    // alignItems: 'center',
  },
  sectionWithoutPaddingTop: {
    paddingTop: 0,
  },
  sectionAvatar: {
    // padding: 0,
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    //   borderColor: MD2Colors.grey200,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: MD2Colors.grey100,
    borderWidth: 1,
    borderColor: MD2Colors.grey200,
  },
  input: {
    width: appWidth - 32,
    // backgroundColor: 'red',
  },
  snackBar: {
    width: appWidth - 32,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  snackbarText: {
    color: 'white',
  },
});
