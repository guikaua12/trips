import { api } from '@/services/api';
import { Trip } from '@/types/Trip';
import { handleDates } from '@/utils/dateUtils';

export type TripSearchType = {
    location?: string;
    startDate?: Date;
    budget?: number;
    recommended?: boolean;
};
export async function searchTrip({ location, startDate, budget, recommended }: TripSearchType): Promise<Trip[]> {
    try {
        const response = await api.get('/trips/search', {
            data: {
                location: location,
                startDate: startDate,
                budget: budget,
                recommended: recommended,
            },
        });
        return response.data;
    } catch (err) {
        return [];
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
