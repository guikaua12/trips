import React from 'react';
import Login from '@/app/components/auth/Login';
import Redirect from '@/app/components/Redirect';
import { cookies } from 'next/headers';

export const metadata = {
    title: 'Login / Trips',
};

async function verifyAuth(): Promise<boolean> {
    const cookieStore = cookies();

    const session = cookieStore.get('trips_session');

    return !session;
}

export default async function LoginPage() {
    const valid = await verifyAuth();
    if (!valid) {
        return <Redirect to="/"></Redirect>;
    }

    return <Login />;
}
