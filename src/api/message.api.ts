import {createApi} from '@reduxjs/toolkit/query/react';

import {axiosBaseQuery} from 'services/baseApi';
import {GetListMessageParams, GetListMessageResponse} from 'types/message.type';
import apiPath from 'utils/apiPath';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  tagTypes: ['Messages'],

  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getMessagesByConversationId: builder.query<
      GetListMessageResponse,
      GetListMessageParams
    >({
      query: paramsX => ({
        url: apiPath.bareMessage + `/${paramsX.receiverId}/${paramsX.postId}`,
        method: 'GET',
        params: {
          page: paramsX.page,
          limit: paramsX.limit,
        },
      }),
    }),
  }),
});

export const {useGetMessagesByConversationIdQuery} = messageApi;
