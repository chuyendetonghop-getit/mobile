import {createApi} from '@reduxjs/toolkit/query/react';

import {axiosBaseQuery} from 'services/baseApi';
import {
  GetListPostParams,
  GetListPostResponse,
  TPostCreate,
} from 'types/post.type';
import apiPath from 'utils/apiPath';

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

    createPost: builder.mutation<{}, TPostCreate>({
      query: body => ({
        url: apiPath.createPost,
        method: 'POST',
        body,
      }),
    }),

    getPosts: builder.query<GetListPostResponse, GetListPostParams>({
      query: params => ({
        url: apiPath.barePost,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {useUploadMediaMutation, useCreatePostMutation, useGetPostsQuery} =
  postApi;
