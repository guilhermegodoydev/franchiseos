import { Header } from "@/shared/ui/Header";
import { Metadata } from "next";
import { MetricCard } from "./ui/MetricCard";
import { Download, HouseHeart, Medal, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Filter } from "@/shared/ui/Filter";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/shared/ui/table/DataTable";
import { columns } from "./ui/table/columns-table";
import { tableUnit } from "./ui/table/schema";

export const metadata: Metadata = {
    title: "FranchiseOS | Unidades",
    description: "Gerenciamento de unidades da rede"
};

const data: tableUnit[] = [
    {
        id: "0198e5c1-7b2a-7c01-a001-000000000001",
        name: "Unidade Gonzaga",
        status: "ATIVA",
        size: "GRANDE",
        city: "Santos",
        state: "SP",
        revenue: 14000,
    },
    {
        id: "0198e5c1-7b2a-7c01-a001-000000000002",
        name: "Unidade Moema",
        status: "ATIVA",
        size: "MEDIA",
        city: "São Paulo",
        state: "SP",
        revenue: 11850,
    },
    {
        id: "0198e5c1-7b2a-7c01-a001-000000000003",
        name: "Unidade Savassi",
        status: "ATIVA",
        size: "MEDIA",
        city: "Belo Horizonte",
        state: "MG",
        revenue: 9750,
    },
    {
        id: "0198e5c1-7b2a-7c01-a001-000000000004",
        name: "Unidade Batel",
        status: "SUSPENSA",
        size: "PEQUENA",
        city: "Curitiba",
        state: "PR",
        revenue: 4200,
    },
    {
        id: "0198e5c1-7b2a-7c01-a001-000000000005",
        name: "Unidade Boa Viagem",
        status: "ATIVA",
        size: "GRANDE",
        city: "Recife",
        state: "PE",
        revenue: 13200,
    },
    {
        id: "0198e5c1-7b2a-7c01-a001-000000000006",
        name: "Unidade Asa Sul",
        status: "SUSPENSA",
        size: "MEDIA",
        city: "Brasília",
        state: "DF",
        revenue: 6800,
    },
];

const optStats = [
    { label: "Ativa", value: "ativa" },
    { label: "Suspensa", value: "suspensa"},
]

const optSize = [
    { label: "Pequena", value: "pequena" },
    { label: "Média", value: "media" },
    { label: "Grande", value: "grande" },
];

const optCities = [
    { label: "Santos", value: "Santos" },
    { label: "São Paulo", value: "São Paulo" },
    { label: "Belo Horizonte", value: "Belo Horizonte" },
    { label: "Curitiba", value: "Curitiba" },
    { label: "Recife", value: "Recife" },
    { label: "Brasília", value: "Brasília" },
];

const optStates = [
    { label: "SP", value: "SP" },
    { label: "MG", value: "MG" },
    { label: "PR", value: "PR" },
    { label: "PE", value: "PE" },
    { label: "DF", value: "DF" },
];

export default function UnitsPage() {
    return (
        <>
            <Header title="Unidades"></Header>

            <section className="flex gap-5">
                <MetricCard title="Maior faturamento mensal" value="14 mil" description="Unidade Gonzaga" icon={Medal}></MetricCard>
                <MetricCard title="Decrescimento" value="-4%" description="Lojas que tiveram quedas nas vendas" icon={TrendingDown}></MetricCard>
                <MetricCard title="Saúde Geral" value="Estável" description="vendas se manteram na média no mês anterior" icon={HouseHeart}></MetricCard>
            </section>

            <section className="mt-10">
                <Input placeholder="Buscar por nome"/>

                <div className="flex justify-between my-3">
                    <div className="flex gap-3">
                        <Filter placeholder="Filtrar por Status" items={optStats}/>
                        <Filter placeholder="Filtrar por Tamanho" items={optSize}/>
                        <Filter placeholder="Filtrar por Estado" items={optStates}/>
                        <Filter placeholder="Filtrar por Cidade" items={optCities}/>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="secondary">
                            <Download/>
                        </Button>
                    </div>
                </div>
                
                <DataTable columns={columns} data={data}/>
            </section>
        </>
    );
}