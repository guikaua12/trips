import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export type SelectItem = {
    value: string;
    label: string;
};

interface Props extends ComponentProps<'div'> {
    items: SelectItem[];
    isOpen: boolean;
    setIsOpen: () => any;
    selected: SelectItem | null;
    handleChange: (item: SelectItem) => void;
    placeholder?: string;
}

const isSelected = (item: SelectItem, selected: SelectItem | null) => item.value === selected?.value;

export default function Select({ className, items, isOpen, setIsOpen, selected, handleChange, placeholder }: Props) {
    return (
        <div className={twMerge('relative cursor-pointer select-none', className)} onClick={setIsOpen}>
            <div className="w-36 rounded-lg bg-zinc-200 px-2 py-1.5 text-sm text-gray hover:bg-zinc-400 hover:text-white">
                {selected?.label || placeholder}
            </div>
            {isOpen && (
                <div className="dropdown absolute left-0 top-9 w-full rounded-md bg-white py-1.5 text-sm text-gray shadow-lg">
                    {items.map((item) => (
                        <div
                            key={item.value}
                            className={twMerge('px-1 py-1 hover:bg-zinc-100')}
                            onClick={() => handleChange(item)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
