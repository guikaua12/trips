'use client';

import React, { useEffect, useState } from 'react';
import MyTripSkeleton from '@/components/MyTripSkeleton';

type MyTripsWrapperSkeletonProps = {
    quantity: number;
};

type MyTripSkeletonType = {
    id: string;
};

export default function MyTripsWrapperSkeleton({ quantity }: MyTripsWrapperSkeletonProps) {
    const [items, setItems] = useState<MyTripSkeletonType[]>(
        Array.from({ length: quantity }, () => ({ id: String(Math.random() * 1000) }))
    );

    return (
        <div className="grid grid-cols-1 gap-5 overflow-hidden sm:grid-cols-3">
            {items.map((item) => (
                <MyTripSkeleton key={item.id} />
            ))}
        </div>
    );
}
