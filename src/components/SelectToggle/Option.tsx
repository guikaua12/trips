import React, { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
    value: any;
    selected?: boolean;
};

export default function Option({ children, value, selected = false }: Props) {
    return (
        <button
            className="w-full px-1 py-1 text-start hover:bg-zinc-100"
            data-select-item={true}
            data-label={children}
            data-value={value}
        >
            {children}
        </button>
    );
}
