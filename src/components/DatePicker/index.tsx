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
    wrapperClassName?: string;
}

export default function Input({ className, wrapperClassName, error, errorMessage, ...props }: InputProps) {
    const inputClassName = twMerge(
        'flex w-full outline outline-1 outline-lightGray rounded-md focus-within:outline-purple focus-within:text-purple p-2 text-sm text-gray',
        error && 'outline-red-500 hover:outline-red-500 focus-within:outline-red-500',
        className
    );
    const inputWrapperClassName = twMerge('flex flex-col', wrapperClassName);

    return (
        <div className={inputWrapperClassName}>
            <DatePicker
                locale="pt-BR"
                wrapperClassName="w-full"
                enableTabLoop={false}
                className={inputClassName}
                {...props}
            />
            {error && errorMessage && <div className="text-xs text-red-500">{errorMessage}</div>}
        </div>
    );
}
