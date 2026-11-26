"use client"

import { DataTableFeatures } from "@/shared/ui/table/Datatablefeatures";
import { formatCurrency, formatDate } from "@/shared/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { RoyaltiesRowActions } from "./RoyaltiesRowActions";
import { RoyaltyStatusBadge } from "../../ui/RoyaltyStatusBadge";

const columnHelper = createColumnHelper<DataTableFeatures, any>();

export const columns = columnHelper.columns([
    columnHelper.accessor("unitName", {
        header: "Unidade",
        cell: ({ row }) => (
            <p className="block min-w-[120px] max-w-[120px] truncate" title={row.original.unitName}>
                {row.original.unitName}
            </p>
        ),
    }),

    columnHelper.accessor("percentage", {
        header: "Porcentagem",
        cell: ({ row }) => <span>{row.original.percentage}%</span>
    }),

    columnHelper.accessor("amount", {
        header: "Valor",
        cell: ({ row }) => <span>{formatCurrency(row.original.amount, "full")}</span>
    }),

    columnHelper.accessor("dueDate", {
        header: "Vencimento",
        cell: ({ row }) => <span>{formatDate(row.original.dueDate)}</span>
    }),

    columnHelper.accessor("payDate", {
        header: "Pagamento",
        cell: ({ row }) => <span>{formatDate(row.original.payDate)}</span>
    }),

    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => <RoyaltyStatusBadge status={row.original.status}/>
    }),

    columnHelper.display({
        id: "actions",
        header: () => <p className="text-center">Ações</p>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <RoyaltiesRowActions royalty={row.original}/>
            </div>
        )
    }),
]);