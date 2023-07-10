import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export default function SectionTitle({ className, children }: Props) {
    return (
        <h2
            className={twMerge(
                'flex items-center gap-2 w-full whitespace-nowrap font-medium before:block before:h-[1px] before:w-full before:bg-lightGray after:block after:h-[1px] after:w-full after:bg-lightGray text-gray',
                className
            )}
        >
            {children}
        </h2>
    );
}
