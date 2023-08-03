import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
        return error;
    }
);
