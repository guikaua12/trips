'use client';

import React from 'react';
import Input from '@/components/Input';
import CurrencyInput from '@/components/CurrencyInput';
import DatePicker from '@/components/DatePicker';
import Button from '@/components/Button';

export default function TripSearch() {
    return (
        <div className="flex flex-col gap-3 p-4 bg-worldMap bg-no-repeat bg-cover">
            <h1 className="font-semibold text-xl">
                Encontre sua pròxima <span className="text-purple">viagem!</span>
            </h1>

            <form action="#" className="flex flex-col gap-3">
                <Input type="text" className="w-full" placeholder="Onde você quer ir?" />
                <div className="flex gap-3">
                    {/*<Input type="text" placeholder="Primeira data" />*/}
                    <DatePicker onChange={() => {}} className="w-full h-full" placeholderText="Primeira data" />
                    <CurrencyInput className="w-full h-full" placeholder="Orçamento" />
                </div>

                <Button>Pesquisar</Button>
            </form>
        </div>
    );
}
