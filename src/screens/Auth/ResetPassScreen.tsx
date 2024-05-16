import React, {useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, Text} from 'react-native';
import {
  Button,
  HelperText,
  Snackbar,
  TextInput,
  Title,
} from 'react-native-paper';

import {useForgotPasswordMutation} from 'api/auth.api';
import Container from 'components/Container';
import {VerifyOTPScreenParams} from 'navigation/NavigationParams';
import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';
import {ETokenTypes} from 'utils/enum';

const ResetPassScreen = () => {
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const [phone, setPhone] = useState('');

  const handleResetPassword = async () => {
    // Handle reset password logic here
    console.log('Reset password for phone:', phone);

    // Call API to reset password
    try {
      const result = await forgotPassword({phone}).unwrap();
      console.log('Reset password successfully:', result);

      if (result.success) {
        navigate<VerifyOTPScreenParams>(RouteName.VERIFY_OTP, {
          phone,
          resendType: ETokenTypes.OTP_RESET,
        });
      }
    } catch (error) {
      console.log('Failed to reset password:', error);
      onShowSnackBar();
    }
  };

  // SnackBar state
  const [visible, setVisible] = React.useState(false);
  const onShowSnackBar = () => setVisible(true);
  const onHideSnackBar = () => setVisible(false);

  // Validate phone
  const hasErrorsPhone = () => {
    const phoneRegex = /^[0-9]{10}$/;
    return !phoneRegex.test(phone);
  };

  return (
    <Container style={styles.container}>
      <Title style={styles.title}>Quên mật khẩu</Title>
      <TextInput
        style={styles.input}
        label="Số điện thoại"
        value={phone}
        onChangeText={value => {
          setPhone(value);
        }}
        keyboardType="phone-pad"
        error={hasErrorsPhone() && phone !== ''}
      />
      {!!hasErrorsPhone() ? (
        <HelperText
          type="error"
          visible={phone !== ''}
          style={styles.helperText}>
          Số điện thoại không hợp lệ
        </HelperText>
      ) : null}

      <Button
        style={styles.button}
        mode="contained"
        // loading={isLoading}
        onPress={handleResetPassword}
        disabled={!phone || hasErrorsPhone()}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Tiếp tục</Text>
        )}
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
        Người dùng không tồn tại
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
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    height: 40,
    borderRadius: 5,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  helperText: {
    marginBottom: 10,
    marginTop: -10,
  },
  snackBar: {
    width: Dimensions.get('window').width - 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResetPassScreen;
