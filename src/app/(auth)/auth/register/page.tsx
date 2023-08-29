import Register from '@/app/components/auth/Register';
import { cookies } from 'next/headers';
import Redirect from '@/app/components/Redirect';

export const metadata = {
    title: 'Registro / Trips',
};

async function verifyAuth(): Promise<boolean> {
    const cookieStore = cookies();
    const session = cookieStore.get('trips_token');

    return !session;
}

export default async function RegisterPage() {
    const valid = await verifyAuth();
    if (!valid) {
        return <Redirect to="/" />;
    }

    return <Register />;
}
