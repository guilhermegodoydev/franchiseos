import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { columns } from "@/modules/unit/ui/table/columns_table";
import { tableUnit } from "@/modules/unit/ui/table/schema";
import { DataTable } from "@/shared/ui/DataTable";
import { Filter } from "@/shared/ui/Filter";
import { Header } from "@/shared/ui/Header";
import { MetricCard } from "@/shared/ui/MetricCard";
import { PaginationTable } from "@/shared/ui/Pagination";
import { Download, HouseHeart, Medal, Plus, TrendingDown } from "lucide-react";

const mock: tableUnit[] = [
    { id: "01900000-0000-7000-8000-000000000001", name: "Ponta da praia", revenue: 2000, stats: "ATIVA", unitSize: "MÉDIA", cost: 1000 },
    { id: "01900000-0000-7000-8000-000000000002", name: "São Paulo", revenue: 6000, stats: "ATIVA", unitSize: "GRANDE", cost: 2000 },
    { id: "01900000-0000-7000-8000-000000000003", name: "Canal 4", revenue: 1000, stats: "SUSPENSA", unitSize: "PEQUENA", cost: 1000 },
    { id: "01900000-0000-7000-8000-000000000004", name: "Gonzaga", revenue: 4000, stats: "ATIVA", unitSize: "GRANDE", cost: 1500 },
];

const paginationItems:any = [
    { href: "#", index: 1, isActive: false },
    { href: "#", index: 2, isActive: true },
    { href: "#", index: 3, isActive: false },
];

export default function UnitsPage() {
    return (
        <>
            <Header pageTitle="Unidades" subtext="Gerencie suas unidades">
                <Button className="bg-black/90">Baixar Relatório de Desempenho</Button>
            </Header>

            <section className="flex gap-5">
                <MetricCard title="Maior faturamento mensal" value="24mil" description="Unidade Ponta da Praia" icon={Medal}></MetricCard>
                <MetricCard title="Decrescimento" value="5" description="Lojas que tiveram quedas nas vendas" icon={TrendingDown}></MetricCard>
                <MetricCard title="Saúde Geral" value="Estável" description="vendas se manteram na média no mês anterior" icon={HouseHeart}></MetricCard>
            </section>

            <section className="mt-10">
                <Input placeholder="Buscar por nome"/>

                <div className="flex justify-between my-3">
                    <div className="flex gap-3">
                        <Filter placeholder="Filtrar por tipo" items={["Unidade", "Franquia"]}/>
                        <Filter placeholder="Filtrar por Status" items={["Ativa", "Suspensa"]}/>
                        <Filter placeholder="Filtrar por Tamanho" items={["Pequena", "Média", "Grande"]}/>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="secondary"><Download/></Button>
                        <Button className="bg-black/90"><Plus/></Button>
                    </div>
                </div>

                <DataTable columns={columns} data={mock}/>

                <PaginationTable hrefPrevious="#" hrefNext="#" items={paginationItems}/>
            </section>
        </>
    );
}