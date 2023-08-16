import React, { useEffect, useRef } from 'react';

type Props = {
    children: React.ReactNode;
    callback: () => void;
};

const OutsideClickDetector: React.FC<Props> = ({ children, callback }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [callback]);

    return <div ref={ref}>{children}</div>;
};

export default OutsideClickDetector;
