import React, { Children, ComponentProps, ReactElement, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type SelectItem = {
    label: string;
    value: string;
};

interface Props extends ComponentProps<'div'> {
    handleChange?: (value: SelectItem) => void;
    placeholder?: string;
}

export default function Select({ className, children, handleChange = (_: SelectItem) => {}, placeholder }: Props) {
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState<SelectItem | null>(null);

    const handleRootClick = (e: any) => {
        setIsOpen((prevState) => !prevState);

        const target = e.target;
        const targetAttributes = target.attributes;

        if (!targetAttributes['data-select-item']) return;

        const label = targetAttributes['data-label'].value;
        const value = targetAttributes['data-value'].value;
        setSelected({ label, value });
        handleChange({ label, value });
    };

    useEffect(() => {
        const defaultSelectedIndex = Children.toArray(children).findLastIndex(
            (child) => (child as ReactElement).props.selected
        );
        const defaultSelected = Children.toArray(children)[defaultSelectedIndex] as ReactElement;

        if (defaultSelected) {
            const item: SelectItem = { label: defaultSelected.props.children, value: defaultSelected.props.value };
            setSelected(item);
            handleChange(item);
        }
    }, []);

    return (
        <div className={twMerge('relative cursor-pointer select-none', className)} onClick={handleRootClick}>
            <div className="w-36 rounded-lg bg-zinc-200 px-2 py-1.5 text-sm text-gray hover:bg-zinc-400 hover:text-white">
                {selected?.label || placeholder}
            </div>
            {isOpen && (
                <div className="dropdown absolute left-0 top-9 w-full rounded-md bg-white py-1.5 text-sm text-gray shadow-lg">
                    {children}
                </div>
            )}
        </div>
    );
}
