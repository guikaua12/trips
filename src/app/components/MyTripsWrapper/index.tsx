'use client';

import React, { useCallback, useState } from 'react';
import MyTrip from '@/components/MyTrip';
import { TripReservation } from '@/types/TripReservation';
import {
    cancelTripReservation,
    getAllTripReservations,
    GetAllTripReservationsResponseType,
    SortByType,
    SortDirType,
} from '@/services/tripResevations';
import { toast, TypeOptions } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircleLoading from '@/components/CircleLoading';
import OrderBy from '@/app/components/OrderBy';
import MyTripsWrapperSkeleton from '@/app/components/MyTripsWrapperSkeleton';
import { SelectItem } from '@/components/SelectToggle/Select';
import OrderDir from '@/app/components/OrderDir';

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
        const nextPage = state.page + 1;
        const response = await getAllTripReservations({
            page_start: nextPage,
            sort_by: state.sortBy as SortByType,
            sort_dir: state.sortDir as SortDirType,
        });

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

        if (response.error) {
            alert(response.message!, 'error');
            return;
        }

        if (!response.tripReservation) return;

        const getAllResponse = await getAllTripReservations({
            sort_by: state.sortBy as SortByType,
            sort_dir: state.sortDir as SortDirType,
            page_start: 1,
            page_end: state.page,
        });

        if (getAllResponse.tripReservations) {
            setState((prevState) => ({ ...prevState, items: getAllResponse.tripReservations! }));
        }

        alert('Viagem cancelada com sucesso!', 'success');
    };

    const handleSortByChange = async (item: SelectItem) => {
        try {
            setState((prevState) => ({ ...prevState, sortBy: item.value, loading: true }));
            await delay(650);
            const response = await getAllTripReservations({
                sort_by: item.value as SortByType,
                sort_dir: state.sortDir as SortDirType,
                page_start: 1,
                page_end: state.page,
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

    const handleSortDirChange = async (item: SelectItem) => {
        try {
            setState((prevState) => ({ ...prevState, sortDir: item.value, loading: true }));
            await delay(650);
            const response = await getAllTripReservations({
                sort_by: state.sortBy as SortByType,
                sort_dir: item.value as SortDirType,
                page_start: 1,
                page_end: state.page,
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

    return (
        <>
            {state.items.length > 0 && (
                <div className="mb-4 flex flex-wrap justify-end gap-1">
                    <OrderBy className="mb-4" handleChange={handleSortByChange} />
                    <OrderDir className="mb-4" handleChange={handleSortDirChange} />
                </div>
            )}

            {!state.loading && state.items.length > 0 && (
                <InfiniteScroll
                    className="flex flex-col gap-5"
                    dataLength={state.items.length}
                    next={next}
                    hasMore={state.page < state.response.pages!}
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

            {!state.loading && state.items.length == 0 && (
                <p className="mt-8 text-center">Nenhuma hospedagem encontrada!</p>
            )}

            {state.loading && <MyTripsWrapperSkeleton quantity={2} />}
        </>
    );
}
