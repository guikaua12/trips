'use client';

import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type Props = {
    images: string[];
    gap?: string | number;
    partSize?: number;
    mobileClassName?: string;
    desktopClassName?: string;
};

function divideArrayIntoParts<T>(arr: T[], partSize: number, skip: number = 0) {
    const result = [];

    for (let i = skip; i < arr.length; i += partSize) {
        const part = arr.slice(i, i + partSize);
        result.push(part);
    }

    return result;
}

const ImageDivider = ({ images, gap = '4px', partSize = 2, mobileClassName = '', desktopClassName = '' }: Props) => {
    const [width, setWidth] = useState(0);

    const groups = useMemo(() => divideArrayIntoParts(images, partSize, 1), [images, partSize]);

    useEffect(() => {
        setWidth(window.innerWidth);
        const onResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    const drawImage = useCallback((src: string = '', className: string = '') => {
        return (
            <div className={twMerge('trip-image relative h-full w-full', className)}>
                <Image src={src} fill alt="Cover image" className="object-cover" />
            </div>
        );
    }, []);

    /*const GroupWrapper = (length: number, children: ReactNode) => {
        const flexDirection = length === partSize ? 'column' : 'row';
        return (
            <div className="groupWrapper flex h-full w-full" style={{ flexDirection }}>
                {children}
            </div>
        );
    };*/

    return width > 640 ? (
        <div className={twMerge('flex flex-row', desktopClassName)} style={{ gap }}>
            {drawImage(images[0])}
            {groups.length > 0 && (
                <div className="flex h-full w-full flex-col" style={{ gap }}>
                    {groups.map((group, index) => {
                        if (group.length == partSize) {
                            const flexDirection = groups.length > 1 ? 'row' : 'column';
                            return (
                                <div key={index} className="flex h-full w-full" style={{ flexDirection, gap }}>
                                    {group.map((img) => drawImage(img))}
                                </div>
                            );
                        }

                        return drawImage(group[0]);
                    })}
                </div>
            )}
        </div>
    ) : (
        <div className={twMerge('flex w-full snap-x snap-mandatory overflow-scroll', mobileClassName)}>
            {images.map((img) => drawImage(img, 'min-w-full snap-start'))}
        </div>
    );
};

export default ImageDivider;
