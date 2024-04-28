import {TResponseUploadImage} from './../types/media.type';
// A function that uploads an image to the server and returns the URL of the uploaded image.
// Cloudinary is used as the image hosting service.

import {TMedia} from '../types/media.type';

const uploadCloudinaryImage = async (images: TMedia[]) => {
  if (!images?.length || !images) {
    // console.log('NO DATA IMAGES 2');
    return;
  }

  //   console.log('IN FC UPLOAD CLOUDINARY ->', images);

  try {
    const uploadPromises = images.map(async image => {
      const data = new FormData();
      const source = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(/^.*[\\\/]/, ''),
      };

      data.append('file', source);
      data.append('cloud_name', 'anhkieu303252');
      data.append('upload_preset', 'getit_project');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/anhkieu303252/image/upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        },
      );

      const jsonResponse = (await response.json()) as TResponseUploadImage;

      console.log('RESPONSE UPLOAD ->', jsonResponse.secure_url);

      return jsonResponse.secure_url;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return uploadedImages;
  } catch (error) {
    console.log('Error uploading images: ', error);
  }
};

export default uploadCloudinaryImage;
