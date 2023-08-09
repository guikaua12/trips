'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { AxiosError } from 'axios';
import { User } from '@/types/User';
import nookies from 'nookies';
import { useRouter } from 'next/navigation';
import { verifySession } from '@/services/users';

type LoginRequestType = {
    email: string;
    password: string;
};

type LoginResponseType = {
    user?: {
        id: string;
        email: string;
    };
    token?: string;
    error?: boolean;
    message?: string;
};

type AuthContextType = {
    login: (data: LoginRequestType) => Promise<LoginResponseType>;
    register: (data: LoginRequestType) => Promise<LoginResponseType>;
    logout: () => void;
    user: User | null;
    setUserFn: (data: User | null) => void;
    isLogged: boolean;
    isLoading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { push } = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isLogged = !!user;

    useEffect(() => {
        verifySession()
            .then((data) => {
                if (data) {
                    setUserFn(data);
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    function setUserFn(data: User | null): void {
        setUser(data);
        nookies.set({}, 'trips_user', JSON.stringify(data), {
            // 24 hours
            maxAge: 60 * 60 * 24,
            path: '/',
        });
    }

    async function login({ email, password }: LoginRequestType): Promise<LoginResponseType> {
        try {
            const response = await api.post(
                '/users/login',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const { user, session, error, message }: LoginResponseType = response.data;

            if (user && session) {
                setUserFn(user);
                nookies.set({}, 'trips_session', session, {
                    // 24 hours
                    maxAge: 60 * 60 * 24,
                    path: '/',
                });
            }

            return { user, session, error, message };
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                const { user, session, error, message }: LoginResponseType = err.response.data;

                return { user, session, error, message };
            }
        }

        return {};
    }

    async function register({ email, password }: LoginRequestType): Promise<LoginResponseType> {
        try {
            const response = await api.post(
                '/users/register',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const { user, session, error, message }: LoginResponseType = response.data;

            if (user && session) {
                setUserFn(user);
                nookies.set({}, 'trips_session', session, {
                    // 24 hours
                    maxAge: 60 * 60 * 24,
                    path: '/',
                });
            }

            return { user, session, error, message };
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                const { user, session, error, message }: LoginResponseType = err.response.data;

                return { user, session, error, message };
            }
        }

        return {};
    }

    function logout(): void {
        setUser(null);
        nookies.destroy({}, 'trips_user', { path: '/' });
        nookies.destroy(null, 'trips_session', { path: '/' });
        push('/');
    }

    return (
        <AuthContext.Provider value={{ login, register, logout, user, setUserFn, isLogged, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
