// import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackScreenProps} from '@react-navigation/stack';

import RootStackParamList from './RootStackParamList';
import RouteName from './RouteName';

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RouteName.LOGIN
>;

export type SignupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RouteName.SIGNUP
>;

export type ResetPassScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RouteName.RESET_PASSWORD
>;

export type VerifyOTPScreenProps = StackScreenProps<
  RootStackParamList,
  RouteName.VERIFY_OTP
>;

export type UpdatePasswordScreenProps = StackScreenProps<
  RootStackParamList,
  RouteName.UPDATE_PASSWORD
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RouteName.HOME
>;

export type PostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RouteName.POST
>;

export type DetailPostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RouteName.DETAIL_POST
>;

export type ListPostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RouteName.LIST_POST
>;

export type PostManagementScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RouteName.MANAGER_POST
>;
