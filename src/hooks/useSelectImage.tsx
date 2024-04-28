/* eslint-disable no-useless-escape */
import {useState} from 'react';
import ImagePicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import {TMedia} from '../types/media.type';

// import {
//   useUploadChatMediaMutation,
//   useUploadMediaMutation,
// } from 'api/post/post.api';

type TSelectImage = {
  pickerConfig?: Options;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
};
export const useSelectImage = ({
  pickerConfig,
  multiple,
  maxFiles,
  maxFileSize,
}: TSelectImage = {}) => {
  const [image, setImage] = useState<ImageOrVideo>();
  const [images, setImages] = useState<ImageOrVideo[]>();
  //   const [upload, {isLoading, isSuccess, isError}] = useUploadMediaMutation();
  //   const [uploadChatImage] = useUploadChatMediaMutation();

  const openLibrary = async () => {
    try {
      const data: any = await ImagePicker.openPicker({
        mediaType: 'photo',
        width: 400, // Add this
        height: 400,
        compressImageQuality: 0.8,
        clean: true,
        cropping: true,
        multiple,
        maxFiles,
        ...pickerConfig,
      });
      if (maxFiles && multiple && data.length > maxFiles) {
        return;
      }
      if (maxFileSize) {
        let isFileSizeError = false;
        if (multiple) {
          isFileSizeError = data.some(
            (file: any) => file.size > maxFileSize * 10,
          );
        } else {
          isFileSizeError = data.size > maxFileSize * 10;
        }

        if (isFileSizeError) {
          return;
        }
      }

      multiple ? setImages(data) : setImage(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const openCameras = async () => {
    try {
      const data: any = await ImagePicker.openCamera({
        mediaType: 'photo',
        width: 400, // Add this
        height: 400,
        compressImageQuality: 0.8,
        clean: true,
        // cropping: true,
        // multiple,
        maxFiles,
        ...pickerConfig,
      });
      if (maxFileSize) {
        let isFileSizeError = false;
        isFileSizeError = data.size > maxFileSize * 10;
        if (isFileSizeError) {
          return;
        }
      }
      setImages([data]);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const selectMultiImage = async () => {
    try {
      const data: any = await ImagePicker.openPicker({
        compressImageQuality: 0.5,
        clean: true,
        cropping: false,
        multiple: true,
        maxFiles,
        ...pickerConfig,
      });

      setImages(pre => data);

      return data as TMedia[];
    } catch (error) {
      console.log(error);
    }
  };

  //   if (isLoading) {
  //     showLoading();
  //   }
  //   if (isSuccess) {
  //     hideLoading();
  //   }
  //   if (isError) {
  //     hideLoading();
  //   }

  //   const handleUpload = async (data = image) => {
  //     if (!data) {
  //       return;
  //     }
  //     try {
  //       const isHEIC =
  //         data.sourceURL?.endsWith('.heic') || data.sourceURL?.endsWith('.HEIC');
  //       const imageData = new FormData();

  //       imageData.append('file', {
  //         uri: data.path,
  //         name: data.path.replace(/^.*[\\\/]/, ''),
  //         fileName: data.path.replace(/^.*[\\\/]/, ''),
  //         width: data.width / 5,
  //         height: data.height / 5,
  //         size: data.size,
  //         path: data.path,
  //         type:
  //           Platform.OS === 'ios'
  //             ? `image/${
  //                 isHEIC
  //                   ? data.path.split('.')[0] + '.JPG'
  //                   : data.path.split('.').pop()
  //               }`
  //             : data.mime,
  //       });

  //       const response = await upload(imageData).unwrap();
  //       return response;
  //     } catch (error: any) {
  //       reactotron.log?.('error', JSON.stringify(error, null, 2));
  //       toast(error?.data?.message, EToastType.ERROR);
  //       return undefined;
  //     }
  //   };

  //   const handleUploadMultiple = async (images: any) => {
  //     if (!images?.length || !images) {
  //       return;
  //     }
  //     try {
  //       const updateArr: any = [];

  //       images?.forEach((image: any) => {
  //         const isHEIC =
  //           image.sourceURL?.endsWith('.heic') ||
  //           image.sourceURL?.endsWith('.HEIC');
  //         const imageData = new FormData();
  //         imageData.append('file', {
  //           uri: image.path,
  //           name: image.path.replace(/^.*[\\\/]/, ''),
  //           fileName: image.path.replace(/^.*[\\\/]/, ''),
  //           width: image.width,
  //           height: image.height,
  //           size: image.size,
  //           path: image.path,
  //           type:
  //             Platform.OS === 'ios'
  //               ? `image/${
  //                   isHEIC
  //                     ? image.path.split('.')[0] + '.JPG'
  //                     : image.path.split('.').pop()
  //                 }`
  //               : image.mime,
  //         });
  //         updateArr.push(uploadChatImage(imageData).unwrap());
  //       });

  //       const response = await Promise.all(updateArr);

  //       return response.map(res => res?.data?.dataValues?.id);
  //     } catch (error: any) {
  //       reactotron.log?.('error', JSON.stringify(error, null, 2));
  //       toast(error?.data?.message, EToastType.ERROR);
  //       return undefined;
  //     }
  //   };

  return {
    paths: images?.map(image => {
      return {
        url: image?.path,
      };
    }),
    path: image?.path,
    openLibrary,
    // handleUpload,
    // handleUploadMultiple,
    selectMultiImage,
    // isLoading,
    openCameras,
  };
};
