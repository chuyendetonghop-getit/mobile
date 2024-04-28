import React from 'react';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Modal, Portal} from 'react-native-paper';

export type RootModalProps = {
  children?: React.ReactNode;
  visible: boolean;
  onDismiss: () => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

export type BaseModalComponentProps = Omit<
  RootModalProps,
  'children' | 'style' | 'contentContainerStyle'
>;

const RootModal = ({
  children,
  visible,
  onDismiss,
  style,
  contentContainerStyle,
}: RootModalProps) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.content, style]}
        contentContainerStyle={[styles.container, contentContainerStyle]}>
        {children}
      </Modal>
    </Portal>
  );
};

export default RootModal;

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', padding: 16},
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
