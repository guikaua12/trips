'use client';

import React from 'react';
import { redirect } from 'next/navigation';

interface PrivateRouteProps {
    children: React.ReactNode;
    redirectTo: string;
    condition: boolean;
}

export default function PrivateRoute({ children, redirectTo, condition }: PrivateRouteProps) {
    if (!condition) {
        redirect(redirectTo);
        return null;
    }

    return <>{children}</>;
}
