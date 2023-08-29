'use client';

import React, { useState } from 'react';
import MyTripSkeleton from '@/components/MyTripSkeleton';

type MyTripsWrapperSkeletonProps = {
    quantity: number;
};

export default function MyTripsWrapperSkeleton({ quantity }: MyTripsWrapperSkeletonProps) {
    const [items, setItems] = useState<number[]>(Array.from({ length: quantity }));

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                {items.map((item) => (
                    <MyTripSkeleton key={item} />
                ))}
            </div>
        </div>
    );
}
