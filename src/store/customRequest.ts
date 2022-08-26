import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import axios from 'axios';
import { API_URL } from '../constants/api';
import { IAuthResponse } from '../models/IAuthResponse';

const $api = axios.create({
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    if (config.headers === undefined) return {};
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'accessToken',
    )}`;

    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.post<IAuthResponse>(
                    API_URL + 'user/token/refresh/',
                    {
                        refresh: localStorage.getItem('refreshToken'),
                    },
                );
                localStorage.setItem('accessToken', response.data.access);
                return $api.request(originalRequest);
            } catch (err) {
                console.log(err);
            }
        }
    },
);

export const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string;
            method: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params }) => {
        try {
            const result = await $api({
                url,
                method,
                data,
                params,
            });
            return { data: result.data };
        } catch (axiosError) {
            let err = axiosError as AxiosError;

            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };
