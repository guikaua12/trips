'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Input from '@/components/Input';
import CurrencyInput from '@/components/CurrencyInput';
import DatePicker from '@/components/DatePicker';
import Button from '@/components/Button';
import { TripSearchSchema, TripSearchSchemaType } from '@/services/trips';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { objectToQueryParams } from '@/utils/urlUtils';
import { addDays } from 'date-fns';

export default function TripSearch() {
    const { push } = useRouter();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm<TripSearchSchemaType>({
        resolver: zodResolver(TripSearchSchema),
    });

    console.log(errors);

    async function handleSubmitClick({ location, startDate, pricePerDay }: TripSearchSchemaType) {
        push('/trips' + objectToQueryParams({ location, startDate, pricePerDay }));
    }

    return (
        <div className="flex flex-col items-center justify-center gap-3 bg-zinc-100 bg-worldMap bg-cover bg-no-repeat p-4 sm:h-[425px]">
            <h1 className="text-xl font-semibold">
                Encontre sua próxima <span className="text-purple">viagem!</span>
            </h1>

            <form
                action="#"
                className="grid w-full grid-cols-2 grid-rows-3 items-center justify-center gap-3 sm:max-w-[938px] sm:grid-cols-4 sm:grid-rows-1 sm:rounded-lg sm:bg-lightPurple sm:p-4"
                onSubmit={handleSubmit(handleSubmitClick)}
            >
                <Input
                    type="text"
                    name="location"
                    placeholder="Onde você quer ir?"
                    wrapperClassName="col-span-2 sm:col-span-1 w-full"
                    hookFormRegister={register('location')}
                    error={errors.location?.message}
                />

                <Controller
                    name="startDate"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <DatePicker
                            selected={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            className="w-full"
                            placeholderText="Primeira data"
                            wrapperClassName="col-span-1"
                            error={!!errors.startDate?.message}
                            errorMessage={errors.startDate?.message}
                            minDate={addDays(new Date(), 1)}
                        />
                    )}
                />

                <CurrencyInput
                    name="pricePerDay"
                    placeholder="Preço por dia"
                    wrapperClassName="w-full sm:col-span-1"
                    hookFormRegister={register('pricePerDay', { valueAsNumber: true })}
                    error={errors.pricePerDay?.message}
                />

                <Button className="col-span-2 w-full sm:col-span-1">Pesquisar</Button>
            </form>
        </div>
    );
}
