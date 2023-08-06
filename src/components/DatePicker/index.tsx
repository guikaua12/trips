'use client';

import { LegacyRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

interface InputProps extends ReactDatePickerProps {
    error?: boolean;
    errorMessage?: string;
}

export default function Input(
    { className, error, errorMessage, ...props }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
) {
    const inputClassName = twMerge(
        'flex border border-lightGray rounded-md focus-within:border-purple focus-within:text-purple outline-none p-2 text-sm text-gray',
        className,
        error && 'border-red-500 hover:border-red-500 focus:focus-within:border-red-500'
    );

    return (
        <div className="flex w-full flex-col">
            <DatePicker
                locale="pt-BR"
                wrapperClassName="w-full"
                className={inputClassName}
                enableTabLoop={false}
                {...props}
            />
            {error && errorMessage && <div className="mt-1 text-xs text-red-500">{errorMessage}</div>}
        </div>
    );
}
