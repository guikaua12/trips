'use client';

import React, { ChangeEventHandler, InputHTMLAttributes, useRef, useState } from 'react';
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
}

export default function CurrencyInput({ id, className, wrapperClassName, onBlur, ...props }: CurrencyInputProps) {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div
            className={twMerge(
                'group flex flex-row-reverse items-center gap-1 border border-lightGray rounded-md p-2 text-sm text-gray focus-within:border-purple bg-white',
                wrapperClassName
            )}
        >
            <input
                ref={ref}
                id={id}
                className={twMerge(
                    'w-full h-full outline-none group-focus-within:text-purple [&:focus~label]:text-purple [&:not(:placeholder-shown)~label]:inline',
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
            />
            <label htmlFor={id} className="hidden">
                <span>R$</span>
            </label>
        </div>
    );
}
