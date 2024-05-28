import React from 'react';
import TripComponent from '@/components/Trip';
import { Trip } from '@/types/Trip';
import { MdOutlineSearchOff } from 'react-icons/md';

export type SearchTripsResultProps = {
    trips: Trip[];
};

const SearchTripsResult = ({ trips }: SearchTripsResultProps) => {
    return trips.length ? (
        <>
            <h1 className="text-lg font-semibold text-darkPurple">Hospedagens Encontradas</h1>
            <p className="font-medium text-gray">Listamos os melhores locais para você!</p>

            <div className="flex flex-col items-center justify-center p-4 sm:flex-row sm:gap-16">
                {trips.map((trip) => (
                    <TripComponent key={trip.id} trip={trip} href={`/trips/${trip.id}`} />
                ))}
            </div>
        </>
    ) : (
        <div className="flex items-center justify-center">
            <MdOutlineSearchOff size={50} className="text-darkPurple" />
            <p className="whitespace-pre-wrap font-semibold text-darkPurple">Nenhuma hospedagem encontrada!</p>
        </div>
    );
};

export default SearchTripsResult;
