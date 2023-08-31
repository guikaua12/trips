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
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                {items.map((item) => (
                    <MyTripSkeleton key={item.id} />
                ))}
            </div>
        </div>
    );
}
