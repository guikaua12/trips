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
import { SelectItem } from '@/components/SelectToggle/Select';

type MyTripsWrapperProps = {
    response: GetAllTripReservationsResponseType;
};

type State = {
    page: number;
    response: GetAllTripReservationsResponseType;
    items: TripReservation[];
    loading: boolean;
    sortBy?: string | null;
    sortDir?: string | null;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function MyTripsWrapper({ response: defaultResponse }: MyTripsWrapperProps) {
    const [state, setState] = useState<State>({
        page: 1,
        response: defaultResponse,
        items: defaultResponse.tripReservations || [],
        loading: false,
        sortBy: undefined,
        sortDir: undefined,
    });

    const alert = useCallback((message: string, type: TypeOptions) => toast(message, { type: type }), []);

    const next = async () => {
        console.log('next');
        const nextPage = state.page + 1;
        console.log(nextPage);
        const response = await getAllTripReservations({ page_start: nextPage });

        if (!response.tripReservations) return;

        setState((prevState) => ({
            ...prevState,
            page: nextPage,
            response,
            items: [...prevState.items, ...response.tripReservations!] || [],
        }));
    };

    const handleCancelClick = async (tripReservation: TripReservation) => {
        const response = await cancelTripReservation(tripReservation.id);
        console.log(response);

        if (response.error) {
            alert(response.message!, 'error');
            return;
        }

        if (!response.tripReservation) return;

        // // setItems((prevState) => [...prevState, tripReservation]);
        // setItems((prevState) =>
        //     prevState.map((item) => (item.id === tripReservation.id ? response.tripReservation! : item))
        // );

        alert('Viagem cancelada com sucesso!', 'success');
    };

    const handleSortByChange = async (item: SelectItem) => {
        try {
            setState((prevState) => ({ ...prevState, sortBy: item.value, loading: true }));
            await delay(650);
            const response = await getAllTripReservations({
                sort_by: item.value,
                sort_dir: state.sortDir || undefined,
                page_start: 1,
            });

            setState((prevState) => ({
                ...prevState,
                response,
                items: response.tripReservations || [],
            }));
        } catch (e) {
        } finally {
            setState((prevState) => ({ ...prevState, loading: false }));
        }
    };

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
                <OrderBy className="mb-4" handleChange={handleSortByChange} />
                {/*<OrderDir className="mb-4" selected={sortDir} handleChange={handleSortDirChange} />*/}
            </div>
            {!state.loading && state.items.length && (
                <InfiniteScroll
                    className="flex flex-col gap-5"
                    dataLength={state.items.length}
                    next={next}
                    hasMore={state.page - 1 < state.response.pages!}
                    loader={
                        <div className="flex w-full items-center justify-center">
                            <CircleLoading />
                        </div>
                    }
                    endMessage={<p className="text-center">Não há mais nada para carregar.</p>}
                >
                    {state.items.map((tripReservation) => (
                        <MyTrip
                            key={tripReservation.id}
                            tripReservation={tripReservation}
                            handleCancelClick={handleCancelClick}
                        />
                    ))}
                </InfiniteScroll>
            )}

            {!state.loading && !state.items.length && <p className="text-center">Nenhuma hospedagem encontrada!</p>}

            {state.loading && <MyTripsWrapperSkeleton quantity={2} />}
        </>
    );
}
