import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export enum ButtonVariants {
    Primary = 'bg-purple text-white outline-none disabled:bg-darkPurple font-medium',
    Secondary = 'bg-transparent text-purple outline outline-1 font-semibold',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariants;
}

export default function Button({ className, children, variant = ButtonVariants.Primary, ...props }: ButtonProps) {
    return (
        <button
            className={twMerge('flex justify-center rounded-md p-2 text-center text-sm', variant, className)}
            {...props}
        >
            {children}
        </button>
    );
}
