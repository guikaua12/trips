import React from 'react';
import { getTrip } from '@/services/trips';
import Redirect from '@/app/components/Redirect';
import TripReservation from '@/app/components/TripReservation';
import Separator from '@/components/Separator';
import { FaRegCircleCheck } from 'react-icons/fa6';
import LocationWithFlag from '@/app/components/LocationWithFlag';
import ImageDivider from '@/components/ImageDivider';

type TripDetailsProps = {
    params: { id: string };
};

export default async function TripDetailsPage({ params: { id } }: TripDetailsProps) {
    const trip = await getTrip(id);
    if (!trip) return <Redirect to="/" />;

    return (
        <div className="flex flex-col gap-1 sm:container sm:mx-auto sm:max-w-7xl sm:gap-10">
            <div className="flex flex-col sm:flex-col-reverse">
                <ImageDivider
                    images={[trip.coverImage, ...trip.imagesUrl]}
                    gap="4px"
                    desktopClassName="mx-6 h-96 min-h-[24rem] overflow-hidden rounded-2xl"
                    mobileClassName="h-64 min-h-[16rem]"
                />
                <div className="px-6 py-3 sm:mb-4 sm:mt-6">
                    <h1 className="text-xl font-semibold text-darkPurple">{trip.name}</h1>

                    <LocationWithFlag countryCode={trip.countryCode} location={trip.location} />
                </div>
            </div>

            <div className="flex min-w-[50%] flex-col-reverse gap-x-20 px-6 sm:flex-row">
                <div className="left">
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

                <div className="flex flex-col sm:h-fit sm:min-w-[24rem] sm:flex-row sm:rounded-xl sm:border sm:border-lightGray sm:px-3 sm:py-6 sm:shadow-lg">
                    <TripReservation trip={trip} className="w-full" />

                    <Separator className="my-8 sm:hidden" />
                </div>
            </div>
        </div>
    );
}
