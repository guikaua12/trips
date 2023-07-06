import React from 'react';

interface Props {
    children: React.ReactNode;
    icon: React.ReactNode;
}

export default function QuickSearchItem({ children, icon }: Props) {
    return (
        <div className="flex flex-col items-center text-sm">
            {icon}
            {children}
        </div>
    );
}
