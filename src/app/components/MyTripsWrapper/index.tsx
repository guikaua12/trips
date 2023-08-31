'use client';

import React, { useCallback, useState } from 'react';
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
import OrderBy from '@/app/components/OrderBy';
import MyTripsWrapperSkeleton from '@/app/components/MyTripsWrapperSkeleton';

type MyTripsWrapperProps = {
    response: GetAllTripReservationsResponseType;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function MyTripsWrapper({ response: defaultResponse }: MyTripsWrapperProps) {
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState<GetAllTripReservationsResponseType>(defaultResponse);
    // const [sortBy, setSortBy] = useState<SelectItem | null>(null);
    // const [sortDir, setSortDir] = useState<SelectItem | null>(null);
    const [items, setItems] = useState<TripReservation[]>(defaultResponse.tripReservations || []);
    const [loading, setLoading] = useState(false);

    const alert = useCallback((message: string, type: TypeOptions) => toast(message, { type: type }), []);

    const next = async () => {
        console.log('next');

        const nextPage = page + 1;
        setPage((lastPage) => nextPage);

        const response = await getAllTripReservations({ page: nextPage });
        setResponse(response);

        if (response.tripReservations) {
            setItems((prevState) => [...prevState, ...response.tripReservations!]);
        }
    };

    const handleCancelClick = async (tripReservation: TripReservation) => {
        const response = await cancelTripReservation(tripReservation.id);
        console.log(response);

        if (response.error) {
            alert(response.message!, 'error');
            return;
        }

        if (!response.tripReservation) return;

        // setItems((prevState) => [...prevState, tripReservation]);
        setItems((prevState) =>
            prevState.map((item) => (item.id === tripReservation.id ? response.tripReservation! : item))
        );

        alert('Viagem cancelada com sucesso!', 'success');
    };

    // const handleSortByChange = async (item: SelectItem) => {
    //     // setSortBy(item);
    //
    //     try {
    //         setLoading(true);
    //         await delay(650);
    //         const response = await getAllTripReservations({
    //             sort_by: item.value,
    //             sort_dir: sortDir?.value,
    //             page: 1,
    //         });
    //
    //         setResponse(response);
    //
    //         if (response.tripReservations) {
    //             setItems(response.tripReservations);
    //         }
    //     } catch (e) {
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleSortDirChange = async (item: SelectItem) => {
    //     setSortDir(item);
    //
    //     try {
    //         setLoading(true);
    //         await delay(650);
    //         const response = await getAllTripReservations({
    //             sort_by: sortBy?.value,
    //             sort_dir: item.value,
    //             page: 1,
    //         });
    //
    //         setResponse(response);
    //
    //         if (response.tripReservations) {
    //             setItems(response.tripReservations);
    //         }
    //     } catch (e) {
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <>
            <div className="mb-4 flex justify-end gap-1">
                <OrderBy
                    className="mb-4"
                    handleChange={(item) => {
                        console.log(item);
                    }}
                />
                {/*<OrderDir className="mb-4" selected={sortDir} handleChange={handleSortDirChange} />*/}
            </div>
            {!loading && items.length && (
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
            )}

            {!loading && !items.length && <p className="text-center">Nenhuma hospedagem encontrada!</p>}

            {loading && <MyTripsWrapperSkeleton quantity={2} />}
        </>
    );
}
