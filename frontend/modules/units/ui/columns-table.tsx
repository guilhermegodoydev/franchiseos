"use client";

import { DataTableFeatures } from "@/shared/ui/table/Datatablefeatures";
import { createColumnHelper } from "@tanstack/react-table";
import { tableUnit, UNIT_SIZE_LABEL, UNIT_STATUS_LABEL, UNIT_TYPE_LABEL, UnitSize, UnitType } from "../schema";
import { formatCurrency } from "@/shared/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableRowActions } from "../features/TableRowActions";

const columnHelper = createColumnHelper<DataTableFeatures, tableUnit>();

const styles = {
    Active: "bg-green-500/15 text-green-500 border-green-500",
    Inactive: "bg-gray-500/15 text-gray-500 border-gray-400",
}

export const columns = ( 
    onRequestDelete: (unitId: string, unitName: string) => void,
) => columnHelper.columns([
    columnHelper.accessor("name", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Unidade
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({ row }) => (
            <p className="block truncate max-w-[200px]">
                {row.original.name}
            </p>
        ),
    }),

    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
            const value = row.original.status;
            const formattedValue = UNIT_STATUS_LABEL[value].toUpperCase();
            
            return (
                <Badge variant="outline" className={styles[value as keyof typeof styles]}>
                    {formattedValue}
                </Badge>
            );
        }
    }),

    columnHelper.accessor("type", {
        header: "Tipo",
        cell: ({ row }) => {
            const value = row.original.type as UnitType;
            const formatedValue = UNIT_TYPE_LABEL[value];

            return (<span>{formatedValue}</span>);
        }
    }),

    columnHelper.accessor("size", {
        header: "Tamanho",
        cell: ({ row }) => {
            const value = row.original.size as UnitSize;
            const formatedValue = UNIT_SIZE_LABEL[value];

            return (<span>{formatedValue}</span>);
        }
    }),
    
    columnHelper.accessor("city", {
        header: "Cidade",
        cell: ({ row }) => (
            <p className="block truncate max-w-[200px]">
                {row.original.city}
            </p>
        ),
    }),

    columnHelper.accessor("state", {
        header: "Estado",
        cell: ({ row }) => (
            <p className="text-center">
                {row.original.state}
            </p>
        )
    }),

    columnHelper.accessor("revenue", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Faturamento
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({ row }) => {
            const value = row.original.revenue;
            const label = value ? formatCurrency(row.original.revenue) : "--"; 
            
            return (<span className="text-right">{label}</span>);
        },
    }),

    columnHelper.accessor("royaltiesPercentage", {
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Royaltie
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const value = row.original.royaltiesPercentage
            const label = value != null ? `${value}%` : "--";

            return (<div className="text-center">{label}</div>);
        }
    }),

    columnHelper.display({
        id: "acoes",
        header: "Ações",
        cell: ({ row }) => (
            <TableRowActions 
                onDelete={() => onRequestDelete(row.original.id, row.original.name)}
            />
        ),
    }),
]);