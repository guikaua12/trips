import { Trip } from '@/types/Trip';

export type TripReservation = {
    id: string;
    trip: Trip;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalPaid: number;
};
