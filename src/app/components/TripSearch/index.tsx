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
        <div className="flex flex-col gap-3 p-4 bg-worldMap bg-no-repeat bg-cover">
            <h1 className="font-semibold text-xl">
                Encontre sua próxima <span className="text-purple">viagem!</span>
            </h1>

            <form action="#" className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="location"
                    className="w-full"
                    placeholder="Onde você quer ir?"
                    onChange={handleChange}
                />
                <div className="flex gap-3">
                    <DatePicker
                        selected={tripSearch.startDate}
                        onChange={handleDateChange}
                        className="w-full h-full"
                        placeholderText="Primeira data"
                    />
                    <CurrencyInput
                        name="budget"
                        className="w-full h-full"
                        placeholder="Orçamento"
                        onChange={handleChange}
                    />
                </div>

                <Button>Pesquisar</Button>
            </form>
        </div>
    );
}
