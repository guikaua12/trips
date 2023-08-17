import { z } from 'zod';
import { TripReservation } from '@/types/TripReservation';
import { api } from '@/services/api';
import { AxiosError } from 'axios';
import nookies from 'nookies';
import { handleDates } from '@/utils/dateUtils';

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

type GetAllTripReservationsResponseType = {
    tripReservations?: TripReservation[];
    error?: boolean;
    message?: string;
};

export async function getAllTripReservations(token?: string): Promise<GetAllTripReservationsResponseType> {
    if (!token) token = nookies.get({}).trips_token;
    if (!token) return {};

    try {
        const response = await api.get('/tripReservations/getall', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        handleDates(response.data);

        return response.data;
    } catch (err) {
        if (err instanceof AxiosError && err.response) return err.response.data;

        return {};
    }
}
