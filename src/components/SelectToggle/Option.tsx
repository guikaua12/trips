import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
    children?: ReactNode;
    value: any;
    selected?: boolean;
};

export default function Option({ children, value, selected = false }: Props) {
    return (
        <div
            className={twMerge('px-1 py-1 hover:bg-zinc-100')}
            data-select-item={true}
            data-label={children}
            data-value={value}
        >
            {children}
        </div>
    );
}
