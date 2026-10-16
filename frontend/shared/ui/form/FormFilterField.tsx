import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Filter } from "../Filter";

interface FormFilterFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    items: Record<string, string>;
    placeholder: string;
    error?: string;
}

export function FormFilterField<T extends FieldValues>({ name, control, label, items, placeholder, error }: FormFilterFieldProps<T>) {
    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <Controller control={control} name={name} render={({ field }) => (
                <Filter
                    name={name}
                    items={items}
                    placeholder={placeholder}
                    value={field.value}
                    allowClear={false}
                    onChange={(_, value) => field.onChange(value)}
                />
            )}/>
            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
}