import React, { MouseEventHandler } from 'react';
import { Trip } from '@/types/Trip';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';

interface Props {
    trip: Trip;
    onClick: MouseEventHandler<HTMLDivElement>;
}

export default function Trip({ trip, onClick }: Props) {
    return (
        <div className="flex flex-col mb-5 w-[280px] cursor-pointer" onClick={onClick}>
            <div className="relative h-[280px] w-full">
                <Image
                    src={trip.coverImage}
                    fill
                    alt="Cover Image"
                    style={{
                        objectFit: 'cover',
                    }}
                    className="rounded-2xl"
                />
            </div>

            <div className="flex flex-col mt-2">
                <h1 className="text-sm font-medium text-darkPurple mb-1">{trip.name}</h1>
                <div className="flex gap-1">
                    <ReactCountryFlag countryCode={trip.countryCode} svg />
                    <span className="text-xs text-gray">{trip.location}</span>
                </div>
                <div className="flex gap-1">
                    <span className="text-xs font-semibold text-purple">R${trip.pricePerDay}</span>{' '}
                    <span className="text-xs text-gray">por noite</span>
                </div>
            </div>
        </div>
    );
}
