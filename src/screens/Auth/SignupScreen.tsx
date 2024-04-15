import React, {useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import {
  Button,
  TextInput,
  Title,
  Text,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import {useLoginMutation} from '../../api/auth/auth.api';
import {navigate} from '../../navigation/NavigationUtils';
import RouteName from '../../navigation/RouteName';
import Container from '../../components/Container';

const SignupScreen = () => {
  const [login, {isLoading}] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  // SnackBar state
  const [visible, setVisible] = React.useState(false);
  const onShowSnackBar = () => setVisible(!visible);
  const onHideSnackBar = () => setVisible(false);

  // Validate email and password
  const hasErrorsEmail = () => {
    return !email.includes('@');
  };

  const hasPhoneErrors = () => {
    return phone.length < 10;
  };

  const hasErrorsPassword = () => {
    return password.length < 6;
  };

  const handleSignup = async () => {
    if (email === '' || password === '' || phone === '') {
      return;
    }
    try {
      // const result = await login({email, password});
      // if (result) {
      //   console.log('Login successfully:', result);
      // }
    } catch (error) {
      console.log('Failed to login:', error);
      onHideSnackBar();
    }
  };

  return (
    <Container>
      <Title style={styles.title}>Đăng ký</Title>
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
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      {!!phone && hasPhoneErrors() ? (
        <HelperText
          type="error"
          visible={hasPhoneErrors()}
          style={styles.helperText}>
          Phone number is invalid!
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
      {!!password && hasErrorsPassword ? (
        <HelperText
          type="error"
          visible={hasErrorsPassword()}
          style={styles.helperText}>
          Password must be at least 6 characters
        </HelperText>
      ) : null}

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSignup}
        disabled={isLoading || !email || !phone || !password}>
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
        Đăng ký thất bại!
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
