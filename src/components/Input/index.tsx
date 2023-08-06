import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { FaTriangleExclamation } from 'react-icons/fa6';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hookFormRegister?: any;
    error?: string | undefined | null;
    wrapperClassName?: string;
}

export default function Input({ className, wrapperClassName, hookFormRegister, error, ...props }: InputProps) {
    return (
        <div className={wrapperClassName}>
            <div className="w-full">
                <input
                    className={twMerge(
                        'flex border border-lightGray rounded-md focus-within:border-purple focus-within:text-purple outline-none p-2 text-sm text-gray bg-white w-full',
                        error && 'border-red-500 hover:border-red-500 focus:focus-within:border-red-500',
                        className
                    )}
                    {...props}
                    {...hookFormRegister}
                />
                {error && <FaTriangleExclamation size={20} className="text-red-500"></FaTriangleExclamation>}
            </div>

            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}
