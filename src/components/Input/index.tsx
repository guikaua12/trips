import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={twMerge(
                'border border-lightGray rounded-md p-2 text-sm text-gray outline-none focus:border-purple focus:text-purple',
                className
            )}
        />
    );
}
