import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './customRequest';

export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        token: build.mutation({
            query: (body) => ({
                url: 'user/token/',
                method: 'post',
                data: body,
            }),
        }),
    }),
});

export const { useTokenMutation } = testApi;
