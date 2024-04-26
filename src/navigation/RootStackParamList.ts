import {
  DetailPostScreenParams,
  LoginScreenParams,
  PostScreenParams,
  ResetPassScreenParams,
  SignupScreenParams,
  UpdatePasswordScreenParams,
  VerifyOTPScreenParams,
} from './NavigationParams';
import RouteName from './RouteName';

type RootStackParamList = {
  [RouteName.LOGIN]: LoginScreenParams;
  [RouteName.SIGNUP]: SignupScreenParams;
  [RouteName.RESET_PASSWORD]: ResetPassScreenParams;
  [RouteName.VERIFY_OTP]: VerifyOTPScreenParams;
  [RouteName.UPDATE_PASSWORD]: UpdatePasswordScreenParams;
  [RouteName.POST]: PostScreenParams;
  [RouteName.DETAIL_POST]: DetailPostScreenParams;
};

export default RootStackParamList;
