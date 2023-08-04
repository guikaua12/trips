'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
export default function Redirect({ to }: { to: string }) {
    const router = useRouter();

    useEffect(() => {
        router.replace(to);
        router.refresh();
    }, []);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5 animate-pulse">
            <div className="w-[60] h-[60]">
                <Image src="/logo-icon.png" width={60} height={60} alt="Logo" />
            </div>
        </div>
    );
}
