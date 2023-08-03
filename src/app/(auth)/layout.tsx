'use client';

import PrivateRoute from '@/app/components/auth/PrivateRoute';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return children;
    // <PrivateRoute redirectTo="/" condition={!isAuthenticated()}>
    //
    // </PrivateRoute>
};

export default AuthLayout;
