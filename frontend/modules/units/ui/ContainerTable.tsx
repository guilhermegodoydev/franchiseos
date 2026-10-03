"use client";

import { columns } from "@/modules/units/ui/columns-table";
import { DataTable } from "@/shared/ui/table/DataTable";
import { tableUnit, UpdateUnitFormData } from "../schema";
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";
import { useState } from "react";
import { deactivateUnit, getUnitById } from "../actions";
import { toast } from "sonner";
import { CreateUnitDialog } from "../features/create-unit/CreateUnitDialog";

export function ContainerTable({ data }: { data: tableUnit[] | [] }) {
    const [ deleteUnit, setDeleteUnit ] = useState<{ id: string, name: string}>({ id: "", name: "" });
    const [ editUnit, setEditUnit ] = useState<{ id: string, unit: UpdateUnitFormData} | null>(null);
    const [ editOpen, setEditOpen ] = useState(false);

    const setDelete = (unitId: string, unitName: string) => {
        setDeleteUnit({ id: unitId, name: unitName });
    }

    const setUpdate = async (unitId: string) => {
        const result = await getUnitById(unitId);

        if (!result.success || !result.data) {
            toast.error(result.error ?? "Não foi possível carregar a unidade.");
            return;
        }

        setEditUnit({ id: unitId, unit: result.data });
        setEditOpen(true);
    };

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
            <DataTable columns={columns(setDelete, setUpdate)} data={data}/>

            <ConfirmDialog
                open={!!deleteUnit.id}
                onOpenChange={(open) => !open && setDeleteUnit({ id: "", name: "" })}
                title={`Deseja realmente desativar unidade: ${deleteUnit.name}?`}
                description="Esta ação poderá ser desfeita."
                onConfirm={handleDelete}
            />

            {editUnit && (
                <CreateUnitDialog
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    unitId={editUnit.id}
                    unit={editUnit.unit}
                />
            )}
        </>
    );
}