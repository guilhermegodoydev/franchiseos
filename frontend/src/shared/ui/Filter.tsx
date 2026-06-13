import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";

interface FilterProps {
    placeholder: string,
    items: string[],
    emptyMessage?: string,
}

export function Filter({ placeholder, items, emptyMessage = "Nenhuma seleção disponível" }: FilterProps) {
    return (
        <div className="w-45">
            <Combobox items={items}>
                <ComboboxInput placeholder={placeholder}/>
                <ComboboxContent>
                    <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
                    <ComboboxList>
                        {items.map(item => (
                            <ComboboxItem key={item} value={item}>
                                {item}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    );
}