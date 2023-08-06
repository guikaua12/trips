import TripSearch from '@/app/components/TripSearch';
import QuickSearch from '@/app/components/QuickSearch';
import { Trip } from '@/types/Trip';
import RecommendedTrips from '@/app/components/RecommendedTrips';
import { api } from '@/services/api';

interface HomeProps {
    trips: Trip[];
}

async function getData(): Promise<Trip[]> {
    try {
        const response = await api.get('/trips/search', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                recommended: true,
            },
        });

        return response.data;
    } catch (err) {
        return [];
    }
}

const delay = (ms: number = 750) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
    const trips = await getData();

    return (
        <>
            <TripSearch />
            <QuickSearch />
            <RecommendedTrips trips={trips} />
        </>
    );
}
