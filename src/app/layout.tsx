import './globals.css';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import WithAxios from '@/components/WithAxios';
import { ReactNode, Suspense } from 'react';
import FullScreenLoading from '@/components/FullScreenLoading';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
    description: 'Sistema de reserva de viagens',
    authors: [
        {
            name: 'Approximations',
            url: 'https://github.com/guikaua12',
        },
    ],
    icons: {
        icon: '/icon.png',
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-br">
            <body className={`w-screen h-screen ${poppins.className}`}>
                <Suspense fallback={<FullScreenLoading />}>
                    <AuthProvider>
                        <WithAxios>{children}</WithAxios>
                    </AuthProvider>
                </Suspense>
            </body>
        </html>
    );
}
