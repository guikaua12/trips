'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { AxiosError } from 'axios';
import { User } from '@/types/User';
import nookies from 'nookies';

type LoginRequestType = {
    email: string;
    password: string;
};

type LoginResponseType = {
    user?: {
        id: string;
        email: string;
    };
    session?: string;
    error?: boolean;
    message?: string;
};

type SessionVerifyType = {
    user?: User;
    error?: boolean;
    message?: string;
};

type AuthContextType = {
    login: (data: LoginRequestType) => Promise<LoginResponseType>;
    logout: () => void;
    user: User | null;
    setUserFn: (data: User | null) => void;
    isLogged: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const isLogged = !!user;

    useEffect(() => {
        const verifySession = async (): Promise<void> => {
            const { trips_session } = nookies.get({});
            console.log(trips_session);

            if (trips_session) {
                const response = await api.get(`/session/verify/${trips_session}`);
                if (!response.data) return;

                const { user }: SessionVerifyType = response.data;

                if (user) {
                    setUserFn(user);
                }
            }
        };

        verifySession();
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

    function logout(): void {
        setUser(null);
        nookies.destroy({}, 'trips_user', { path: '/' });
        nookies.destroy(null, 'trips_session', { path: '/' });
    }

    return <AuthContext.Provider value={{ login, logout, user, setUserFn, isLogged }}>{children}</AuthContext.Provider>;
}
