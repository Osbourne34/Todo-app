import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import axios from 'axios';
import { API_URL } from '../constants/api';

const $api = axios.create({
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    if (config.headers === undefined) return {};
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
});

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
