import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";
import { TrashIcon } from "lucide-react";

export function ButtonDesactiveUnit() {
    return (
        <>
            <TrashIcon/>
            Desativar

            <ConfirmDialog/>
        </>
    );
}