'use client';

import { ReactNode, useEffect } from 'react';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { handleDates } from '@/utils/dateUtils';
import nookies from 'nookies';

export default function WithAxios({ children }: { children: ReactNode }) {
    const { logout, isLogged } = useAuth();
    const token = nookies.get({}).trips_token;

    useEffect(() => {
        const id = api.interceptors.response.use(
            (response) => {
                handleDates(response.data);

                return response;
            },
            (error) => {
                console.log(error);

                const status = error.response.status;

                // unauthorized
                if (token && status === 401) {
                    // logout
                    logout();

                    console.log('Invalid session, logout.');
                }

                return Promise.reject(error);
            }
        );

        return () => api.interceptors.response.eject(id);
    }, [logout]);

    return children;
}
