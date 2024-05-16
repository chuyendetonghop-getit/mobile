import {createApi} from '@reduxjs/toolkit/query/react';

import {axiosBaseQuery} from 'services/baseApi';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from 'types/auth/auth.type';
import apiPath from 'utils/apiPath';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: apiPath.signInWithEmailPassword,
        method: 'POST',
        body,
      }),
    }),

    signUp: builder.mutation<SignupResponse, SignupRequest>({
      query: body => ({
        url: apiPath.signUpUrl,
        method: 'POST',
        body,
      }),
    }),

    verifySignup: builder.mutation({
      query: body => ({
        url: apiPath.verifySignUp,
        method: 'POST',
        body,
      }),
    }),

    resendOTP: builder.mutation({
      query: body => ({
        url: apiPath.resendVerifyCode,
        method: 'POST',
        body,
      }),
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: body => ({
        url: apiPath.forgotPassword,
        method: 'POST',
        body,
      }),
    }),

    verifyForgotPassword: builder.mutation({
      query: body => ({
        url: apiPath.verifyResetPassword,
        method: 'POST',
        body,
      }),
    }),

    updatePassword: builder.mutation({
      query: body => ({
        url: apiPath.updatePassword,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifySignupMutation,
  useResendOTPMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordMutation,
  useUpdatePasswordMutation,
} = authApi;
