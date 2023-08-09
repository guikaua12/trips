import Header from '@/layout/Header';
import React from 'react';
import Footer from '@/layout/Footer';
export const metadata = {
    title: 'Home / Trips',
};

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}

            <Footer />
        </>
    );
}
