import React from 'react';
import Image from 'next/image';

export default function FullScreenLoading() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5 animate-pulse">
            <div className="w-[60] h-[60]">
                <Image src="/logo-icon.png" width={60} height={60} alt="Loading logo" />
            </div>
        </div>
    );
}
