import Header from '@/layout/Header';
import React from 'react';
import Footer from '@/layout/Footer';
export const metadata = {
    title: 'Home / Trips',
};

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default GeneralLayout;
