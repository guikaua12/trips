'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

export default function WithAxios({ children }: { children: ReactNode }) {
    const { isLogged, logout } = useAuth();

    useEffect(() => {
        const id = api.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log(error);

                const status = error.response.status;

                // unauthorized
                if (status === 401 && isLogged) {
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
