import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends ComponentProps<'div'> {
    title?: string;
}

export default function Card({ children, title, className, ...rest }: CardProps) {
    return (
        <div className={twMerge('w-full p-3 border border-lightGray rounded-xl shadow-lg', className)} {...rest}>
            {title && <h1 className="font-semibold text-darkPurple text-center text-lg mb-4">{title}</h1>}
            {children}
        </div>
    );
}
