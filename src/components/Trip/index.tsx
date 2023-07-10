import React from 'react';
import { Trip } from '@/types/Trip';
import Image from 'next/image';

interface Props {
    trip: Trip;
}

export default function Trip({ trip }: Props) {
    return (
        <div className="flex flex-col mb-5">
            <div className="relative w-[280] h-[280]">
                <Image
                    src={trip.coverImage}
                    width={300}
                    height={300}
                    alt="Cover Image"
                    className="rounded-2xl object-cover"
                />
            </div>

            <div className="flex flex-col w-full mt-2">
                <h1 className="text-sm font-medium text-darkPurple mb-1">{trip.name}</h1>
                <span className="text-xs text-gray">{trip.location}</span>
                <div className="flex gap-1">
                    <span className="text-xs font-semibold text-purple">R${trip.pricePerDay}</span>{' '}
                    <span className="text-xs text-gray">por noite</span>
                </div>
            </div>
        </div>
    );
}
