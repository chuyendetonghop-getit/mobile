import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  Button,
  TextInput,
  Title,
  Text,
  Snackbar,
  HelperText,
} from 'react-native-paper';
import {useLoginMutation} from '../../api/auth/auth.api';
import {navigate} from '../../navigation/NavigationUtils';
import RouteName from '../../navigation/RouteName';
import Container from '../../components/Container';

const LoginScreen = () => {
  const [login, {isLoading}] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  // SnackBar state
  const [visible, setVisible] = React.useState(false);
  const onShowSnackBar = () => setVisible(true);
  const onHideSnackBar = () => setVisible(false);

  // Validate email and password
  const hasErrorsEmail = () => {
    return !email.includes('@');
  };

  const hasErrorsPassword = () => {
    return password.length < 6;
  };

  const handleLogin = async () => {
    if (email === '' || password === '') {
      return;
    }
    try {
      const result = await login({email, password}).unwrap();
      // console.log('result --> ', result);
      // if (result && result?.data && result?.data?.success) {
      //   console.log('Login successfully:', result?.data);
      //   onToggleSnackBar();
      // }
    } catch (error) {
      console.log('Failed to login:', error);
      onShowSnackBar();
    }
  };

  return (
    <Container>
      <Title style={styles.title}>Đăng nhập</Title>
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!!email && hasErrorsEmail() ? (
        <HelperText
          type="error"
          visible={hasErrorsEmail()}
          style={styles.helperText}>
          Email address is invalid!
        </HelperText>
      ) : null}

      <TextInput
        style={styles.input}
        label="Password"
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
          Password must be at least 6 characters
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
        disabled={isLoading || !email || !password}>
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
        Đăng nhập thất bại!
      </Snackbar>
    </Container>
  );
};

const styles = StyleSheet.create({
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
