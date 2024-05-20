import {PostManagementScreen} from 'screens/PostManagementScreen';
import {
  DetailPostScreenParams,
  HomeScreenParams,
  ListPostScreenParams,
  LoginScreenParams,
  PostManagementScreenParams,
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
  [RouteName.HOME]: HomeScreenParams;
  [RouteName.POST]: PostScreenParams;
  [RouteName.DETAIL_POST]: DetailPostScreenParams;
  [RouteName.LIST_POST]: ListPostScreenParams;
  [RouteName.MANAGER_POST]: PostManagementScreenParams;
};

export default RootStackParamList;
