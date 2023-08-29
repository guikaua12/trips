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
            <main className="min-h-[85%] sm:min-h-[90%]">{children}</main>

            <Footer />
        </>
    );
}
