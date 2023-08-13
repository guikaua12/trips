'use client';

import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

function countDecimalPlaces(number: number) {
    const decimalPart = String(number).split('.')[1];
    if (decimalPart) {
        return decimalPart.length;
    }
    return 0;
}

function limitPlaces(number: number) {
    return Math.floor(number * 100) / 100;
}

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    wrapperClassName?: string;
    hookFormRegister?: any;
    error?: string | undefined | null;
}

export default function CurrencyInput({
    id,
    className,
    wrapperClassName,
    onBlur,
    hookFormRegister,
    error,
    ...props
}: CurrencyInputProps) {
    return (
        <div className={wrapperClassName}>
            <div
                className={twMerge(
                    'group flex flex-row-reverse items-center gap-1 rounded-md bg-white p-2 text-sm text-gray outline outline-1 outline-lightGray focus-within:outline-purple',
                    error && 'outline-red-500 hover:outline-red-500 focus:focus-within:outline-red-500'
                )}
            >
                {/*{error && <FaTriangleExclamation className="min-h-[20px] min-w-[20px] text-red-500" />}*/}
                <input
                    id={id}
                    className={twMerge(
                        'h-full w-full outline-none group-focus-within:text-purple [&:focus~label]:text-purple [&:not(:placeholder-shown)~label]:inline',
                        className
                    )}
                    type="number"
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const afterComma = countDecimalPlaces(e.target.valueAsNumber);

                        if (afterComma > 2) {
                            // e.target.value = e.target.valueAsNumber.toFixed(2);
                            e.target.valueAsNumber = limitPlaces(e.target.valueAsNumber);
                        }

                        if (onBlur) onBlur(e);
                    }}
                    {...props}
                    {...hookFormRegister}
                />

                <label htmlFor={id} className="hidden">
                    <span>R$</span>
                </label>
            </div>

            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}
