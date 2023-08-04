'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FullScreenLoading from '@/components/FullScreenLoading';
export default function Redirect({ to }: { to: string }) {
    const router = useRouter();

    useEffect(() => {
        router.replace(to);
        router.refresh();
    }, []);

    return <FullScreenLoading />;
}
