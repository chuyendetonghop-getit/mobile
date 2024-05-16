import {TLocation} from './location.type';
import {TResponse} from './response.type';

export type UserData = {
  _id: string;
  name: string;
  phone: string;
  verify: boolean;
  role: string;
  email?: string;
  geoLocation: {
    location: TLocation | null;
    radius: number;
  };
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

export interface Packages {
  packageBenefits: BenefitPackage[];
  id: number;
  name: string;
  priceUsd: number;
  priceEur: number;
  isDefault: boolean;
  isActive: boolean;
  packageBenefitIds: any[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  packagesSubcribed?: PackagesSubcribed[];
  PackagesSubscribed?: PackagesSubcribed;
}
export interface BenefitPackage {
  id: number;
  name: string;
  nameInDutch: string;
  slug: string;
  module: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface PackagesSubcribed {
  id: number;
  userId: number;
  packageId: number;
  dueDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface SignInWithEmailPasswordRequest {
  email: string;
  password: string;
  deviceName: string;
}
export type SignInWithEmailPasswordResponse = TResponse<{
  user: UserData;
  token: TokenValue;
  data: {
    inactiveTime?: string;
    email?: string;
    hash?: string;
  };
}>;

export interface SignInSocialRequest {
  token: string;
  deviceName: string;
}
export type SignInSocialResponse = TResponse<{
  user?: UserData & {dataValues?: UserData};
  token?: TokenValue;
  data: {
    inactiveTime?: string;
    email?: string;
    hash?: string;
  };
}>;

// export type EditProfileRequest = Partial<
//   Omit<RegisterRequest, 'password' | 'confirmPassword'>
// > & {
//   description?: string;
//   rankId?: string; //enum level
//   address?: string;
//   // phone?: string;
//   routineFrequencies?: string[];
// };

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
