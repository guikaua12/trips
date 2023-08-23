import React from 'react';
import { differenceInDays } from 'date-fns';

function isValidDates(startDate: Date, endDate: Date): boolean {
    if (!startDate || !endDate) return false;

    return differenceInDays(endDate, startDate) > 0;
}

type TotalPriceProps = {
    startDate: Date;
    endDate: Date;
    pricePerDay?: number;
    totalPrice?: number;
    leftClassName?: string;
    rightClassName?: string;
};

export default function TotalPrice({
    startDate,
    endDate,
    pricePerDay,
    totalPrice,
    leftClassName,
    rightClassName,
}: TotalPriceProps) {
    let curTotalPrice = 0;

    if (pricePerDay) {
        curTotalPrice = pricePerDay * differenceInDays(endDate, startDate);
    }

    if (totalPrice) {
        curTotalPrice = totalPrice;
    }

    const isValidDate = isValidDates(startDate, endDate);
    const difference = differenceInDays(endDate, startDate);

    return (
        <div className="col-span-2 flex w-full justify-between text-xs font-semibold text-darkPurple">
            <p className={leftClassName}>{isValidDate ? `Total (${difference} noites):` : 'Total:'}</p>
            <p className={rightClassName}>{isValidDate ? `R$ ${curTotalPrice.toFixed(2)}` : 'R$0.00'}</p>
        </div>
    );
}
