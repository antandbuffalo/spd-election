import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { viewCountApiUrl } from '../../utility/constants';
import { getUUID } from '../../utility/util';

const isLocal = window.location.host.includes("localhost");
const baseUrl = isLocal ? 'http://localhost:3001' : viewCountApiUrl;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Reviews', 'Users'],
  endpoints: (builder) => ({
    getViewCount: builder.query({
      query: () => `?id=${getUUID()}&time=${new Date().getTime()}`,
    }),

    getMemberStatus: builder.query({
      query: () => ({
        url: 'memberStatus.json',
        params: { time: new Date().getTime() },
        baseUrl: '',
      }),
    }),

    submitReview: builder.mutation({
      query: (review) => ({
        url: '/review',
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Reviews'],
    }),

    getReviewList: builder.query({
      query: () => '/review',
      providesTags: ['Reviews'],
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: '/add-user',
        method: 'POST',
        body: { ...user, hostname: window?.location?.hostname },
      }),
      invalidatesTags: ['Users'],
    }),

    login: builder.mutation({
      query: (password) => ({
        url: '/login',
        method: 'POST',
        body: { password },
      }),
    }),

    deleteReview: builder.mutation({
      query: ({ id, token }) => ({
        url: '/review',
        method: 'DELETE',
        body: { id, token },
        headers: {
          'x-admin-token': token,
        },
      }),
      invalidatesTags: ['Reviews'],
    }),

    fetchConfig: builder.query({
      query: () => ({
        url: 'config.json',
        params: { time: new Date().getTime() },
        baseUrl: '',
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: '/users',
        headers: {
          'x-admin-token': localStorage.getItem('token') || '',
        },
      }),
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetViewCountQuery,
  useGetMemberStatusQuery,
  useSubmitReviewMutation,
  useGetReviewListQuery,
  useAddUserMutation,
  useLoginMutation,
  useDeleteReviewMutation,
  useFetchConfigQuery,
  useGetUsersQuery,
} = apiSlice;