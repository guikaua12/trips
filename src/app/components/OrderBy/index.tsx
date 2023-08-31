import SelectToggle from '@/components/SelectToggle';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
    handleChange: (value: any) => void;
}

export default function OrderBy({ className, handleChange, ...props }: Props) {
    return (
        <SelectToggle.Select className="z-50" handleChange={handleChange} placeholder="Ordenar por" {...props}>
            <SelectToggle.Option value="createdAt">Data de criação</SelectToggle.Option>
            <SelectToggle.Option value="totalPaid">Total pago</SelectToggle.Option>
        </SelectToggle.Select>
    );
}
