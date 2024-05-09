import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon, MD3Colors, Text} from 'react-native-paper';

import RootModal, {BaseModalComponentProps} from './RootModal';
import {appWidth} from '../../themes/spacing';
import {category} from '../../utils/category';

type Props = BaseModalComponentProps & {
  onSelectCategory: (cat_id: string) => void;
};

const CategoryModal = ({onSelectCategory, onDismiss, visible}: Props) => {
  return (
    <RootModal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header} variant="bodyLarge">
        Chọn một phân loại
      </Text>
      <View style={styles.container}>
        {category.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log('Pressed', item.cat_id);
              onSelectCategory(item.cat_id);
              onDismiss();
            }}
            style={styles.categoryItem}>
            <Icon
              source={item.cat_icon}
              color={MD3Colors.neutralVariant80}
              size={48}
            />
            <Text numberOfLines={2} style={styles.categoryItemText}>
              {item.cat_name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </RootModal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: (appWidth - 64) / 3 - 16,
    marginVertical: 5,
    padding: 5,
    borderRadius: 8,
  },
  categoryItemText: {
    fontSize: 14,
    textAlign: 'center',
    width: (appWidth - 32) / 3 - 16,
    // backgroundColor: 'green',
  },
});
