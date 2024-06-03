export enum EUserRoles {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export enum ETokenTypes {
  OTP_VERIFY = 'otpVerify',
  OTP_RESET = 'otpReset',
}

export enum EPostScreenTypes {
  CREATE = 'create',
  UPDATE = 'update',
}

export enum EListPostScreenTypes {
  SEARCH = 'search',
  VIEW = 'view',
}

export enum EChatDetailScreenTypes {
  CREATE = 'create',
  VIEW = 'view',
}

// enum for report post
export enum EReportReasonTypes {
  FRAUD = 'fraud',
  DUPLICATE = 'duplicate',
  ITEM_SOLD = 'itemSold',
  UNABLE_TO_CONTACT = 'unableToContact',
  INACCURATE_CONTENT = 'inaccurateContent',
  COUNTERFEIT_GOODS = 'counterfeitGoods',
  ITEM_DAMAGED_AFTER_PURCHASE = 'itemDamagedAfterPurchase',
}

// map report reason type to label

export const reportReasonTypeToLabel = {
  [EReportReasonTypes.FRAUD]: 'Lừa đảo',
  [EReportReasonTypes.DUPLICATE]: 'Trùng lặp',
  [EReportReasonTypes.ITEM_SOLD]: 'Hàng đã bán',
  [EReportReasonTypes.UNABLE_TO_CONTACT]: 'Không liên lạc được',
  [EReportReasonTypes.INACCURATE_CONTENT]: 'Thông tin không đúng thực tế',
  [EReportReasonTypes.COUNTERFEIT_GOODS]: 'Hàng giả, hàng nhái, hàng dựng',
  [EReportReasonTypes.ITEM_DAMAGED_AFTER_PURCHASE]: 'Hàng hư hỏng sau khi mua',
};
