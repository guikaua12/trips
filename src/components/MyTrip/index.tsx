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

type MyTripProps = {
    tripReservation: TripReservation;
};

export default function MyTrip({ tripReservation: { id, trip, userId, startDate, endDate, totalPaid } }: MyTripProps) {
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
            </div>

            <Separator />

            <h5>Informações do pagamento</h5>
            <TotalPrice
                pricePerDay={trip.pricePerDay}
                startDate={startDate}
                endDate={endDate}
                rightClassName="font-semibold"
            />

            <Button variant="outline" className="text-red-600 outline-red-600">
                Cancelar
            </Button>
        </Card>
    );
}
