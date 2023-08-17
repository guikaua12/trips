import React from 'react';
import ReactCountryFlag from 'react-country-flag';

type LocationWithFlagProps = {
    countryCode: string;
    location: string;
};

export default function LocationWithFlag({ countryCode, location }: LocationWithFlagProps) {
    return (
        <div className="mb-1 flex gap-1">
            <ReactCountryFlag countryCode={countryCode} svg />
            <span className="text-xs font-medium text-gray underline">{location}</span>
        </div>
    );
}
