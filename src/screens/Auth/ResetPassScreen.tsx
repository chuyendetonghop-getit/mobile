import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, TextInput, Title, HelperText} from 'react-native-paper';
import Container from '../../components/Container';

const ResetPassScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleResetPassword = () => {
    // Handle reset password logic here
    console.log('Reset password for email:', email);
  };

  const validateEmail = value => {
    if (!email.includes('@')) {
      setEmailError('Email address is invalid');
    } else {
      setEmailError('');
    }
  };

  return (
    <Container>
      <Title style={styles.title}>Reset Password</Title>
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={value => {
          setEmail(value);
          validateEmail(value);
        }}
        keyboardType="email-address"
        onBlur={validateEmail}
        error={emailError !== ''}
      />
      {!!emailError ? (
        <HelperText
          type="error"
          visible={emailError !== ''}
          style={styles.helperText}>
          {emailError}
        </HelperText>
      ) : null}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleResetPassword}
        disabled={!email || emailError !== ''}>
        RESET PASSWORD
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  helperText: {
    marginBottom: 10,
    marginTop: -10,
  },
});

export default ResetPassScreen;
