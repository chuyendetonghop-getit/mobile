import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
};

const Container = ({children, style, scrollable}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      {scrollable ? (
        <ScrollView style={[styles.content, style]}>{children}</ScrollView>
      ) : (
        <View style={[styles.content, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    // justifyContent: 'center',
  },
});

export default Container;
