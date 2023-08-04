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

function Loading() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5 animate-pulse">
            <div className="w-[60] h-[60]">
                <Image src="/logo-icon.png" width={60} height={60} alt="Logo" />
            </div>
        </div>
    );
}

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={<Loading></Loading>}>
            <Header></Header>
            {children}
        </Suspense>
    );
};

export default GeneralLayout;
