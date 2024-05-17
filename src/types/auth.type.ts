import {TGeoLocation} from './location.type';
import {TResponse} from './response.type';

export type UserData = {
  _id: string;
  name: string;
  phone: string;
  verify: boolean;
  role: string;
  email?: string;
  avatar?: string;
  geoLocation?: TGeoLocation;
  createdAt: string;
  updatedAt: string;
};

export type User = UserData & {
  accessToken: string;
};

export type SignupRequest = {
  name: string;
  phone: string;
  password: string;
};

export type SignupResponse = TResponse<User>;

export type VerifySignupRequest = {
  phone: string;
  otpVerify: string;
};

export type VerifySignupResponse = TResponse<User>;

export type LoginRequest = {
  phone: string;
  password: string;
};

export type LoginResponse = TResponse<User>;

export type ForgotPasswordRequest = {
  phone: string;
};

export type ForgotPasswordResponse = TResponse;

// --------OLD CODE--------

export type RecoverPasswordDefaultValue = {
  email: string;
};

export type ResetPasswordDefaultValue = {
  newPassword: string;
  confirmPassword: string;
};

export type TokenValue = {
  accessToken: string;
  expires: number;
  refreshToken: string;
};

//RECOVER PASSWORD
export type RecoverPasswordRequest = {
  email: string;
};

export type RecoverPasswordResponse = TResponse<{
  message: string;
  data: string;
}>;

//RESET PASSWORD
export type ResetPasswordRequest = {
  hash: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordResponse = TResponse<{
  message: string;
}>;

//VERIFY CODE
export type VerifyCodeRequest = {
  otpCode: string;
  hash?: string;
};

export type SignUpResponse = TResponse<{
  data: string;
  message: string;
  user: UserData;
  token: TokenValue;
}>;

export type VerifyResetPasswordResponse = TResponse<{
  data: string;
  message: string;
}>;

export type VerifySignUpResponse = TResponse<{
  user: UserData;
  message: string;
}>;

export type VerifyActiveResponse = TResponse<{
  user: UserData;
  token: TokenValue;
  message: string;
}>;

export type ResendVerifyCodeResponse = VerifyResetPasswordResponse;

export type ResendVerifyCodeRequest = {
  hash?: string;
  //   type: EVerifyOTPScreenType;
};

export type DeleteProfileRequest = {
  password?: string;
};

export type UpdateUserRequest = Partial<
  Pick<UserData, 'name' | 'avatar' | 'geoLocation'>
> & {
  id: string;
};

export type UpdateUserResponse = TResponse<UserData>;
