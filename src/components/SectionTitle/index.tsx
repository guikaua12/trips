import React from 'react';

interface Props {
    children: React.ReactNode;
}

export default function SectionTitle({ children }: Props) {
    return (
        <h2
            className="flex items-center gap-2 w-full whitespace-nowrap font-medium before:block before:h-[1px] before:w-full before:bg-lightGray
        after:block after:h-[1px] after:w-full after:bg-lightGray"
        >
            {children}
        </h2>
    );
}
