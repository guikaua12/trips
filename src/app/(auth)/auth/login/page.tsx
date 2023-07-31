import React from 'react';
import Login from '@/app/components/auth/Login';

export const metadata = {
    title: 'Login / Trips',
    description: 'Sistema de reserva de viagens',
    authors: [
        {
            name: 'Approximations',
            url: 'https://github.com/guikaua12',
        },
    ],
};

export default function LoginPage() {
    return <Login />;
}
