import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Trip } from '@/types/Trip';
import TripComponent from '@/components/Trip';

interface RecommendedTripsProps {
    trips: Trip[];
}

export default function RecommendedTrips({ trips }: RecommendedTripsProps) {
    return (
        <div className="p-4">
            <SectionTitle className="mb-3">Destinos Recomendados</SectionTitle>
            <div className="flex flex-col items-center">
                {trips.map((trip) => {
                    return <TripComponent key={trip.id} trip={trip} />;
                })}
            </div>
        </div>
    );
}
