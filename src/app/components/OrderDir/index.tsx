import SelectToggle, { SelectItem } from '@/components/SelectToggle';
import React, { ComponentProps, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const items: SelectItem[] = [
    {
        label: 'Crescente',
        value: 'asc',
    },
    {
        label: 'Decrescente',
        value: 'desc',
    },
];

interface Props extends ComponentProps<'div'> {
    selected: SelectItem | null;
    handleChange: (item: SelectItem) => void;
}

export default function OrderDir({ className, selected, handleChange, ...props }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenClick = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <SelectToggle
            className="z-50"
            selected={selected}
            isOpen={isOpen}
            setIsOpen={handleOpenClick}
            items={items}
            handleChange={handleChange}
            placeholder="Ordem"
        />
    );
}
