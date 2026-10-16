import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo } from "react";
  
interface FilterProps {
    name: string;
    items: { label: string; value: string }[] | string[] | Record<string, string>;
    placeholder: string;
    value?: string;
    onChange?: (name: string, value: string) => void;
    className?: string;
    allowClear?: boolean;
    clearLabel?: string;
}

interface FormatedItem {
    label: string;
    value: string;
}

export function Filter({ name, items, placeholder, value = "", allowClear = true, clearLabel, onChange, className, ...rest }: FilterProps) {
    const isArray = Array.isArray(items);
    const isStringArray = isArray && items.length > 0 && typeof items[0] === "string";

    const formatedItems: FormatedItem[] = useMemo(() => {
        if (!isArray && typeof items === "object" && items !== null) {
            return Object.entries(items).map(([key, val]) => ({ label: String(val), value: String(key) }));
        }
        if (isStringArray) return (items as string[]).map((item) => ({ label: item, value: item }));
        
        return items as FormatedItem[];
    }, [items, isArray, isStringArray]);

    const selectedLabel = useMemo(() => formatedItems.find((i) => i.value === value)?.label, [formatedItems, value]);

    const handleValueChange = (newValue: string | null) => {
        if (newValue !== null) onChange?.(name, newValue);
    };

    return (
        <Select value={value} onValueChange={handleValueChange} {...rest}>
            <SelectTrigger className={className ?? "w-[180px]"}>
                <SelectValue placeholder={placeholder}>
                    {selectedLabel ?? placeholder}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {allowClear && <SelectItem value="">{clearLabel ?? "Todos"}</SelectItem>}
                    {formatedItems.map((i) => (
                        <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}