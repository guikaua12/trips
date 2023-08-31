import SelectToggle from '@/components/SelectToggle';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
    handleChange: (value: any) => void;
}

export default function OrderDir({ className, handleChange, ...props }: Props) {
    return (
        <SelectToggle.Select className="z-50" handleChange={handleChange} placeholder="Ordem" {...props}>
            <SelectToggle.Option value="asc">Crescente</SelectToggle.Option>
            <SelectToggle.Option value="desc" selected>
                Decrescente
            </SelectToggle.Option>
        </SelectToggle.Select>
    );
}
