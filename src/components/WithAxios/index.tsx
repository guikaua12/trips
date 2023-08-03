'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

export default function WithAxios({ children }: { children: ReactNode }) {
    const [isSet, setIsSet] = useState(false);
    const { setUser } = useAuth();

    // TODO: Fix adding interceptor
    useEffect(() => {
        const id = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log('cuceta: ' + error);
                const status = error.response.status;

                // unauthorized
                if (status === 401) {
                    // logout
                    const { user } = useAuth();
                    console.log(user);
                    console.log('Invalid session, logout.');
                }

                return Promise.reject(error);
            }
        );

        setIsSet(true);
        return () => api.interceptors.response.eject(id);
    }, [setUser]);

    return isSet && children;
}
