import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

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
                    'flex w-full rounded-md bg-white p-2 text-sm text-gray outline outline-1 outline-lightGray focus-within:text-purple focus-within:outline-purple',
                    error && 'outline-red-500 focus-within:outline-red-500 hover:outline-red-500'
                )}
            >
                <input className={twMerge('w-full outline-none', className)} {...props} {...hookFormRegister} />
                {/*{error && <FaTriangleExclamation className="min-h-[20px] min-w-[20px] text-red-500" />}*/}
            </div>

            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}
