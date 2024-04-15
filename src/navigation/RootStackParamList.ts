import {
  LoginScreenParams,
  ResetPassScreenParams,
  SignupScreenParams,
} from './NavigationParams';
import RouteName from './RouteName';

type RootStackParamList = {
  [RouteName.LOGIN]: LoginScreenParams;
  [RouteName.SIGNUP]: SignupScreenParams;
  [RouteName.RESET_PASSWORD]: ResetPassScreenParams;
};

export default RootStackParamList;
