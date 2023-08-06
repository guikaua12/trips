import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Trip } from '@/types/Trip';
import TripComponent from '@/components/Trip';

interface RecommendedTripsProps {
    trips: Trip[];
}

export default function RecommendedTrips({ trips }: RecommendedTripsProps) {
    return (
        <div className="p-4 container m-auto">
            <SectionTitle className="mb-3 m-auto">Destinos Recomendados</SectionTitle>
            <div className="flex flex-col items-center sm:flex-row sm:gap-8 sm:justify-center sm:gap-16">
                {trips.map((trip) => {
                    return <TripComponent key={trip.id} trip={trip} />;
                })}
            </div>
        </div>
    );
}
