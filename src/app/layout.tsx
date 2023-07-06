import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '@/layout/Header';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
    title: 'Trips',
    description: 'Sistema de reserva de viagens',
    authors: [
        {
            name: 'Approximations',
            url: 'https://github.com/guikaua12',
        },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br">
            <body className={`w-screen h-screen ${poppins.className}`}>
                <Header></Header>
                {children}
            </body>
        </html>
    );
}
