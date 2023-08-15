'use client';

import { Trip } from '@/types/Trip';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import Link from 'next/link';

interface Props {
    trip: Trip;
    href?: string;
}

export default function Trip({ trip, href }: Props) {
    return (
        <Link href={href || '#'}>
            <div className="mb-5 flex w-[280px] flex-col">
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

                <div className="mt-2 flex flex-col">
                    <h1 className="mb-1 text-sm font-medium text-darkPurple">{trip.name}</h1>
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
        </Link>
    );
}
