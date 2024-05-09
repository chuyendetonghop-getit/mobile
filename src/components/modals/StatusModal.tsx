import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

import {appWidth} from '../../themes/spacing';
import {statusPost} from '../../utils/statusPost';
import RootModal, {BaseModalComponentProps} from './RootModal';
import {TStatusItem} from '../../types/status.type';

type Props = BaseModalComponentProps & {
  onSelectStatus: (status: TStatusItem) => void;
};

const StatusModal = ({onSelectStatus, onDismiss, visible}: Props) => {
  return (
    <RootModal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header} variant="bodyLarge">
        Chọn tình trạng
      </Text>
      <View style={styles.container}>
        {statusPost.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log('Pressed', item.name_en);
              onSelectStatus(item);
              onDismiss();
            }}
            style={styles.categoryItem}>
            <Text numberOfLines={2} style={styles.categoryItemTextHeader}>
              {item.name}
            </Text>
            <Text numberOfLines={2} style={styles.categoryItemText}>
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </RootModal>
  );
};

export default StatusModal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'pink',
  },
  contentContainer: {
    width: appWidth - 32,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  categoryItem: {
    width: '100%',
    marginVertical: 5,
    padding: 5,
    // borderRadius: 8,
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: '#d2d2d2',
  },
  categoryItemTextHeader: {
    fontSize: 18,
    textAlign: 'left',
  },
  categoryItemText: {
    fontSize: 14,
    textAlign: 'left',
    color: 'gray',
  },
});
