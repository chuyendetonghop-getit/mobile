// import {NavigationProp} from '@react-navigation/native';
import RootStackParamList from './RootStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RouteName from './RouteName';

export type LoginScreenProps = {
  navigation: NativeStackScreenProps<RootStackParamList, RouteName.LOGIN>;
};

// export type SignupScreenProps = {
//   navigation: NavigationProp<RootStackParamList, 'Signup'>;
// };

export type SignupScreenProps = {
  navigation: NativeStackScreenProps<RootStackParamList, RouteName.SIGNUP>;
};
