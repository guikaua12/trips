'use client';

import PrivateRoute from '@/app/components/auth/PrivateRoute';
import { useSession } from '@/hooks/useSession';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useSession();

    return (
        <PrivateRoute redirectTo="/" condition={!isAuthenticated()}>
            {children}
        </PrivateRoute>
    );
};

export default AuthLayout;
