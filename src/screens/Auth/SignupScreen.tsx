import React, {useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import {
  Button,
  HelperText,
  Snackbar,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';

import {useSignUpMutation} from 'api/auth.api';
import Container from 'components/Container';
import {VerifyOTPScreenParams} from 'navigation/NavigationParams';
import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';
import {ETokenTypes} from 'utils/enum';

const SignupScreen = () => {
  const [signup, {isLoading}] = useSignUpMutation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const onShowSnackBar = () => setVisible(!visible);
  const onHideSnackBar = () => setVisible(false);
  const hasErrorsName = () => {
    return name.length < 3;
  };
  const hasPhoneErrors = () => {
    return phone.length < 10;
  };
  const hasErrorsPassword = () => {
    return password.length < 6;
  };
  const handleSignup = async () => {
    if (name === '' || password === '' || phone === '') {
      return;
    }
    try {
      const result = await signup({name, phone, password}).unwrap();
      if (result.success) {
        console.log('Signup successfully:', result);
        navigate<VerifyOTPScreenParams>(RouteName.VERIFY_OTP, {
          phone,
          resendType: ETokenTypes.OTP_VERIFY,
        });
      }
    } catch (error) {
      console.log('Failed to signup:', error);
      onShowSnackBar();
    }
  };

  return (
    <Container style={styles.container}>
      <Title style={styles.title}>Đăng ký</Title>
      <TextInput
        style={styles.input}
        label="Tên người dùng"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      {!!name && hasErrorsName() ? (
        <HelperText
          type="error"
          visible={hasErrorsName()}
          style={styles.helperText}>
          Tên người dùng phải có ít nhất 3 ký tự
        </HelperText>
      ) : null}

      <TextInput
        style={styles.input}
        label="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      {!!phone && hasPhoneErrors() ? (
        <HelperText
          type="error"
          visible={hasPhoneErrors()}
          style={styles.helperText}>
          Số điện thoại không hợp lệ
        </HelperText>
      ) : null}

      <TextInput
        style={styles.input}
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        right={
          <TextInput.Icon
            icon={hidePassword ? 'eye-off' : 'eye'}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      {!!password && hasErrorsPassword ? (
        <HelperText
          type="error"
          visible={hasErrorsPassword()}
          style={styles.helperText}>
          Mật khẩu phải có ít nhất 6 ký tự
        </HelperText>
      ) : null}

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSignup}
        disabled={isLoading || !name || !phone || !password}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Đăng ký</Text>
        )}
      </Button>
      <Button
        style={styles.signupLink}
        onPress={() => {
          navigate(RouteName.LOGIN);
        }}>
        Đã có tài khoản? Đăng nhập ngay
      </Button>

      <Snackbar
        visible={visible}
        onDismiss={onHideSnackBar}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
            onHideSnackBar();
          },
        }}
        style={styles.snackBar}>
        Người dùng đã tồn tại!
      </Snackbar>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  helperText: {
    marginBottom: 10,
    marginTop: -10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    height: 40,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  signupLink: {
    marginTop: 20,
    color: 'blue',
  },
  snackBar: {
    width: Dimensions.get('window').width - 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignupScreen;
