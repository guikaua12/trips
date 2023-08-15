'use client';
import DatePicker from '@/components/DatePicker';
import React from 'react';
import { Trip } from '@/types/Trip';
import Input from '@/components/Input';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInDays, addDays, subDays, isAfter, isBefore, isEqual } from 'date-fns';
import reservateTrip from '@/services/trips';

type TripReservationProps = {
    trip: Trip;
};

function isValidDates(startDate: Date, endDate: Date): boolean {
    if (!startDate || !endDate) return false;

    return differenceInDays(endDate, startDate) > 0;
}

export default function TripReservation({ trip }: TripReservationProps) {
    const TripReservationSchema = z.object({
        startDate: z.date(),
        endDate: z.date(),
        guests: z
            .number({
                required_error: 'O número de hóspedes é obrigatório',
                invalid_type_error: 'O número de hóspedes é obrigatório',
            })
            .min(1, 'O número de hóspedes deve ser maior que 1')
            .max(trip.maxGuests, 'O número máximo de hóspedes é de ' + trip.maxGuests),
    });

    type TripReservationSchemaType = z.infer<typeof TripReservationSchema>;

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        watch,
        setError,
    } = useForm<TripReservationSchemaType>({
        resolver: zodResolver(TripReservationSchema),
    });

    const currentStartDate = watch('startDate');
    const currentEndDate = watch('endDate');
    const totalPrice = trip.pricePerDay * differenceInDays(currentEndDate, currentStartDate);

    async function handleSubmitClick({ startDate, endDate, guests }: TripReservationSchemaType) {
        const response = await reservateTrip({
            tripId: trip.id,
            startDate,
            endDate,
            totalPaid: totalPrice,
            guests,
        });

        if (response.error) {
            setError('startDate', { type: 'custom', message: response.message });
        }

        console.log(response);
    }

    return (
        <div>
            <div className="mb-4 flex gap-1">
                <span className="text-xs font-semibold text-purple">R${trip.pricePerDay}</span>
                <span className="text-xs text-gray">por noite</span>
            </div>

            <form className="grid grid-cols-2 gap-2.5" onSubmit={handleSubmit(handleSubmitClick)}>
                <Controller
                    control={control}
                    name="startDate"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <DatePicker
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            placeholderText="Data de inicio"
                            error={!!errors.startDate?.message}
                            errorMessage={errors.startDate?.message}
                            minDate={trip.startDate}
                            maxDate={currentEndDate ? subDays(currentEndDate, 1) : trip.endDate}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="endDate"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <DatePicker
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            placeholderText="Data final"
                            error={!!errors.endDate?.message}
                            errorMessage={errors.endDate?.message}
                            minDate={currentStartDate ? addDays(currentStartDate, 1) : trip.startDate}
                            maxDate={trip.endDate}
                        />
                    )}
                />
                <Input
                    wrapperClassName="col-span-2"
                    placeholder="Hóspedes"
                    hookFormRegister={register('guests', { valueAsNumber: true })}
                    error={errors.guests?.message}
                />
                <div className="col-span-2 flex w-full justify-between text-sm font-semibold text-darkPurple">
                    <span>
                        {isValidDates(currentStartDate, currentEndDate)
                            ? `Total (${differenceInDays(currentEndDate, currentStartDate)} noites):`
                            : 'Total:'}
                    </span>
                    <span>
                        {isValidDates(currentStartDate, currentEndDate) ? `R$ ${totalPrice.toFixed(2)}` : 'R$0.00'}
                    </span>
                </div>
                <Button className="col-span-2">Reservar agora</Button>
            </form>
        </div>
    );
}
