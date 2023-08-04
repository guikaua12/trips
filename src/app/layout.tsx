import './globals.css';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import WithAxios from '@/components/WithAxios';
import { ReactNode, Suspense } from 'react';
import Image from 'next/image';

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

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="pt-br">
            <body className={`w-screen h-screen ${poppins.className}`}>
                <Suspense
                    fallback={
                        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5 animate-pulse">
                            <div className="w-[60] h-[60]">
                                <Image src="/logo-icon.png" width={60} height={60} alt="Logo" />
                            </div>
                        </div>
                    }
                >
                    <AuthProvider>
                        <WithAxios>{children}</WithAxios>
                    </AuthProvider>
                </Suspense>
            </body>
        </html>
    );
};

export default RootLayout;
