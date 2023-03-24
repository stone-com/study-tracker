import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clockApi = createApi({
  reducerPath: 'clockApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://study-tracker-api.vercel.app/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.token;
      // If we have a token set in the state, then pass it in auth header
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['ClockOuts', 'MostRecentClockIn'],
  endpoints: (builder) => ({
    getClockOuts: builder.query({
      query: () => '/clock',
      providesTags: ['ClockOuts'],
      invalidatesTags: ['MostRecentClockIn'],
    }),
    getMostRecentClockIn: builder.query({
      query: () => '/clock/mostRecent',
      providesTags: ['MostRecentClockIn'],
    }),
    addClockIn: builder.mutation({
      query: () => ({
        url: '/clock/clockin',
        method: 'POST',
      }),
      invalidatesTags: ['MostRecentClockIn'],
    }),
    addClockOut: builder.mutation({
      query: () => ({
        url: '/clock/clockout',
        method: 'POST',
      }),
      invalidatesTags: ['ClockOuts', 'MostRecentClockIn'],
    }),
    markAsPaid: builder.mutation({
      query: (id) => ({
        url: `/clock/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['ClockOuts'],
    }),
  }),
});

export const {
  useGetClockOutsQuery,
  useAddClockInMutation,
  useAddClockOutMutation,
  useGetMostRecentClockInQuery,
  useMarkAsPaidMutation,
} = clockApi;
