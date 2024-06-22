import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { isDev } from './environment';
import { LoginRequest, LoginResponse } from '../features/auth/model';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL
  // prepareHeaders: (headers, { getState }) => {
  // const token = (getState() as RootState).auth?.token;
  // console.log('Getting token', token);
  // if (token) {
  //   headers.set('Authorization', `Bearer ${token}`);
  // }
  //   return headers;
  // }
});

const baseQueryWithLogging: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  if (isDev()) {
    console.log('Request:', args);
  }
  const result = await baseQuery(args, api, extraOptions);
  if (isDev()) {
    console.log('Response:', result);
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithLogging,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data
      })
    }),
    register: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data
      })
    }),
    getUsers: builder.query<LoginResponse, void>({
      query: () => ({
        url: 'carts',
        method: 'GET',
      }),
    }),
  })
});

export const { useLoginMutation, useRegisterMutation, useGetUsersQuery } = api;
