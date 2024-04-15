export type LoginScreenParams = undefined;
export type SignupScreenParams = undefined;
export type ResetPassScreenParams = undefined;

export type VerifyScreenParams = {
  email?: string;
  //   type: EVerifyOTPScreenType;
  hash?: string;
};
export type ConfirmUnlockParams = {
  email?: string;
  hash?: string;
  time?: string;
};

export type AddressDetailScreenParams = {
  //   address?: AddressData;
  //   type: EAddressDetailScreenType;
  callback?: () => void;
  isSetToDefault?: boolean;
  //   addressType?: EAddressType;
};

export type JoinRequestScreenParams = {
  roomId: number;
};
