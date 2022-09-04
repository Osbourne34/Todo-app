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
        getStatistics: build.query<
            {
                tasks_count: number;
                completed_tasks: number;
                incompleted_tasks: number;
                completed_percent: number;
                incompleted_percent: number;
            },
            number
        >({
            query: (id: number) => ({
                url: `category_statistic/${id}/`,
                method: 'get',
            }),
            providesTags: ['Tasks'],
        }),
        createTask: build.mutation<
            ITask,
            {
                name: string;
                due_date: string | undefined;
                category: number | null;
                priority: number | null;
                is_done: false;
            }
        >({
            query: (body) => ({
                url: 'tasks/',
                method: 'post',
                data: body,
            }),
            invalidatesTags: ['Tasks'],
        }),
        updateTask: build.mutation<ITask, {}>({
            query: ({ id, body }: { id: number; body: {} }) => ({
                url: `tasks/${id}/`,
                method: 'patch',
                data: body,
            }),
            invalidatesTags: ['Tasks'],
        }),
        deleteTask: build.mutation({
            query: (id: number) => ({
                url: `tasks/${id}`,
                method: 'delete',
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
});

export const {
    useGetIncompleteTasksQuery,
    useGetTasksByCategoryQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useGetStatisticsQuery,
} = tasksApi;
