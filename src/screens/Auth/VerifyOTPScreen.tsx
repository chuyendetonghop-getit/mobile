import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, Text} from 'react-native';
import {
  Button,
  TextInput,
  Title,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import Container from '../../components/Container';
import {VerifyOTPScreenProps} from '../../navigation/NavigationProps';
import {
  useResendOTPMutation,
  useVerifyForgotPasswordMutation,
  useVerifySignupMutation,
} from '../../api/auth/auth.api';
import {navigate} from '../../navigation/NavigationUtils';
import RouteName from '../../navigation/RouteName';
import {ETokenTypes} from '../../utils/enum';

const VerifyOTPScreen = (props: VerifyOTPScreenProps) => {
  const params = props.route.params;
  const phone = params.phone;
  const resendType = params.resendType;
  console.log('Verify OTP for phone:', phone, resendType);

  const [verifyOTPSignup, {isLoading: isLoadingVerifySignup}] =
    useVerifySignupMutation();
  const [verifyOTPResetPassword, {isLoading: isLoadingVerifyResetPassword}] =
    useVerifyForgotPasswordMutation();
  const [resendOTP] = useResendOTPMutation();

  const isLoading =
    resendType === ETokenTypes.OTP_VERIFY
      ? isLoadingVerifySignup
      : isLoadingVerifyResetPassword;

  const [otp, setOTP] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // SnackBar state
  const [visible, setVisible] = React.useState(false);
  const onShowSnackBar = () => setVisible(true);
  const onHideSnackBar = () => setVisible(false);

  const handleVerifyOTP = async () => {
    try {
      // Call API to verify OTP base on resendType
      console.log(
        'OTP TYPE:',
        otp,
        resendType,
        ETokenTypes.OTP_VERIFY,
        resendType === ETokenTypes.OTP_VERIFY,
      );
      const result =
        resendType === ETokenTypes.OTP_VERIFY
          ? await verifyOTPSignup({phone, otpVerify: otp}).unwrap()
          : await verifyOTPResetPassword({phone, otpReset: otp}).unwrap();

      // const result = await verifyOTP({phone, otpReset: otp}).unwrap();
      console.log('Verify OTP successfully:', result);

      // Navigate to next screen based on resendType
      if (resendType === ETokenTypes.OTP_RESET) {
        navigate(RouteName.UPDATE_PASSWORD, {phone});
      } else {
        navigate(RouteName.LOGIN);
      }
    } catch (error) {
      console.log('Failed to verify OTP:', error);
      onShowSnackBar();
    }
  };

  const hasErrorOTP = () => {
    return otp.length !== 6;
  };

  const handleResendOTP = async () => {
    // Logic to resend OTP
    setResendDisabled(true);
    setCountdown(30);
    // Start countdown timer
    const intervalId = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(intervalId);
          setResendDisabled(false);
        }
        return prev - 1;
      });
    }, 1000);

    try {
      const resultResend = await resendOTP({phone, resendType}).unwrap();
      console.log('Resend OTP successfully:', resultResend);
    } catch (error) {
      console.log('Failed to resend OTP:', error);
    }
  };

  useEffect(() => {
    if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [countdown]);

  return (
    <Container style={styles.container}>
      <Title style={styles.title}>Xác thực OTP</Title>
      <TextInput
        style={styles.input}
        label="Mã OTP"
        value={otp}
        onChangeText={setOTP}
        keyboardType="numeric"
        error={otp !== '' && hasErrorOTP()}
      />
      {otp !== '' && hasErrorOTP() ? (
        <HelperText
          type="error"
          visible={hasErrorOTP()}
          style={styles.helperText}>
          Mã OTP không hợp lệ!
        </HelperText>
      ) : null}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleVerifyOTP}
        disabled={isLoading || !otp || hasErrorOTP()}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Tiếp tục</Text>
        )}
      </Button>

      <Button
        style={styles.button}
        onPress={handleResendOTP}
        disabled={resendDisabled}>
        Gửi lại mã {resendDisabled ? `(${countdown}s)` : ''}
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
        OTP không hợp lệ hoặc đã hết hạn!
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

export default VerifyOTPScreen;
