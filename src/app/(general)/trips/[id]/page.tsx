import React from 'react';
import { getTrip } from '@/services/trips';
import Redirect from '@/app/components/Redirect';
import Image from 'next/image';
import { verifySession } from '@/services/users';
import { cookies } from 'next/headers';
import TripReservation from '@/app/components/TripReservation';
import Separator from '@/components/Separator';
import { FaRegCircleCheck } from 'react-icons/fa6';
import LocationWithFlag from '@/app/components/LocationWithFlag';

type TripDetailsProps = {
    params: { id: string };
};

export default async function TripDetailsPage({ params: { id } }: TripDetailsProps) {
    const user = await verifySession(cookies().get('trips_token')?.value);
    if (!user) return <Redirect to="/auth/login" />;

    const trip = await getTrip(id);
    if (!trip) return <Redirect to="/" />;

    return (
        <div className="min-h-[85%] w-full">
            <div className="relative h-[250px] w-full">
                <Image src={trip.coverImage} fill alt="Cover image" className="flex object-cover" />
            </div>

            <div className="p-5">
                <h1 className="text-xl font-semibold text-darkPurple">{trip.name}</h1>

                <LocationWithFlag countryCode={trip.countryCode} location={trip.location} />

                <TripReservation trip={trip} />

                <Separator className="my-8" />

                <div className="mb-8 w-full">
                    <h2 className="mb-1 font-semibold text-darkPurple">Sobre a viagem</h2>
                    <p className="text-xs text-darkPurple">{trip.description}</p>
                </div>

                <div className="mb-8 w-full">
                    <h2 className="mb-1 font-semibold text-darkPurple">Destaques</h2>
                    <div className="grid w-full grid-cols-2 gap-y-2">
                        {trip.highlights.map((highlight) => (
                            <div key={highlight} className="flex gap-1">
                                <FaRegCircleCheck className="min-w-[1.25rem] text-purple" />
                                <span className="text-xs text-gray">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
