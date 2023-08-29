import React from 'react';
import Image from 'next/image';

export default function FullScreenLoading() {
    return (
        <div className="flex h-full w-full animate-pulse flex-col items-center justify-center gap-4 p-5">
            <div className="h-[60] w-[60]">
                <Image src="/logo-icon.png" width={60} height={60} alt="Loading logo" />
            </div>
        </div>
    );
}
