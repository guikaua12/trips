'use client';

import React from 'react';
import Card from '@/components/Card';
import Image from 'next/image';
import { TripReservation } from '@/types/TripReservation';
import LocationWithFlag from '@/app/components/LocationWithFlag';
import Separator from '@/components/Separator';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TotalPrice from '@/app/components/TotalPrice';
import Button from '@/components/Button';
import { cancelTripReservation } from '@/services/tripResevations';

type MyTripProps = {
    tripReservation: TripReservation;
    handleCancelClick: (tripReservation: TripReservation) => void;
};

export default function MyTrip({ tripReservation, handleCancelClick }: MyTripProps) {
    const { id, trip, userId, startDate, endDate, totalPaid, status } = tripReservation;

    return (
        <Card className="flex flex-col gap-4 p-5">
            <div className="flex">
                <div className="relative aspect-video h-[100px] w-[120px] rounded-lg bg-zinc-300 object-cover">
                    <Image src={trip.coverImage} fill alt="Cover image" className="rounded-lg" />
                </div>

                <div className="w-full items-center p-5">
                    <h4>{trip.name}</h4>
                    <LocationWithFlag countryCode={trip.countryCode} location={trip.location} />
                </div>
            </div>

            <Separator />

            <div>
                <h5 className="mb-5">Sobre a viagem</h5>

                <p>Data</p>
                <p>
                    {startDate.getDate()}-{endDate.getDate()} de {format(startDate, 'MMMM', { locale: ptBR })}
                </p>

                <p>{status}</p>
            </div>

            <Separator />

            <h5>Informações do pagamento</h5>
            <TotalPrice totalPrice={totalPaid} startDate={startDate} endDate={endDate} rightClassName="font-semibold" />

            {status !== 'cancelled' && (
                <Button
                    variant="outline"
                    className="text-red-600 outline-red-600"
                    onClick={() => handleCancelClick(tripReservation)}
                >
                    Cancelar
                </Button>
            )}
        </Card>
    );
}
