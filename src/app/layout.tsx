import './globals.css';
import { Poppins } from 'next/font/google';
import ReduxProvider from '@/app/components/ReduxProvider';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="pt-br">
            <body className={`w-screen h-screen ${poppins.className}`}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
};

export default RootLayout;
