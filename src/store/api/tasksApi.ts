import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ITask } from '../../models/ITask';
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
        getTasksByCategory: build.query<ITask[], string | undefined>({
            query: (category) => ({
                url: `tasks/?category=${category ? category : ''}`,
                method: 'get',
            }),
            providesTags: ['Tasks'],
        }),
        deleteTask: build.mutation({
            query: (id: number) => ({
                url: `tasks/${id}`,
                method: 'delete',
            }),
            invalidatesTags: ['Tasks'],
        }),
        createTask: build.mutation<
            ITask,
            {
                name: string;
                due_date: string | undefined;
                category: number | null;
                priority: number | null;
            }
        >({
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
    useDeleteTaskMutation,
} = tasksApi;
