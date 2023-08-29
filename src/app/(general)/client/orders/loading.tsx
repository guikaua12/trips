import React from 'react';
import MyTripsWrapperSkeleton from '@/app/components/MyTripsWrapperSkeleton';

export default function Loading() {
    return (
        <div className="mb-8 p-5">
            <div className="mb-4 h-6 max-w-[200px] animate-pulse rounded-lg bg-zinc-300" />

            <MyTripsWrapperSkeleton quantity={2} />
        </div>
    );
}
