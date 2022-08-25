import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../customRequest';

import { IAuthResponse } from '../../../models/IAuthResponse';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        login: build.mutation<
            IAuthResponse,
            { email: string; password: string }
        >({
            query: (body) => ({
                url: 'user/token/',
                method: 'post',
                data: body,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
