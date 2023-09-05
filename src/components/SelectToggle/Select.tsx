import React, { Children, ComponentProps, ReactElement, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import OutsideClickDetector from '@/hooks/useOutsideClick';
import { BsArrow90DegDown } from 'react-icons/bs';

export type SelectItem = {
    label: string;
    value: string;
};

interface Props extends ComponentProps<'div'> {
    handleChange?: (value: SelectItem) => void;
    placeholder?: string;
    /* should call handleChange on the default value? */
    shouldCallHandleChange?: boolean;
}

export default function Select({
    className,
    children,
    handleChange = (_: SelectItem) => {},
    placeholder,
    shouldCallHandleChange = false,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleOutsideClick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const defaultSelectedIndex = Children.toArray(children).findLastIndex(
            (child) => (child as ReactElement).props.selected
        );
        const defaultSelected = Children.toArray(children)[defaultSelectedIndex] as ReactElement;

        if (defaultSelected) {
            const item: SelectItem = { label: defaultSelected.props.children, value: defaultSelected.props.value };
            setSelected(item);
            if (shouldCallHandleChange) handleChange(item);
        }
    }, [children, handleChange, shouldCallHandleChange]);

    return (
        <OutsideClickDetector callback={handleOutsideClick}>
            <div
                className={twMerge('group relative cursor-pointer select-none', className)}
                onClick={handleRootClick}
                data-open={isOpen}
            >
                <button className="flex flex-wrap items-center justify-between gap-2 whitespace-nowrap rounded-lg bg-zinc-200 px-2 py-1.5 text-start text-sm text-gray transition-all duration-300 hover:bg-zinc-400 hover:text-white">
                    {selected?.label || placeholder}
                    <BsArrow90DegDown className="min-h-[15px] min-w-[15px] transition-all duration-75 group-data-[open=true]:rotate-180" />
                </button>
                {isOpen && (
                    <div className="dropdown absolute left-0 top-9 rounded-md bg-white py-1.5 text-sm text-gray shadow-lg">
                        {children}
                    </div>
                )}
            </div>
        </OutsideClickDetector>
    );
}
