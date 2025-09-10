import { IInput } from '@/src/types';
import { DatePicker } from '@heroui/date-picker';
import React from 'react'
import { Controller } from 'react-hook-form';
interface IProps extends IInput { }
export const FXDatePicker = ({
    label,
    name,
    variant = "bordered",
}: IProps) => {
    return (
        <Controller
            name={name}
            render={({ field: { value, ...fields } }) => (
                <DatePicker
                    className="min-w-full sm:min-w-[225px]"
                    label={label}
                    variant={variant}
                    {...fields}
                />
            )}
        />
    );
}