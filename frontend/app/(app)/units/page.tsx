export const dynamic = "force-dynamic";

import { Header } from "@/shared/ui/Header";
import { Metadata } from "next";
import { MetricCard } from "@/shared/ui/MetricCard";
import { HouseHeart, Medal, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/shared/utils";
import { DataPagination } from "@/shared/ui/Pagination";
import { redirect } from "next/navigation";
import { ContainerFilters } from "@/modules/units/features/ContainerFilters";
import { ButtonRegisterUnit } from "@/modules/units/features/create-unit/ButtonRegisterUnit";
import { ContainerTable } from "@/modules/units/ui/ContainerTable";
import { authFetch } from "@/shared/api";

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
        authFetch(`/api/offices/units?${queryString}`, { next: { tags: ["units-office"] } }),
        authFetch(`/api/offices/metrics`, { next: { tags: ["units-metrics"] } }),
        authFetch(`/api/offices/states`, { next: { revalidate: 3600 } }),
    ]);

    const [dataMetrics, dataStates, dataUnis] = await Promise.all([
        resMetrics.json(),
        resStates.json(),
        resUnits.json(),
    ]);

    let dataCities: string[] = [];

    if (filters.state) {
        const resCities = await authFetch(`/api/offices/cities?state=${filters.state}`, { next: { revalidate: 3600 } });
        dataCities = await resCities.json();
    }

    const metrics = {
        MostRevenueValue: dataMetrics?.mostRevenue?.revenue ? formatCurrency(dataMetrics?.mostRevenue?.revenue) : 0.00,
        MostRevenueName: dataMetrics?.mostRevenue?.name ?? "---",
        decrease: dataMetrics?.decrease ? (dataMetrics?.decrease + "%") :  "--",
        health: dataMetrics?.health ?? "--"
    }

    return (
        <>
            <Header title="Unidades">
                <ButtonRegisterUnit/>
            </Header>

            <section className="flex gap-5">
                <MetricCard title="Maior faturamento mensal" value={metrics.MostRevenueValue.toString()} description={metrics.MostRevenueName} icon={Medal}></MetricCard>
                <MetricCard title="Decrescimento" value={metrics.decrease} description="Lojas que tiveram quedas nas vendas" icon={TrendingDown}></MetricCard>
                <MetricCard title="Saúde Geral" value={metrics.health} description="vendas se manteram na média no mês anterior" icon={HouseHeart}></MetricCard>
            </section>

            <section className="mt-10">
                <ContainerFilters states={dataStates} cities={dataCities}/>
                <p className="text-muted-foreground font-semibold">{dataUnis?.totalItems} unidades encontrados</p>
                <ContainerTable data={dataUnis?.items ?? []}/>

                <DataPagination totalPages={dataUnis?.totalPages ?? 1} currentPage={currentPage} />
            </section>
        </>
    );
}