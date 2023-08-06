'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Input from '@/components/Input';
import CurrencyInput from '@/components/CurrencyInput';
import DatePicker from '@/components/DatePicker';
import Button from '@/components/Button';
import { searchTrip, TripSearchType } from '@/services/trips';

export default function TripSearch() {
    const [tripSearch, setTripSearch] = useState<TripSearchType>({
        startDate: new Date(),
    });

    function handleDateChange(date: Date) {
        setTripSearch(({ ...prevState }) => ({ ...prevState, startDate: date }));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setTripSearch(({ ...prevState }) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(tripSearch);

        const trips = await searchTrip({});
        console.log(trips);
    }

    return (
        <div className="flex flex-col gap-3 p-4 bg-worldMap bg-no-repeat bg-cover items-center justify-center sm:h-[425px] bg-zinc-100">
            <h1 className="font-semibold text-xl">
                Encontre sua próxima <span className="text-purple">viagem!</span>
            </h1>

            <form
                action="#"
                className="grid grid-cols-2 grid-rows-3 justify-center items-center gap-3 w-full sm:bg-lightPurple sm:p-4 sm:max-w-[938px] sm:rounded-lg sm:grid-cols-4 sm:grid-rows-1"
                onSubmit={handleSubmit}
            >
                <Input
                    type="text"
                    name="location"
                    placeholder="Onde você quer ir?"
                    onChange={handleChange}
                    wrapperClassName="col-span-2 sm:col-span-1"
                />
                <DatePicker
                    selected={tripSearch.startDate}
                    onChange={handleDateChange}
                    className="w-full h-full"
                    placeholderText="Primeira data"
                    wrapperClassName="col-span-1 sm:col-span-1"
                />
                <CurrencyInput
                    name="budget"
                    placeholder="Orçamento"
                    onChange={handleChange}
                    wrapperClassName="w-full h-full sm:col-span-1"
                />

                <Button className="w-full col-span-2 sm:col-span-1">Pesquisar</Button>
            </form>
        </div>
    );
}
