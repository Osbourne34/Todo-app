import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ICategory } from '../../models/ICategory';
import { axiosBaseQuery } from './../customRequest';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Category'],
    endpoints: (build) => ({
        getAllCategories: build.query<ICategory[], string>({
            query: () => ({
                url: 'categories/',
                method: 'get',
            }),
            providesTags: ['Category'],
        }),
        getCategory: build.query<ICategory, string>({
            query: (id: string) => ({
                url: `categories${id}/`,
                method: 'get',
            }),
            providesTags: ['Category'],
        }),
        createCategory: build.mutation<ICategory, { name: string }>({
            query: (body) => ({
                url: 'categories/',
                method: 'post',
                data: body,
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: build.mutation<ICategory, { id: number; name: string }>(
            {
                query: ({ id, name }) => ({
                    url: `categories/${id}/`,
                    method: 'patch',
                    data: { name },
                }),
                invalidatesTags: ['Category'],
            },
        ),
        deleteCategory: build.mutation({
            query: (id: number | string) => ({
                url: `categories/${id}/`,
                method: 'delete',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetCategoryQuery,
    useLazyGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;
