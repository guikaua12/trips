import axios from 'axios';
import nookies from 'nookies';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

api.defaults.headers.common = {
    'Content-Type': 'application/json',
};

api.interceptors.request.use((config) => {
    const { trips_token } = nookies.get({});
    if (trips_token && !config.headers.authorization) {
        config.headers.authorization = `Bearer ${trips_token}`;
    }

    return config;
});
