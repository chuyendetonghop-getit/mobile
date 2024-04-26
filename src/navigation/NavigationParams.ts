import {ETokenTypes} from '../utils/enum';

export type LoginScreenParams = undefined;
export type SignupScreenParams = undefined;
export type ResetPassScreenParams = undefined;
export type VerifyOTPScreenParams = {
  phone: string;
  resendType: ETokenTypes;
};
export type UpdatePasswordScreenParams = {
  phone: string;
};

export type DetailPostScreenParams = {
  postId: string;
};
