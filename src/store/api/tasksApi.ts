import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ITask, ITask2 } from '../../models/ITask';
import { axiosBaseQuery } from './../customRequest';

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Tasks'],
    endpoints: (build) => ({
        getIncompleteTasks: build.query<{ incomplete_count: string }, string>({
            query: () => ({
                url: 'tasks/get_incomplete/',
                method: 'get',
            }),
            providesTags: ['Tasks'],
        }),
        getTasksByCategory: build.query<ITask2[], string | undefined>({
            query: (category) => ({
                url: `tasks/?category=${category ? category : ''}`,
                method: 'get',
            }),
            providesTags: ['Tasks'],
        }),
        createTask: build.mutation<ITask, ITask>({
            query: (body) => ({
                url: 'tasks/',
                method: 'post',
                data: body,
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
});

export const {
    useGetIncompleteTasksQuery,
    useGetTasksByCategoryQuery,
    useCreateTaskMutation,
} = tasksApi;
