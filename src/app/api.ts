import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { isDev } from './environment';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ShortnerRequest } from '../features/auth/model';
import { RootState } from './store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    console.log('Getting token', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
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
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data
      })
    }),
    getUrls: builder.query<LoginResponse, string>({
      query: (id) => ({
        url: `user/url/${id}`,
        method: 'GET',
      }),
    }),
    urlShortner: builder.mutation<LoginResponse, ShortnerRequest>({
      query: (data) => ({
        url: 'url/shorten',
        method: 'POST',
        body: data
      })
    }),
  })
});

export const { useLoginMutation, useRegisterMutation, useGetUrlsQuery, useUrlShortnerMutation } = api;
