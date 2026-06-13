"use client"

import { ColumnDef } from "@tanstack/react-table";
import { tableUnit } from "./schema";
import { toCapitalizeFirstLetter, toCurrency } from "@/shared/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Ellipsis, Eye, Pen } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<tableUnit>[] = [
    {
        accessorKey: "name",
        header: "Unidade",
        cell: ({ row }) => (
            <p className="font-semibold">{row.original.name}</p>
        ),
    },
    {
        accessorKey: "revenue",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Receita
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({ row }) => toCurrency(row.original.revenue),
    }, 
    {
        accessorKey: "stats",
        header: "Status",
        cell: ({ row }) => {
            const text = row.original.stats;

            const style = {
                ATIVA: "bg-success-bg border-success-fg text-success-fg",
                SUSPENSA: "bg-empty-bg border-empty-fg text-empty-fg"
            }

            const currentStyle = style[text];

            return (
                <div className={`w-fit px-1 border font-medium rounded-sm ${currentStyle}`}>{text}</div>
            );
        },
    },
    {
        accessorKey: "unitSize",
        header: "Tamanho",
        cell: ({ row }) => {
            const size = row.original.unitSize;

            const style = {
                PEQUENA: "font-normal text-zinc-400",
                MÉDIA: "font-medium text-zinc-600",
                GRANDE: "font-semibold text-zinc-900",
            };

            const currentStyle = style[size];

            return (
                <div className={currentStyle}>{toCapitalizeFirstLetter(size)}</div>
            );
        },
    },
    {
        accessorKey: "cost",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Custo
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({ row }) => toCurrency(row.original.cost),
    },
    {
        header: "Ações",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <Ellipsis className="text-gray-600"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link href={`units/${row.original.id}`} className="flex gap-1 items-center">
                            <Eye/>
                            Detalhes
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Pen/>
                        Editar dados
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    }
];