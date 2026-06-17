"use client"

import { ColumnDef } from "@tanstack/react-table";
import { franchiseTable } from "./schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ClipboardClock, Ellipsis, Eye, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toCapitalizeFirstLetter, toCurrency } from "@/shared/utils";
import Link from "next/link";

export const columns: ColumnDef<franchiseTable>[] = [
    {
        accessorKey: "name",
        header: "Franquia",
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
        accessorKey: "royaltiesPercentage",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Porcentagem de Royalties
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({ row }) => {
            const percentage = row.original.royaltiesPercentage + "%";

            return (
                <p className="text-center">{percentage}</p>
            );
        }
    },
    {
        accessorKey: "paymentRisk",
        header: "Score",
        cell: ({ row }) => {
            const risk = row.original.paymentRisk;

            const style = {
                BOM: "font-medium text-green-700",
                REGULAR: "font-medium text-orange-600",
                RUIM: "font-medium text-red-600",
            };

            const currentStyle = style[risk];

            return (
                <p className={currentStyle}>{risk}</p>
            );
        },
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
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href={`franchises/${row.original.id}`} className="flex gap-1 items-center">
                                <Eye/>
                                Detalhes
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Pen/>
                            Editar dados
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator/>

                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href="#" className="flex gap-1 items-center">
                                <ClipboardClock/>
                                Histórico
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    }
];