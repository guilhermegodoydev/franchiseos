import { Input } from "@/components/ui/input";
import { Header } from "@/shared/ui/Header";
import { MetricCard } from "@/shared/ui/MetricCard";
import { PaginationTable } from "@/shared/ui/Pagination";
import { DataTable } from "@/shared/ui/DataTable";
import { AlertCircle, CircleDollarSign, Download, HandCoins, Plus } from "lucide-react";
import { columns } from "@/modules/franchises/ui/table/columns_table";
import { Filter } from "@/shared/ui/Filter";
import { Button } from "@/components/ui/button";
import { franchiseTable } from "@/modules/franchises/ui/table/schema";

const paginationItems:any = [
    { href: "#", index: 1, isActive: false },
    { href: "#", index: 2, isActive: true },
    { href: "#", index: 3, isActive: false },
];

const mock: franchiseTable[] = [
    {
        id: "01900000-0000-7000-8000-000000000101",
        name: "Franquia Copacabana Premium",
        stats: "ATIVA",
        revenue: 145000,
        royaltiesPercentage: 5.5,
        unitSize: "GRANDE",
        paymentRisk: "BOM",
    },
    {
        id: "01900000-0000-7000-8000-000000000102",
        name: "Franquia Gonzaga Centro",
        stats: "ATIVA",
        revenue: 68000,
        royaltiesPercentage: 5.0,
        unitSize: "MÉDIA",
        paymentRisk: "BOM",
    },
    {
        id: "01900000-0000-7000-8000-000000000103",
        name: "Franquia Paulista Express",
        stats: "ATIVA",
        revenue: 92000,
        royaltiesPercentage: 6.0,
        unitSize: "MÉDIA",
        paymentRisk: "REGULAR",
    },
    {
        id: "01900000-0000-7000-8000-000000000104",
        name: "Franquia Canal 4 Filial",
        stats: "SUSPENSA",
        revenue: 38000,
        royaltiesPercentage: 4.5,
        unitSize: "PEQUENA",
        paymentRisk: "RUIM",
    },
    {
        id: "01900000-0000-7000-8000-000000000105",
        name: "Franquia Aeroporto Foodcourt",
        stats: "ATIVA",
        revenue: 185000,
        royaltiesPercentage: 7.0,
        unitSize: "GRANDE",
        paymentRisk: "REGULAR",
    }
];

export default function FranchisesPage() {
    return (
        <>
            <Header pageTitle="Franqueados" subtext="Gerencia unidades franqueadas">
                <Button className="bg-zinc-700">
                    Novo Franqueado
                </Button>
            </Header>

            <section className="flex gap-5">
                <MetricCard title="Faturamente Consolidado da Rede" value="15mil" icon={CircleDollarSign}/>
                <MetricCard title="Arrecadação Estimada de Royalties" value="10mil" icon={HandCoins}/>
                <MetricCard title="Inadimplência Atual" value="12mil em atraso" icon={AlertCircle}/>
            </section>

            <section className="mt-10">
                <Input placeholder="Buscar por nome"/>

                <div className="flex justify-between my-3">
                    <div className="flex gap-3">
                        <Filter placeholder="Filtrar por Status" items={["Ativa", "Suspensa"]}/>
                        <Filter placeholder="Filtrar por Tamanho" items={["Pequena", "Média", "Grande"]}/>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="secondary"><Download/></Button>
                    </div>
                </div>

                <DataTable columns={columns} data={mock}/>
                
                <PaginationTable hrefPrevious="#" hrefNext="#" items={paginationItems}/>
            </section>
        </>
    );
}