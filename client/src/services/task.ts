import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<unknown, void>({
      query: () => ({ url: '/tasks', method: 'get' }),
    }),

    updateTasks: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
  }),
});

// console.log(tasksApi);

export const { useGetTasksQuery, useUpdateTasksMutation } = tasksApi;
