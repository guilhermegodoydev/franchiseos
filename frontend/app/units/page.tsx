import { Header } from "@/shared/ui/Header";
import { Metadata } from "next";
import { MetricCard } from "@/modules/units/ui/MetricCard";
import { HouseHeart, Medal, TrendingDown } from "lucide-react";
import { DataTable } from "@/shared/ui/table/DataTable";
import { columns } from "@/modules/units/ui/columns-table";
import { formatCurrency } from "@/shared/utils";
import { DataPagination } from "@/shared/ui/Pagination";
import { redirect } from "next/navigation";
import { ContainerFilters } from "@/modules/units/ui/ContainerFilters";

export const metadata: Metadata = {
    title: "FranchiseOS | Unidades",
    description: "Gerenciamento de unidades da rede"
};

interface UnitPageProps {
    searchParams: Promise<{
        type?: string;
        status?: string;
        size?: string;
        state?: string;
        city?: string;
        month: string,
        page: string,
        year: string,
    }>
}

export default async function UnitsPage({ searchParams }: UnitPageProps) {
    const filters = await searchParams;
    const rawPage = Number(filters.page);
    
    if (filters.page !== undefined && (!Number.isFinite(rawPage) || rawPage < 1)) {
        const params = new URLSearchParams(filters as Record<string, string>);
        params.set("page", "1");
        redirect(`/units?${params.toString()}`);
    }
    
    const currentPage = rawPage || 1;
    const params = new URLSearchParams(filters as Record<string, string>);
    params.set("page", String(currentPage));
    const queryString = params.toString();

    const [resUnits, resMetrics, resStates] = await Promise.all([
        fetch(`http://localhost:5189/api/units/office/8c383fc5-32b5-4d69-9a29-92057b532163?${queryString}`, { next: { tags: ["units-office"] }}),
        fetch("http://localhost:5189/api/units/metrics/8c383fc5-32b5-4d69-9a29-92057b532163", { next: { tags: ["units-metrics"] }}),
        fetch("http://localhost:5189/api/units/states/8c383fc5-32b5-4d69-9a29-92057b532163", { next: { revalidate: 3600 }}),
    ]);

    const [dataMetrics, dataStates, dataUnis] = await Promise.all([
        resMetrics.json(),
        resStates.json(),
        resUnits.json(),
    ]);

    let dataCities: string[] = [];

    if (filters.state) {
        const resCities = await fetch(`http://localhost:5189/api/units/cities/8c383fc5-32b5-4d69-9a29-92057b532163?state=${filters.state}`, { next: { revalidate: 3600 } });
        dataCities = await resCities.json();
    }

    console.log(dataUnis);

    const metrics = {
        MostRevenueValue: dataMetrics?.mostRevenue?.revenue ? formatCurrency(dataMetrics?.mostRevenue?.revenue) : 0.00,
        MostRevenueName: dataMetrics?.mostRevenue?.name ?? "---",
        decrease: dataMetrics?.decrease ? (dataMetrics?.decrease + "%") :  "--",
        health: dataMetrics.health ?? "--"
    }

    return (
        <>
            <Header title="Unidades"></Header>

            <section className="flex gap-5">
                <MetricCard title="Maior faturamento mensal" value={metrics.MostRevenueValue.toString()} description={metrics.MostRevenueName} icon={Medal}></MetricCard>
                <MetricCard title="Decrescimento" value={metrics.decrease} description="Lojas que tiveram quedas nas vendas" icon={TrendingDown}></MetricCard>
                <MetricCard title="Saúde Geral" value={metrics.health} description="vendas se manteram na média no mês anterior" icon={HouseHeart}></MetricCard>
            </section>

            <section className="mt-10">
                <ContainerFilters states={dataStates} cities={dataCities}/>
                
                <DataTable columns={columns} data={dataUnis?.items ?? []}/>

                <DataPagination totalPages={dataUnis?.totalPages ?? 1} currentPage={currentPage} />
            </section>
        </>
    );
}