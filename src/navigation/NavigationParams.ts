import {
  EChatDetailScreenTypes,
  EListPostScreenTypes,
  EPostScreenTypes,
  ETokenTypes,
} from 'utils/enum';

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

export type HomeScreenParams = {};

export type PostScreenParams = {
  mode?: EPostScreenTypes;
  postId?: string;
};

export type DetailPostScreenParams = {
  postId: string;
};

export type ListPostScreenParams = {
  initMode: EListPostScreenTypes;
  categoryId?: string;
};

export type PostManagementScreenParams = {};

export type ChatDetailScreenParams = {
  mode: EChatDetailScreenTypes;
  conversationId?: string;
};
