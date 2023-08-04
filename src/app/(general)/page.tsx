import TripSearch from '@/app/components/TripSearch';
import QuickSearch from '@/app/components/QuickSearch';
import { Trip } from '@/types/Trip';
import RecommendedTrips from '@/app/components/RecommendedTrips';

interface HomeProps {
    trips: Trip[];
}

async function getData(): Promise<Trip[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/trips/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recommended: true,
        }),
    });

    return await response.json();
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
