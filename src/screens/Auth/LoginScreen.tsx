import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  Button,
  HelperText,
  Snackbar,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';

import {useLoginMutation} from 'api/auth.api';
import Container from 'components/Container';
import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';

const LoginScreen = () => {
  const [login, {isLoading}] = useLoginMutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  // SnackBar state
  const [visible, setVisible] = React.useState(false);
  const onShowSnackBar = () => setVisible(true);
  const onHideSnackBar = () => setVisible(false);

  // Validate phone and password
  const hasErrorsPhone = () => {
    const phoneRegex = /^[0-9]{10}$/;
    return !phoneRegex.test(phone);
  };

  const hasErrorsPassword = () => {
    return password.length < 6;
  };

  const handleLogin = async () => {
    if (phone === '' || password === '') {
      return;
    }
    try {
      await login({phone, password}).unwrap();
    } catch (error) {
      console.log('Failed to login:', error);
      onShowSnackBar();
    }
  };

  return (
    <Container style={styles.container}>
      <Title style={styles.title}>Đăng nhập</Title>
      <TextInput
        style={styles.input}
        label="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      {!!phone && hasErrorsPhone() ? (
        <HelperText
          type="error"
          visible={hasErrorsPhone()}
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
      {!!password && hasErrorsPassword() ? (
        <HelperText
          type="error"
          visible={hasErrorsPassword()}
          style={styles.helperText}>
          Mật khẩu phải có ít nhất 6 ký tự
        </HelperText>
      ) : null}

      <Pressable
        style={styles.helperLink}
        onPress={() => {
          navigate(RouteName.RESET_PASSWORD);
        }}>
        <Text>Quên mật khẩu?</Text>
      </Pressable>

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleLogin}
        disabled={isLoading || !phone || !password}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Đăng nhập</Text>
        )}
      </Button>
      <Button
        style={styles.signupLink}
        onPress={() => {
          navigate(RouteName.SIGNUP);
        }}>
        Chưa có tài khoản? Đăng ký ngay
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
        Số điện thoại hoặc mật khẩu không đúng!
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
  helperLink: {
    marginTop: 2,
    color: 'blue',
    alignItems: 'flex-start',
    padding: 0,
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

export default LoginScreen;
