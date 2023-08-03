'use client';

import PrivateRoute from '@/app/components/auth/PrivateRoute';
import { useAuth } from '@/hooks/useAuth';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { isLogged } = useAuth();

    return (
        <PrivateRoute redirectTo="/" condition={!isLogged}>
            {children}
        </PrivateRoute>
    );
};

export default AuthLayout;
