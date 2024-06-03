import React, {useEffect, useMemo, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Appbar, Button, MD3Colors, RadioButton} from 'react-native-paper';

import {appWidth} from 'themes/spacing';
import {EReportReasonTypes, reportReasonTypeToLabel} from 'utils/enum';
import RootModal, {BaseModalComponentProps} from './RootModal';
import {useReportPostMutation} from 'api/post.api';

type Props = BaseModalComponentProps & {
  postId: string;
};

const ReportModal = ({onDismiss, visible, postId}: Props) => {
  const [reportFn, {isLoading}] = useReportPostMutation();

  const [selectedReportReason, setSelectedReportReason] =
    useState<EReportReasonTypes>();
  // const [isReporting, setIsReporting] = useState(false);

  const reportItems = useMemo(() => {
    // map report reason type to label
    return Object.keys(reportReasonTypeToLabel).map(key => ({
      key,
      label:
        reportReasonTypeToLabel[key as keyof typeof reportReasonTypeToLabel],
    }));
  }, []);

  const onReport = async () => {
    try {
      await reportFn({
        postId,
        reason: selectedReportReason as EReportReasonTypes,
      }).unwrap();

      onDismiss();
      Alert.alert('Báo cáo thành công', 'Cảm ơn bạn đã báo cáo vấn đề này');
    } catch (error) {
      console.log('Failed to report post:', error);
      Alert.alert('Báo cáo thất bại', 'Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  useEffect(() => {
    // reset selected report reason when modal is closed
    if (!visible) {
      setSelectedReportReason(undefined);
    }
  }, [visible]);

  return (
    <RootModal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Tin rao này có vấn đề gì?" />
          <Appbar.Action icon="close" size={30} onPress={onDismiss} />
        </Appbar.Header>

        <RadioButton.Group
          onValueChange={reportValue => {
            console.log('reportValue', reportValue);
            setSelectedReportReason(reportValue as EReportReasonTypes);
          }}
          value={selectedReportReason ?? ''}>
          <View style={styles.wrapperReportItems}>
            {
              // render report items
              reportItems.map(item => (
                <View key={item.key} style={styles.reportItem}>
                  <RadioButton.Item
                    label={item.label}
                    value={item.key}
                    style={styles.reportItemRadio}
                  />
                </View>
              ))
            }
          </View>
        </RadioButton.Group>

        <Button
          mode="contained"
          disabled={!selectedReportReason || isLoading}
          onPress={onReport}
          loading={isLoading}
          style={styles.sendReport}>
          Gửi báo cáo
        </Button>
      </View>
    </RootModal>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  modal: {
    paddingVertical: 0,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    backgroundColor: 'white',
    width: appWidth,
    justifyContent: 'flex-start',
  },

  container: {},

  header: {
    backgroundColor: MD3Colors.primary90,
  },
  wrapperReportItems: {
    marginTop: 16,
    marginBottom: 16,
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  reportItemRadio: {
    flexDirection: 'row-reverse',
    width: appWidth,
    // backgroundColor: 'red',
  },
  sendReport: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
