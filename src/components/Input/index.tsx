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
            <div
                className={twMerge(
                    'flex w-full rounded-md border border-lightGray bg-white p-2 text-sm text-gray outline-none focus-within:border-purple focus-within:text-purple',
                    error && 'border-red-500 hover:border-red-500 focus:focus-within:border-red-500'
                )}
            >
                <input className={twMerge('w-full outline-none', className)} {...props} {...hookFormRegister} />
                {error && <FaTriangleExclamation size={20} className="text-red-500" />}
            </div>

            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}
