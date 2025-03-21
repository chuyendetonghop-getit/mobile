import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  touchable?: boolean;
  onPress?: () => void;
};

const Section = ({children, style, touchable, onPress}: Props) => {
  return touchable ? (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[styles.container, style]}>{children}</View>
  );
};

export default Section;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
