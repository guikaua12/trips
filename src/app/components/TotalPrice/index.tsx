import React from 'react';
import { differenceInDays } from 'date-fns';

function isValidDates(startDate: Date, endDate: Date): boolean {
    if (!startDate || !endDate) return false;

    return differenceInDays(endDate, startDate) > 0;
}

type TotalPriceProps = {
    startDate: Date;
    endDate: Date;
    pricePerDay: number;
    leftClassName?: string;
    rightClassName?: string;
};

export default function TotalPrice({
    startDate,
    endDate,
    pricePerDay,
    leftClassName,
    rightClassName,
}: TotalPriceProps) {
    const totalPrice = pricePerDay * differenceInDays(endDate, startDate);
    const isValidDate = isValidDates(startDate, endDate);
    const difference = differenceInDays(endDate, startDate);

    return (
        <div className="col-span-2 flex w-full justify-between text-xs font-semibold text-darkPurple">
            <p className={leftClassName}>{isValidDate ? `Total (${difference} noites):` : 'Total:'}</p>
            <p className={rightClassName}>{isValidDate ? `R$ ${totalPrice.toFixed(2)}` : 'R$0.00'}</p>
        </div>
    );
}
