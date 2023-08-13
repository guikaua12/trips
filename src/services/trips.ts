import { api } from '@/services/api';
import { Trip } from '@/types/Trip';
import { handleDates } from '@/utils/dateUtils';
import { z } from 'zod';
import { preprocessUndefined } from '@/utils/zodUtils';
import { AxiosError } from 'axios';

export const TripSearchSchema = z
    .object({
        location: z.preprocess(preprocessUndefined, z.string().optional()),
        startDate: z.union([z.date().min(new Date(), 'Data inicial inválida.'), z.null(), z.undefined()]),
        pricePerDay: z.union([z.number().positive('O valor mínimo é de R$1,00'), z.nan()]),
        recommended: z.boolean(),
    })
    .partial()
    .superRefine((data, ctx) => {
        // at least one field
        if (Object.values(data).some((value) => !!value)) return;

        ctx.addIssue({ code: 'custom', path: ['location'], message: 'Pelo menos um dos campos deve ser preenchido' });
    });

export type TripSearchSchemaType = z.infer<typeof TripSearchSchema>;

type TripSearchResponseType = {
    trips?: Trip[];
    error?: boolean;
    message?: string;
};
export async function searchTrip({
    location,
    startDate,
    pricePerDay,
    recommended,
}: TripSearchSchemaType): Promise<TripSearchResponseType> {
    try {
        const response = await api.post('/trips/search', {
            location: location,
            startDate: startDate,
            pricePerDay: pricePerDay,
            recommended: recommended,
        });

        handleDates(response.data);

        return response.data;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return err.response.data;
        }

        return {};
    }
}

export async function getTrip(id: string): Promise<Trip | null> {
    try {
        const response = await api.get(`/trips/${id}`);
        handleDates(response.data);
        return response.data;
    } catch (err) {
        return null;
    }
}
