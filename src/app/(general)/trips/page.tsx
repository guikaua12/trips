import React from 'react';
import { searchTrip, TripSearchQueryParams, TripSearchSchemaType } from '@/services/trips';
import { parseISO } from 'date-fns';
import { isIsoDateString } from '@/utils/dateUtils';
import SearchTripsResult from '@/app/(general)/trips/SearchTripsResult';

type Props = {
    searchParams: TripSearchQueryParams;
};

export const metadata = {
    title: 'Busca / Trips',
};

export default async function TripSearchPage({ searchParams }: Props) {
    const parsed: TripSearchSchemaType = {
        location: searchParams.location,
        startDate: isIsoDateString(searchParams.startDate) ? parseISO(searchParams.startDate!) : undefined,
        pricePerDay: Number(searchParams.pricePerDay) || undefined,
    };

    const { trips, error, message } = await searchTrip(parsed);

    return (
        <div className="flex flex-col items-center p-4">
            {
                <SearchTripsResult
                    trips={
                        trips || [
                            {
                                id: 'b5b08318-0ffd-4587-9f05-a2965cc7a9ac',
                                name: 'Hotel Aurora',
                                description:
                                    'O Hotel Aurora é um refúgio encantador situado em meio às majestosas montanhas. Com seus jardins exuberantes e uma arquitetura elegante, o Aurora oferece quartos espaçosos e bem decorados, gastronomia premiada, um spa luxuoso e uma variedade de instalações de lazer. É o lugar perfeito para os viajantes que buscam uma escapada relaxante e rejuvenescedora, proporcionando uma experiência memorável em um cenário deslumbrante.',
                                startDate: new Date('2023-07-03'),
                                endDate: new Date('2023-07-30'),
                                location: 'Amalfi, Itália',
                                countryCode: 'IT',
                                coverImage:
                                    'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=M3wxMA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                                imagesUrl: [
                                    'https://images.unsplash.com/photo-1538683270504-3d09ad7ae739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                                    'https://images.unsplash.com/photo-1528215747454-3d0e0902fff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
                                    'https://images.unsplash.com/photo-1534612899740-55c821a90129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                                ],
                                pricePerDay: 250,
                                highlights: [
                                    'Café da manhã incluso',
                                    'Piscina',
                                    'Wifi grátis',
                                    'Estacionamento grátis',
                                    'Vista paradisíaca',
                                    'Luxuoso',
                                ],
                                recommended: true,
                                maxGuests: 5,
                            },
                        ]
                    }
                />
            }
        </div>
    );
}
