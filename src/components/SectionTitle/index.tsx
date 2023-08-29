import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export default function SectionTitle({ className, children }: Props) {
    return (
        <h4
            className={twMerge(
                'flex w-full items-center gap-2 whitespace-nowrap font-medium text-gray before:block before:h-[1px] before:w-full before:bg-lightGray after:block after:h-[1px] after:w-full after:bg-lightGray',
                className
            )}
        >
            {children}
        </h4>
    );
}
