import React, {useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet} from 'react-native';
import {Button, TextInput, Title, Text} from 'react-native-paper';
import {useLoginMutation} from '../../api/auth/auth.api';
import {navigate} from '../../navigation/NavigationUtils';
import RouteName from '../../navigation/RouteName';
import Container from '../../components/Container';

const LoginScreen = () => {
  const [login, {isLoading}] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async () => {
    try {
      const result = await login({email, password});
      if (result) {
        console.log('Login successfully:', result);
      }
    } catch (error) {
      console.log('Failed to login:', error);
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
        disabled={isLoading}>
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
});

export default LoginScreen;
