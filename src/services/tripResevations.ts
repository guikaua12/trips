import { z } from 'zod';
import { TripReservation } from '@/types/TripReservation';
import { api } from '@/services/api';
import { AxiosError } from 'axios';
import nookies from 'nookies';
import { handleDates } from '@/utils/dateUtils';
import { objectToQueryParams } from '@/utils/urlUtils';

const TripReservationSchema = z.object({
    tripId: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    totalPaid: z.number(),
    guests: z
        .number({
            required_error: 'O número de hóspedes é obrigatório',
            invalid_type_error: 'O número de hóspedes é obrigatório',
        })
        .min(1, 'O número de hóspedes deve ser maior que 1'),
});

type TripReservationSchemaType = z.infer<typeof TripReservationSchema>;

type TripReservationResponseType = {
    tripReservation?: TripReservation;
    error?: boolean;
    message?: string;
};

export async function reservateTrip({
    tripId,
    startDate,
    endDate,
    totalPaid,
    guests,
}: TripReservationSchemaType): Promise<TripReservationResponseType> {
    try {
        const response = await api.post('/tripReservations/reserve', {
            tripId,
            startDate,
            endDate,
            totalPaid,
            guests,
        });
        return response.data;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return err.response.data;
        }

        return {};
    }
}

export type SortByType = 'createdAt' | 'totalPaid';

export type GetAllTripReservationsType = {
    token?: string;
    sort_by?: SortByType;
    sort_dir?: string;
    limit?: number;
    page_start?: number;
    page_end?: number;
};

export type GetAllTripReservationsResponseType = {
    tripReservations?: TripReservation[];
    pages?: number;
    error?: boolean;
    message?: string;
};

export async function getAllTripReservations({
    token,
    sort_by,
    sort_dir,
    limit,
    page_start,
    page_end = page_start,
}: GetAllTripReservationsType): Promise<GetAllTripReservationsResponseType> {
    if (!token) token = nookies.get({}).trips_token;
    if (!token) return {};

    try {
        const response = await api.get(
            `/tripReservations/getall${objectToQueryParams({ sort_by, sort_dir, limit, page_start, page_end })}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        handleDates(response.data);

        return response.data;
    } catch (err) {
        if (err instanceof AxiosError && err.response) return err.response.data;

        return {};
    }
}

type CancelTripReservationResponseType = {
    tripReservation?: TripReservation;
    error?: boolean;
    message?: string;
};

export async function cancelTripReservation(id: string): Promise<CancelTripReservationResponseType> {
    try {
        const response = await api.patch(`/tripReservations/cancel/${id}`);

        return response.data;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return err.response.data;
        }

        return {};
    }
}
