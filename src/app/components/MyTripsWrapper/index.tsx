'use client';

import React, { useCallback, useEffect, useState } from 'react';
import MyTrip from '@/components/MyTrip';
import { TripReservation } from '@/types/TripReservation';
import {
    cancelTripReservation,
    getAllTripReservations,
    GetAllTripReservationsResponseType,
} from '@/services/tripResevations';
import { toast, TypeOptions } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircleLoading from '@/components/CircleLoading';

type MyTripsWrapperProps = {
    response: GetAllTripReservationsResponseType;
};

export default function MyTripsWrapper({ response: defaultResponse }: MyTripsWrapperProps) {
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState<GetAllTripReservationsResponseType>(defaultResponse);
    const alert = useCallback((message: string, type: TypeOptions) => toast(message, { type: type }), []);

    const [items, setItems] = useState<TripReservation[]>(defaultResponse.tripReservations || []);

    const next = async () => {
        console.log('next');

        const nextPage = page + 1;
        setPage((lastPage) => nextPage);

        const response = await getAllTripReservations(nextPage);
        setResponse(response);

        if (response.tripReservations) {
            setItems((prevState) => [...prevState, ...response.tripReservations!]);
        }
    };

    const handleCancelClick = async ({ id }: TripReservation) => {
        const response = await cancelTripReservation(id);

        if (response.error) {
            alert(response.message!, 'error');
            return;
        }

        alert('Viagem cancelada com sucesso!', 'success');
        // await next();
    };

    return (
        <div className="flex flex-col gap-5">
            <InfiniteScroll
                className="flex flex-col gap-5"
                dataLength={items.length}
                next={next}
                hasMore={page - 1 < response.pages!}
                loader={
                    <div className="flex w-full items-center justify-center">
                        <CircleLoading />
                    </div>
                }
                endMessage={<p className="text-center">Não há mais nada para carregar.</p>}
            >
                {items.map((tripReservation) => (
                    <MyTrip
                        key={tripReservation.id}
                        tripReservation={tripReservation}
                        handleCancelClick={handleCancelClick}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
}
