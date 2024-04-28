import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/baseApi';
import apiPath from '../../utils/apiPath';

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],

  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    uploadMedia: builder.mutation<{}, FormData>({
      query: body => ({
        url: apiPath.uploadMedia,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
});

export const {useUploadMediaMutation} = postApi;
