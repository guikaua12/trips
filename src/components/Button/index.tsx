import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariantsType = {
    primary: string;
    outline: string;
};

const ButtonVariants: ButtonVariantsType = {
    primary: 'bg-purple text-white outline-none disabled:bg-darkPurple font-medium',
    outline: 'bg-transparent text-purple outline outline-1 font-semibold',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof ButtonVariantsType;
}

export default function Button({ className, children, variant = 'primary', ...props }: ButtonProps) {
    return (
        <button
            className={twMerge(
                'flex h-9 items-center justify-center rounded-md text-center text-sm',
                ButtonVariants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
