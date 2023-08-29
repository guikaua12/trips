import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends ComponentProps<'div'> {
    title?: string;
}

export default function Card({ children, title, className, ...rest }: CardProps) {
    return (
        <div className={twMerge('w-full rounded-xl border border-lightGray p-3 shadow-lg', className)} {...rest}>
            {title && <h1 className="mb-4 text-center text-lg font-semibold text-darkPurple">{title}</h1>}
            {children}
        </div>
    );
}
