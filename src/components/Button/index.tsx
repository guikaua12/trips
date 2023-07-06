import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={twMerge('outline-none rounded-md bg-purple p-2 text-white text-sm font-medium', className)}>
            {children}
        </button>
    );
}
