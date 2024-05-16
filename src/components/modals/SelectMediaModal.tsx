import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Divider, MD2Colors, Text} from 'react-native-paper';

import Section from 'components/Section';
import {useSelectImage} from 'hooks/useSelectImage';
import {appHeight, appWidth} from 'themes/spacing';
import {TMedia} from 'types/media.type';
import uploadCloudinaryImage from 'utils/uploadImage';
import RootModal, {BaseModalComponentProps} from './RootModal';

type Props = BaseModalComponentProps & {
  onSelectMedia: (mediaURL: string[]) => void;
};

const SelectMediaModal = ({onSelectMedia, onDismiss, visible}: Props) => {
  const {openCameras, selectMultiImage} = useSelectImage({
    multiple: true,
    maxFiles: 10,
    // maxFileSize: 10,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onLibrary = async () => {
    const dataImages = await selectMultiImage();

    console.log('Start upload images to cloudinary by library');
    setIsLoading(true);

    if (!dataImages || dataImages.length === 0) {
      console.log('NO DATA IMAGES');
      setIsLoading(false);
      onDismiss();
      return;
    } else {
      const imagesUrls = await uploadCloudinaryImage(dataImages);

      // console.log('IMAGES URLS CLOUNDINARY->', imagesUrls);

      // onSelectMedia(dataImages.map((item: any) => item.path));
      if (!imagesUrls) {
        setIsLoading(false);
        return;
      }
      onSelectMedia(imagesUrls);
      onDismiss();
    }
    setIsLoading(false);
  };

  const onCamera = async () => {
    const objectImage = (await openCameras()) as TMedia;
    // onDismiss();
    // console.log('DATA CAM ->', dataURLs);

    // onSelectMedia([dataURLs.path]);
    console.log('Start upload images to cloudinary by Camera');
    setIsLoading(true);

    if (
      !objectImage ||
      Object.keys(objectImage).length === 0 ||
      !objectImage.path
    ) {
      console.log('NO DATA IMAGES');
      setIsLoading(false);
      onDismiss();
      return;
    } else {
      const imagesUrls = await uploadCloudinaryImage([objectImage]);

      if (!imagesUrls) {
        setIsLoading(false);
        return;
      }
      onSelectMedia(imagesUrls);
      onDismiss();
    }
    setIsLoading(false);
  };

  return (
    <RootModal
      visible={visible}
      onDismiss={onDismiss}
      // style={styles.modal}
      contentContainerStyle={styles.contentContainer}>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={MD2Colors.amber400}
          size="large"
          style={styles.indicator}
        />
      ) : (
        <View style={styles.container}>
          <Section style={styles.options}>
            <TouchableOpacity style={styles.optionItem} onPress={onLibrary}>
              <Text style={styles.text}>Thư viện</Text>
            </TouchableOpacity>

            <Divider />

            <TouchableOpacity style={styles.optionItem} onPress={onCamera}>
              <Text style={styles.text}>Máy ảnh</Text>
            </TouchableOpacity>
          </Section>

          <View style={styles.divider} />

          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.options}
            onPress={() => {
              // console.log('CANCEL SELECT MEDIA');
              onDismiss();
            }}>
            <Text variant="bodyLarge" style={[styles.text, styles.cancelText]}>
              Huỷ
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </RootModal>
  );
};

export default SelectMediaModal;

const styles = StyleSheet.create({
  modal: {
    paddingVertical: 0,
  },
  contentContainer: {
    // flex: 1,
    width: appWidth - 32,
    position: 'absolute',
    bottom: 10,
    padding: 0,
    backgroundColor: 'transparent',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    marginBottom: appHeight / 2 - 10,
  },
  container: {},
  options: {
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  optionItem: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 16,
    width: '100%',
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  cancelText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
