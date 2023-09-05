import React from 'react';
import { verifySession } from '@/services/users';
import { cookies } from 'next/headers';
import Redirect from '@/app/components/Redirect';
import { getAllTripReservations } from '@/services/tripResevations';
import MyTripsWrapper from '@/app/components/MyTripsWrapper';

export const metadata = {
    title: 'Minhas viagens / Trips',
};

export default async function OrdersPage() {
    const token = cookies().get('trips_token')?.value;

    const user = await verifySession(token);
    if (!user) return <Redirect to="/auth/login" />;

    const response = await getAllTripReservations({ page_start: 1, token });

    return (
        <div className="container mx-auto mb-8 p-5">
            <h2 className="mb-4">Minhas viagens</h2>

            <MyTripsWrapper response={response} />
        </div>
    );
}
