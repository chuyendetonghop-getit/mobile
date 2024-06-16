import RouteName from '../navigation/RouteName';

export const DEFAULT_AVATAR = require('../assets/images/default_avatar.jpg');

export const DEFAULT_AVARTAR_URL =
  'https://res.cloudinary.com/anhkieu303252/image/upload/v1718519688/default_avatar_eyua30.jpg';

export const DEFAULT_FALLBACK_IMAGE =
  'https://res.cloudinary.com/anhkieu303252/image/upload/v1718533086/fallback_gdmm2s.webp';

export const MAPPED_ROUTE_NAME = {
  [RouteName.LOGIN]: 'Đăng nhập',
  [RouteName.SIGNUP]: 'Đăng ký',
  [RouteName.RESET_PASSWORD]: 'Đặt lại mật khẩu',
  [RouteName.VERIFY_OTP]: 'Xác thực OTP',
  [RouteName.UPDATE_PASSWORD]: 'Cập nhật mật khẩu',
  [RouteName.MAIN_TAB]: 'MainTab',
  [RouteName.HOME]: 'Trang chủ',
  [RouteName.POST]: 'Đăng tin',
  [RouteName.CLONE_POST]: 'Đăng tin',
  [RouteName.CHAT]: 'Trò chuyện',
  [RouteName.ME]: 'Tôi',
  [RouteName.SEARCH]: 'Tìm kiếm',
  [RouteName.DETAIL_POST]: 'Chi tiết tin đăng',
};

export const DEFAULT_LOCATION = {
  lat: 21.028511,
  lon: 105.804817,
};

export const MIN_RADIUS = 5;
export const MAX_RADIUS = 50;
export const RADIUS_STEP = 5;
