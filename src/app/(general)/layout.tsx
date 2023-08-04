import Header from '@/layout/Header';
import React, { Suspense } from 'react';
import Image from 'next/image';
export const metadata = {
    title: 'Home / Trips',
    description: 'Sistema de reserva de viagens',
    authors: [
        {
            name: 'Approximations',
            url: 'https://github.com/guikaua12',
        },
    ],
};

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header></Header>
            {children}
        </>
    );
};

export default GeneralLayout;
