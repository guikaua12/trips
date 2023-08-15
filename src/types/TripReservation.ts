export type TripReservation = {
    id: string;
    tripId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalPaid: number;
};
