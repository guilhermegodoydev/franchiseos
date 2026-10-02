"use client";

import { columns } from "@/modules/units/ui/columns-table";
import { DataTable } from "@/shared/ui/table/DataTable";
import { tableUnit } from "../schema";
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";
import { useState } from "react";
import { deactivateUnit } from "../actions";
import { toast } from "sonner";

export function ContainerTable({ data }: { data: tableUnit[] | [] }) {
    const [ deleteUnit, setDeleteUnit ] = useState<{ id: string, name: string}>({ id: "", name: "" });

    const setDelete = (unitId: string, unitName: string) => {
        setDeleteUnit({ id: unitId, name: unitName });
    }

    const handleDelete = async () => {
        const result = await deactivateUnit(deleteUnit.id);
        
        if (!result.success) {
            toast.error(result.error);
            return;
        }

        toast.success("Unidade desativada com sucesso!");
        setDeleteUnit({ id: "", name: "" });
    }

    return (
        <>
            <DataTable columns={columns((setDelete))} data={data}/>

            <ConfirmDialog
                open={!!deleteUnit.id}
                onOpenChange={(open) => !open && setDeleteUnit({ id: "", name: "" })}
                title={`Deseja realmente desativar unidade: ${deleteUnit.name}?`}
                description="Esta ação poderá ser desfeita."
                onConfirm={handleDelete}
            />
        </>
    );
}