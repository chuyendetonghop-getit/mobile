import React, {useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, Text} from 'react-native';
import {
  Button,
  HelperText,
  Snackbar,
  TextInput,
  Title,
} from 'react-native-paper';
import {useUpdatePasswordMutation} from '../../api/auth/auth.api';
import Container from '../../components/Container';
import {UpdatePasswordScreenProps} from '../../navigation/NavigationProps';
import {navigate} from '../../navigation/NavigationUtils';
import RouteName from '../../navigation/RouteName';

const UpdatePasswordScreen = (props: UpdatePasswordScreenProps) => {
  const params = props.route.params;
  const phone = params.phone;

  const [updatePassword, {isLoading}] = useUpdatePasswordMutation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  // SnackBar state
  const [visible, setVisible] = React.useState(false);
  const onShowSnackBar = () => setVisible(true);
  const onHideSnackBar = () => setVisible(false);

  const handleUpdatePassword = async () => {
    try {
      const result = await updatePassword({
        phone,
        newPassword: password,
      }).unwrap();
      console.log('Update password successfully', result);

      // Navigate to login screen
      navigate(RouteName.LOGIN);
    } catch (error) {
      console.log('Failed to update password:', error);
      onShowSnackBar();
    }
  };

  const hasErrorsPassword = () => {
    return password.length < 6;
  };

  const hasErrorsConfirmPassword = () => {
    return confirmPassword.length < 6;
  };

  return (
    <Container>
      <Title style={styles.title}>Đặt mật khẩu mới</Title>

      <TextInput
        style={styles.input}
        label="Mật khẩu mới"
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

      <TextInput
        style={styles.input}
        label="Nhập lại mật khẩu mới"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={hideConfirmPassword}
        right={
          <TextInput.Icon
            icon={hideConfirmPassword ? 'eye-off' : 'eye'}
            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
          />
        }
      />
      {!!confirmPassword && hasErrorsConfirmPassword() ? (
        <HelperText
          type="error"
          visible={hasErrorsConfirmPassword()}
          style={styles.helperText}>
          Mật khẩu phải có ít nhất 6 ký tự
        </HelperText>
      ) : null}

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleUpdatePassword}
        disabled={
          isLoading ||
          !password ||
          !confirmPassword ||
          hasErrorsPassword() ||
          hasErrorsConfirmPassword() ||
          password !== confirmPassword
        }>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Hoàn tất</Text>
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
        Đặt lại mật khẩu thất bại!
      </Snackbar>
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

export default UpdatePasswordScreen;
