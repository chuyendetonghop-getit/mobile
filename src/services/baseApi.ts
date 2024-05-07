import {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import {AxiosProgressEvent, AxiosRequestConfig} from 'axios';

import apiService from './apiServices';
import {store} from '../redux/store';
import {signOut} from '../redux/slices/auth.slice';

export const DOMAIN =
  'https://7a28-2405-4802-499-82d0-61a8-5a3-9c97-17fe.ngrok-free.app';
export const API_URL = DOMAIN + '/api/v1/';

export const axiosBaseQuery = (
  {baseUrl}: {baseUrl?: string} = {baseUrl: API_URL},
): BaseQueryFn<{
  url: string;
  method?: AxiosRequestConfig['method'];
  body?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
  onUploadProgress?: ((progressEvent: AxiosProgressEvent) => void) | undefined;
}> => {
  return async ({
    url,
    method = 'GET',
    body,
    params,
    headers,
    onUploadProgress,
  }) => {
    try {
      const result = await apiService({
        baseURL: baseUrl,
        url: url,
        method,
        data: body,
        params,
        headers,
        onUploadProgress,
      });
      return {data: result.data};
    } catch (axiosError: any) {
      const err = axiosError?.response;
      if (
        err?.status === 401 ||
        err?.data?.message?.includes('User is not found')
      ) {
        // handle expired token
        store.dispatch(signOut());
      }
      return {
        error: {
          status: err?.status,
          data: err?.data,
        },
      };
    }
  };
};
