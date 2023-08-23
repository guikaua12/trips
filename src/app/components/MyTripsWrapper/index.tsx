'use client';

import React, { useEffect, useState } from 'react';
import MyTrip from '@/components/MyTrip';
import { TripReservation } from '@/types/TripReservation';
import { cancelTripReservation, getAllTripReservations } from '@/services/tripResevations';

type MyTripsWrapperProps = {
    defaultTripReservations?: TripReservation[] | undefined;
};

export default function MyTripsWrapper({ defaultTripReservations }: MyTripsWrapperProps) {
    const [tripReservations, setTripReservations] = useState<TripReservation[]>(defaultTripReservations || []);

    const fetchTripReservations = async () => {
        const response = await getAllTripReservations();

        if (response.tripReservations) {
            setTripReservations(response.tripReservations);
        }
    };

    const handleCancelClick = async ({ id }: TripReservation) => {
        console.log('cancel');

        const response = await cancelTripReservation(id);
        console.log(response);

        if (response.tripReservation) {
            await fetchTripReservations();
        }
    };

    return (
        <div className="flex flex-col gap-5">
            {tripReservations &&
                tripReservations.map((tripReservation) => (
                    <MyTrip
                        key={tripReservation.id}
                        tripReservation={tripReservation}
                        handleCancelClick={handleCancelClick}
                    />
                ))}
        </div>
    );
}
