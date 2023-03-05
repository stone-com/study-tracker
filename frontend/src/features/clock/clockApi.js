import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clockApi = createApi({
  reducerPath: 'clockApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5500/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.token;
      // If we have a token set in the state, then pass it in auth header
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getClockOuts: builder.query({
      query: () => '/clock',
    }),
    addClockIn: builder.mutation({
      query: () => ({
        url: '/clock/clockin',
        method: 'POST',
      }),
    }),
    addClockOut: builder.mutation({
      query: () => ({
        url: '/clock/clockout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetClockOutsQuery, useAddClockInMutation, useAddClockOutMutation } = clockApi;