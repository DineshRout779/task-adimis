import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import axiosBaseQuery from './axiosBaseQuery';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<unknown, void>({
      query: () => '/tasks',
    }),
  }),
});

// console.log(tasksApi);

export const { useGetTasksQuery } = tasksApi;
