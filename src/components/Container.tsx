import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{children}</View>
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
  },
});

export default Container;
