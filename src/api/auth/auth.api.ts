import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/baseApi';
import {SignUpResponse} from '../../types/auth/auth.type';
import apiPath from '../../utils/apiPath';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    signUp: builder.mutation<SignUpResponse, SignUpResponse>({
      query: body => ({
        url: apiPath.signUpUrl,
        method: 'POST',
        body,
      }),
    }),

    // login: builder.mutation<
    //   SignInWithEmailPasswordResponse,
    //   SignInWithEmailPasswordRequest
    // >({
    //   query: body => ({
    //     url: apiPath.signInWithEmailPassword,
    //     method: 'POST',
    //     body,
    //   }),
    // }),
  }),
});

export const {useSignUpMutation} = authApi;
