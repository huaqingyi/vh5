import { AxiosRequestConfig } from 'axios';
declare const HTTPBASE: string;

export const httpConfig = {
    baseURL: HTTPBASE,
    header: {
        'Content-Type': 'application/json',
    },
} as AxiosRequestConfig;
