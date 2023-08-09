import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Separator({ className }: HTMLAttributes<HTMLDivElement>) {
    return <div className={twMerge('h-px w-full bg-lightGray', className)} />;
}
