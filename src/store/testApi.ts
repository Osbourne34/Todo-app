import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './customRequest';

interface Tokens {
    access: string;
    refresh: string;
}

interface Body {
    email: string;
    password: string;
}

export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        token: build.mutation<Tokens, Body>({
            query: (body) => ({
                url: 'user/token/',
                method: 'post',
                data: body,
            }),
        }),
    }),
});

export const { useTokenMutation } = testApi;
