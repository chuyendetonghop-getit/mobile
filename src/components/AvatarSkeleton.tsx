import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const AvatarSkeleton = ({size}: {size: number}) => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size,
        }}
      />
    </SkeletonPlaceholder>
  );
};

export default AvatarSkeleton;

const styles = StyleSheet.create({});
