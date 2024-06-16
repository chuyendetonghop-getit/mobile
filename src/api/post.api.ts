import {createApi} from '@reduxjs/toolkit/query/react';

import {axiosBaseQuery} from 'services/baseApi';
import {
  GetDetailPostParams,
  GetDetailPostResponse,
  GetListPostParams,
  GetListPostResponse,
  GetMyPostRequest,
  GetMyPostResponse,
  TPostCreate,
  TReportCreate,
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

    getDetailPost: builder.query<GetDetailPostResponse, GetDetailPostParams>({
      query: paramsX => ({
        url: apiPath.barePost + `/${paramsX.postId}`,
        method: 'GET',
        params: {
          lat: paramsX.lat,
          lon: paramsX.lon,
        },
      }),
    }),

    getMyPosts: builder.query<GetMyPostResponse, GetMyPostRequest>({
      query: params => ({
        url: apiPath.myPost,
        method: 'GET',
        params,
      }),
    }),

    deletePost: builder.mutation<{}, {id: string}>({
      query: ({id}) => ({
        url: apiPath.barePost + `/${id}`,
        method: 'DELETE',
      }),
    }),

    updatePost: builder.mutation<{}, {id: string; body: Partial<TPostCreate>}>({
      query: ({id, body}) => ({
        url: apiPath.barePost + `/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    reportPost: builder.mutation<{}, TReportCreate>({
      query: ({postId, reason}) => ({
        url: apiPath.bareReport,
        method: 'POST',
        body: {
          postId,
          reason,
        },
      }),
    }),
  }),
});

export const {
  useUploadMediaMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useGetDetailPostQuery,
  useGetMyPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useReportPostMutation,
} = postApi;
