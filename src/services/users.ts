import nookies from 'nookies';
import { api } from '@/services/api';
import { User } from '@/types/User';

type SessionVerifyType = {
    user?: User;
    error?: boolean;
    message?: string;
};

export async function verifySession(token?: string): Promise<User | null> {
    if (!token) token = nookies.get({}).trips_token;

    if (!token) return null;

    try {
        const response = await api.get(`/users/verify-token`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        const { user }: SessionVerifyType = response.data;

        return user || null;
    } catch (err) {
        return null;
    }
}
