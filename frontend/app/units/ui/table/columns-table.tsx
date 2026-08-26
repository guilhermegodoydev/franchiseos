"use client";

import { DataTableFeatures } from "@/shared/ui/table/Datatablefeatures";
import { createColumnHelper } from "@tanstack/react-table";
import { tableUnit } from "./schema";
import { formatCurrency } from "@/shared/utils";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper<DataTableFeatures, tableUnit>();

const sizeStyles = {
    GRANDE: "font-bold",
    MEDIA: "font-medium text-gray-700",
    PEQUENA: "font-normal text-gray-500"
};

const styles = {
    ATIVA: "bg-green-500/15 text-green-500 border-green-500",
    SUSPENSA: "bg-gray-500/15 text-gray-500 border-gray-400",
}

export const columns = columnHelper.columns([
    columnHelper.accessor("name", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Unidade
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        }
    }),

    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
            const value = row.original.status;
            
            return (
                <Badge variant="outline" className={styles[value as keyof typeof styles]}>
                    {value}
                </Badge>
            );
        }
    }),

    columnHelper.accessor("size", {
        header: "Tamanho",
        cell: ({ row }) => {
            const value = row.original.size;
            const formatedValue = value === "MEDIA" ? "MÉDIA" : value;
            const style = sizeStyles[value as keyof typeof sizeStyles];

            return (<span className={style}>{formatedValue}</span>);
        }
    }),
    
    columnHelper.accessor("city", {
        header: "Cidade"
    }),

    columnHelper.accessor("state", {
        header: "Estado"
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
        cell: ({ row }) => (<span className="text-right">{formatCurrency(row.original.revenue)}</span>),
    }),
]);