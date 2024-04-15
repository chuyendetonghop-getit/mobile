import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../services/baseApi';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '../../types/auth/auth.type';
import apiPath from '../../utils/apiPath';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    signUp: builder.mutation<SignupResponse, SignupRequest>({
      query: body => ({
        url: apiPath.signUpUrl,
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: apiPath.signInWithEmailPassword,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useSignUpMutation, useLoginMutation} = authApi;
