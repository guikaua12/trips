'use client';

import React from 'react';
import Card from '@/components/Card';
import Separator from '@/components/Separator';

export default function MyTripSkeleton() {
    return (
        <Card className="flex flex-col gap-4 p-5">
            <div className="flex">
                <div className="h-[100px] w-[250px] animate-pulse rounded-lg bg-zinc-300" />

                <div className="w-full items-center p-5">
                    <div className="h-6 animate-pulse rounded-lg bg-zinc-300" />
                </div>
            </div>

            <Separator />

            <div>
                <div className="mb-5 h-4 max-w-[150px] animate-pulse rounded-lg bg-zinc-300" />

                <div className="mb-1 h-4 max-w-[50px] animate-pulse rounded-lg bg-zinc-300" />
                <div className="h-4 max-w-[100px] animate-pulse rounded-lg bg-zinc-300" />
            </div>

            <Separator />

            <div className="h-4 max-w-[200px] animate-pulse rounded-lg bg-zinc-300" />
            <div className="h-4 animate-pulse rounded-lg bg-zinc-300" />
        </Card>
    );
}
