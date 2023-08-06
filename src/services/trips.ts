import { api } from '@/services/api';
import { Trip } from '@/types/Trip';

export type TripSearchType = {
    location?: string;
    startDate?: Date;
    budget?: number;
    recommended?: boolean;
};
export async function searchTrip({ location, startDate, budget, recommended }: TripSearchType): Promise<Trip[]> {
    try {
        const response = await api.get('/trips/search', {
            headers: {
                'Content-Type': 'application/json',
            },
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
