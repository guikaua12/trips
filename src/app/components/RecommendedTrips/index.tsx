'use client';

import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Trip } from '@/types/Trip';
import TripComponent from '@/components/Trip';
import { useRouter } from 'next/navigation';

interface RecommendedTripsProps {
    trips: Trip[];
}

export default function RecommendedTrips({ trips }: RecommendedTripsProps) {
    const { push } = useRouter();

    return (
        <div className="container m-auto p-4">
            <SectionTitle className="mx-auto mb-3">Destinos Recomendados</SectionTitle>
            <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-16">
                {trips.map((trip) => {
                    return (
                        <TripComponent
                            key={trip.id}
                            trip={trip}
                            onClick={() => {
                                push(`/trips/${trip.id}`);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
