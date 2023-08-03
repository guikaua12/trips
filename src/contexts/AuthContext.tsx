'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { AxiosError } from 'axios';
import { User } from '@/types/User';

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

type AuthContextType = {
    login: (data: LoginRequestType) => Promise<LoginResponseType>;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    isLogged: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const isLogged = !!user;

    useEffect(() => {
        const verifySession = async (): Promise<void> => {
            let session: string | null = JSON.parse(localStorage.getItem('trips_session')!);
            if (!session || !session.length) session = null;

            await api.get(`/session/verify/${session}`);
        };

        verifySession();
    }, []);

    function setUserFn(data: User | null): void {
        setUser(data);
        localStorage.setItem('trips_user', JSON.stringify(data));
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

            if (user) {
                setUserFn(user);
                localStorage.setItem('trips_session', JSON.stringify(session));
            }

            return { user, session, error, message };
        } catch (err) {
            console.log('erro porra caralho');
            if (err instanceof AxiosError && err.response) {
                const { user, session, error, message }: LoginResponseType = err.response.data;

                return { user, session, error, message };
            }
        }

        return {};
    }

    function logout(): void {
        setUser(null);
        localStorage.removeItem('trips_user');
        localStorage.removeItem('trips_session');
    }

    return <AuthContext.Provider value={{ login, user, setUser, isLogged }}>{children}</AuthContext.Provider>;
}
