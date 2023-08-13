import TripSearch from '@/app/components/TripSearch';
import QuickSearch from '@/app/components/QuickSearch';
import RecommendedTrips from '@/app/components/RecommendedTrips';
import { searchTrip } from '@/services/trips';

const delay = (ms: number = 750) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
    const response = await searchTrip({ recommended: true });

    return (
        <>
            <TripSearch />
            <QuickSearch />
            <RecommendedTrips trips={response.trips || []} />
        </>
    );
}
