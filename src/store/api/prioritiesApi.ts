import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPriority } from '../../models/IPriority';
import { axiosBaseQuery } from './../customRequest';

export const prioritiesApi = createApi({
    reducerPath: 'prioritiesApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Priority'],
    endpoints: (build) => ({
        getAllPriorities: build.query<IPriority[], string>({
            query: () => ({
                url: 'priorities/',
                method: 'get',
            }),
            providesTags: ['Priority'],
        }),
        createPriority: build.mutation<
            IPriority,
            { name: string; color: string }
        >({
            query: (body) => ({
                url: 'priorities/',
                method: 'post',
                data: body,
            }),
            invalidatesTags: ['Priority'],
        }),
        updatePriority: build.mutation<
            IPriority,
            { id: number; body: { name: string; color: string } }
        >({
            query: ({ id, body }) => ({
                url: `priorities/${id}/`,
                method: 'put',
                data: body,
            }),
            invalidatesTags: ['Priority'],
        }),
        deletePriority: build.mutation<IPriority, { id: number }>({
            query: ({ id }) => ({
                url: `priorities/${id}/`,
                method: 'delete',
            }),
            invalidatesTags: ['Priority'],
        }),
    }),
});

export const {
    useGetAllPrioritiesQuery,
    useCreatePriorityMutation,
    useUpdatePriorityMutation,
    useDeletePriorityMutation,
} = prioritiesApi;
