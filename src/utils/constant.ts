import RouteName from '../navigation/RouteName';

export const DEFAULT_AVATAR = require('../assets/images/default_avatar.jpg');

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
