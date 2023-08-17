import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariants = {
    primary: 'bg-purple text-white outline-none disabled:bg-darkPurple font-medium';
    secondary: 'bg-transparent text-purple outline outline-1 font-semibold';
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof ButtonVariants;
}

export default function Button({ className, children, variant = 'primary', ...props }: ButtonProps) {
    return (
        <button
            className={twMerge('flex justify-center rounded-md p-2 text-center text-sm', variant, className)}
            {...props}
        >
            {children}
        </button>
    );
}
