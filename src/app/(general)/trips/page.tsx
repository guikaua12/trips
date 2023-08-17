import React from 'react';
import { searchTrip, TripSearchQueryParams, TripSearchSchemaType } from '@/services/trips';
import { parseISO } from 'date-fns';
import { isIsoDateString } from '@/utils/dateUtils';
import TripComponent from '@/components/Trip';
import { MdOutlineSearchOff } from 'react-icons/md';

type Props = {
    searchParams: TripSearchQueryParams;
};

export const metadata = {
    title: 'Busca / Trips',
};

export default async function TripSearchPage({ searchParams }: Props) {
    const parsed: TripSearchSchemaType = {
        location: searchParams.location,
        startDate: isIsoDateString(searchParams.startDate) ? parseISO(searchParams.startDate!) : undefined,
        pricePerDay: Number(searchParams.pricePerDay) || undefined,
    };

    const { trips, error, message } = await searchTrip(parsed);

    return (
        <div className="flex flex-col items-center p-4">
            {!!trips?.length && (
                <>
                    <h1 className="text-lg font-semibold text-darkPurple">Hospedagens Encontradas</h1>
                    <p className="font-medium text-gray">Listamos os melhores locais para você!</p>

                    <div className="flex flex-col items-center justify-center p-4 sm:flex-row sm:gap-16">
                        {trips.map((trip) => (
                            <TripComponent key={trip.id} trip={trip} href={`/trips/${trip.id}`} />
                        ))}
                    </div>
                </>
            )}

            {!trips?.length && (
                <div className="flex items-center justify-center">
                    <MdOutlineSearchOff size={50} className="text-darkPurple" />
                    <h1 className="whitespace-pre-wrap font-semibold text-darkPurple">
                        Nenhuma hospedagem encontrada!
                    </h1>
                </div>
            )}
        </div>
    );
}
