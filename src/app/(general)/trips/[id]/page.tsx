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
import ImageDivider from '@/components/ImageDivider';

type TripDetailsProps = {
    params: { id: string };
};

export default async function TripDetailsPage({ params: { id } }: TripDetailsProps) {
    const user = await verifySession(cookies().get('trips_token')?.value);
    if (!user) return <Redirect to="/auth/login" />;

    const trip = await getTrip(id);
    if (!trip) return <Redirect to="/" />;

    return (
        <div className="sm:container sm:mx-auto sm:max-w-7xl">
            <div className="flex flex-col sm:flex-col-reverse">
                {/*<ImageDivider images={[trip.coverImage, ...trip.imagesUrl]} />*/}
                <ImageDivider images={[trip.coverImage, ...trip.imagesUrl]} gap="4px" />
                <div className="p-4 sm:p-0">
                    <h1 className="text-xl font-semibold text-darkPurple">{trip.name}</h1>

                    <LocationWithFlag countryCode={trip.countryCode} location={trip.location} />
                </div>
            </div>

            <div className="px-4 sm:p-0">
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
