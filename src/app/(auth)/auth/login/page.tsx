import React from 'react';
import Login from '@/app/components/auth/Login';
import { cookies } from 'next/headers';
import Redirect from '@/app/components/Redirect';

export const metadata = {
    title: 'Login / Trips',
};

async function verifyAuth(): Promise<boolean> {
    const cookieStore = cookies();

    const session = cookieStore.get('trips_session');

    return !session;
}

const delay = (ms: number = 750) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function LoginPage() {
    const valid = await verifyAuth();
    if (!valid) {
        return <Redirect to="/" />;
    }

    return <Login />;
}
