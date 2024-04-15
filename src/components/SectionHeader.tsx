import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppText} from 'components';
import {getSize} from 'themes';
import colors from 'themes/colors';

interface Props {
  title: string;
}

const SectionHeader = ({title}: Props) => {
  return (
    <View>
      <AppText style={styles.header}>{title}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: getSize(20),
    fontWeight: '500',
    color: colors.BLACK,
    paddingBottom: getSize(12),
    paddingTop: getSize(24),
    backgroundColor: colors.WHITE,
  },
});

export default SectionHeader;
