import React from 'react';
import Input from '@/components/Input';
import CurrencyInput from '@/components/CurrencyInput';

export default function TripSearch() {
    return (
        <div className="flex flex-col gap-3 p-4">
            <h1 className="font-semibold text-xl">
                Encontre sua pròxima <span className="text-purple">viagem!</span>
            </h1>

            <form action="#" className="flex flex-col gap-3">
                <Input type="text" className="w-full" placeholder="Onde você quer ir?" />
                <div className="flex gap-3">
                    <Input type="text" className="w-full" placeholder="Primeira data" />
                    <CurrencyInput className="w-full" placeholder="Orçamento" />
                </div>

                <button></button>
            </form>
        </div>
    );
}
