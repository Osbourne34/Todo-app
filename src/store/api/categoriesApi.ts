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
        createCategory: build.mutation<ICategory, { name: string }>({
            query: (body) => ({
                url: 'categories/',
                method: 'post',
                data: body,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } =
    categoriesApi;
