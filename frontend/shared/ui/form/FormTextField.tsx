import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormTextFieldProps {
    id: string;
    label: string;
    error?: string;
    className?: string;
    register: UseFormRegisterReturn;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
}
  
export function FormTextField({ id, label, error, className, register, inputProps }: FormTextFieldProps) {
    return (
        <Field className={className}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Input id={id} {...register} {...inputProps} />
            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
}