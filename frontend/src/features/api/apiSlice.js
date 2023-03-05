import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500' }),
  endpoints: (builder) => ({
    getClockOuts: builder.query({
      query: () => '/clockouts',
    }),
  }),
});

export const { useGetClockOutsQuery } = apiSlice;
