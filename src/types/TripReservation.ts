import { Trip } from '@/types/Trip';

export type TripReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export type TripReservation = {
    id: string;
    trip: Trip;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalPaid: number;
    status: TripReservationStatus;
};

export const statusToLabel: Record<TripReservationStatus, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    cancelled: 'Cancelado',
};
