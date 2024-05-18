// Custom header component in react native
import {goBack} from 'navigation/NavigationUtils';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {IconButton, MD3Colors, Text} from 'react-native-paper';
import {appWidth} from 'themes/spacing';

type HeaderProps = {
  style?: StyleProp<ViewStyle>;
  hasBackButton?: boolean;
  onBack?: () => void;
  headerTitle?: string;
  tail?: React.ReactNode;
  onTailMore?: () => void;
  onTailDone?: () => void;
};

const Header = ({
  style,
  hasBackButton,
  onBack,
  headerTitle,
  tail,
  onTailMore,
  onTailDone,
}: HeaderProps) => {
  const renderTail = () => {
    if (tail) {
      return <View style={styles.right}>{tail}</View>;
    }
    if (onTailMore) {
      return <IconButton icon="dots-vertical" size={24} onPress={onTailMore} />;
    }
    if (onTailDone) {
      return <IconButton icon="check" size={24} onPress={onTailDone} />;
    }
    return null;
  };
  return (
    <View style={[styles.container, style]}>
      {hasBackButton ? (
        <IconButton
          icon="arrow-left"
          iconColor="#FFFFFF"
          size={32}
          style={styles.left}
          onPress={() => (onBack ? onBack() : goBack())}
        />
      ) : null}
      {headerTitle ? <Text style={styles.center}>{headerTitle}</Text> : null}
      <View style={styles.right}>{renderTail()}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: MD3Colors.primary90,
    paddingTop: 0,
    marginBottom: 16,
    marginTop: 0,
    height: 64,
    width: appWidth,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    // backgroundColor: 'yellow',
    position: 'absolute',
    left: -3,
  },
  center: {
    fontWeight: 'bold',
  },
  right: {
    // backgroundColor: 'blue',
    position: 'absolute',
    right: 0,
    top: 2,
    height: 64,
  },
});
