import React from 'react';
import MyTrip from '@/components/MyTrip';
import { verifySession } from '@/services/users';
import { cookies } from 'next/headers';
import Redirect from '@/app/components/Redirect';
import { cancelTripReservation, getAllTripReservations } from '@/services/tripResevations';
import { TripReservation } from '@/types/TripReservation';
import MyTripsWrapper from '@/app/components/MyTripsWrapper';

export const metadata = {
    title: 'Minhas viagens / Trips',
};

export default async function OrdersPage() {
    const token = cookies().get('trips_token')?.value;

    const user = await verifySession(token);
    if (!user) return <Redirect to="/auth/login" />;

    const response = await getAllTripReservations(token);
    const tripReservations = response.tripReservations;

    return (
        <div className="mb-8 p-5">
            <h2 className="mb-4">Minhas viagens</h2>

            <MyTripsWrapper defaultTripReservations={tripReservations} />
        </div>
    );
}
