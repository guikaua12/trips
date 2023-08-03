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
        // api request
        const response = await api
            .post(
                '/users/login',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .catch((error) => {
                console.log(error);

                return error;
            });

        const data: LoginResponseType = response instanceof AxiosError ? response.response?.data : response.data;

        if (!data.error) {
            setUser(data.user as User);
            localStorage.setItem('trips_user', JSON.stringify(data.user));
            localStorage.setItem('trips_session', JSON.stringify(data.session));
        }

        return data;
    }

    return <AuthContext.Provider value={{ login, user, setUser, isLogged }}>{children}</AuthContext.Provider>;
}
