import React from 'react';
import MyTrip from '@/components/MyTrip';
import { verifySession } from '@/services/users';
import { cookies } from 'next/headers';
import Redirect from '@/app/components/Redirect';
import { getAllTripReservations } from '@/services/tripResevations';

export const metadata = {
    title: 'Minhas viagens / Trips',
};

export default async function OrdersPage() {
    const token = cookies().get('trips_token')?.value;

    const user = await verifySession(token);
    if (!user) return <Redirect to="/auth/login" />;

    const tripReservations = (await getAllTripReservations(token)).tripReservations;

    return (
        <div className="mb-8 p-5">
            <h2 className="mb-4">Minhas viagens</h2>

            <div className="flex flex-col gap-5">
                {tripReservations &&
                    tripReservations.map((tripReservation) => <MyTrip tripReservation={tripReservation} />)}
            </div>
        </div>
    );
}
