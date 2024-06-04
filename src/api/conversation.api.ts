import {createApi} from '@reduxjs/toolkit/query/react';

import {axiosBaseQuery} from 'services/baseApi';
import {
  GetDetailConversationParams,
  GetDetailConversationResponse,
  GetListConversationParams,
  GetListConversationResponse,
} from 'types/conversation.type';
import apiPath from 'utils/apiPath';

export const conversationApi = createApi({
  reducerPath: 'conversationApi',
  tagTypes: ['Posts'],

  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getConversations: builder.query<
      GetListConversationResponse,
      GetListConversationParams
    >({
      query: params => ({
        url: apiPath.bareConversation,
        method: 'GET',
        params,
      }),
    }),

    getDetailConversation: builder.query<
      GetDetailConversationResponse,
      GetDetailConversationParams
    >({
      query: paramsX => ({
        url: apiPath.bareConversation + `/${paramsX.conversationId}`,
        method: 'GET',
        params: {},
      }),
    }),
  }),
});

export const {useGetConversationsQuery, useGetDetailConversationQuery} =
  conversationApi;
