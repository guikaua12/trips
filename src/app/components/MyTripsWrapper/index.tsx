'use client';

import React, { useCallback, useEffect, useState } from 'react';
import MyTrip from '@/components/MyTrip';
import { TripReservation } from '@/types/TripReservation';
import { cancelTripReservation, getAllTripReservations } from '@/services/tripResevations';
import { toast, TypeOptions } from 'react-toastify';

type MyTripsWrapperProps = {
    defaultTripReservations?: TripReservation[] | undefined;
};

export default function MyTripsWrapper({ defaultTripReservations }: MyTripsWrapperProps) {
    const [tripReservations, setTripReservations] = useState<TripReservation[]>(defaultTripReservations || []);
    const alert = useCallback((message: string, type: TypeOptions) => toast(message, { type: type }), []);

    const fetchTripReservations = async () => {
        const response = await getAllTripReservations();

        if (response.tripReservations) {
            setTripReservations(response.tripReservations);
        }
    };

    const handleCancelClick = async ({ id }: TripReservation) => {
        const response = await cancelTripReservation(id);

        if (response.error) {
            alert(response.message!, 'error');
            return;
        }

        alert('Viagem cancelada com sucesso!', 'success');
        await fetchTripReservations();
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
