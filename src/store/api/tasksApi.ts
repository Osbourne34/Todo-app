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
        createTask: build.mutation<ITask, ITask>({
            query: (body) => ({
                url: 'tasks/',
                method: 'post',
                data: body,
            }),
        }),
    }),
});

export const { useGetIncompleteTasksQuery, useCreateTaskMutation } = tasksApi;
