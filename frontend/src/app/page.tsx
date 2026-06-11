"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Header } from "@/shared/ui/Header";
import { MetricCard } from "@/shared/ui/MetricCard";
import { AlertCircle, BanknoteArrowUp, ReceiptText } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", revenue: 120000, royalties: 6600 },
  { month: "Feb", revenue: 145000, royalties: 7975 },
  { month: "Mar", revenue: 132000, royalties: 7260 },
  { month: "Apr", revenue: 160000, royalties: 8800 },
  { month: "May", revenue: 185000, royalties: 10175 },
  { month: "Jun", revenue: 210000, royalties: 121550 },
];

const columnchartData = [
  { local: "SP", revenue: 4500 },
  { local: "MS", revenue: 400 },
  { local: "RJ", revenue: 2500 },
];

const chartConfig = {
  revenue: {
    label: "Receita",
    color: "#11d459",
  },
  royalties: {
    label: "Royalties",
    color: "#3dff84",
  }
} satisfies ChartConfig

const chartColumnConfig = {
  local: {
    label: "Localidade",
  },
  revenue: {
    label: "Faturamento",
    color: "#11d459",
  }
}

export default function HomePage() {
  return (
    <>
      <Header pageTitle="Painel Financeiro" subtext="Visualize gráficos de desempenho e royalties">
        <Link href="/" className="text-accent bg-accent-foreground rounded-md p-1.5 hover:bg-accent-foreground/80">Gerenciar Inadimplências</Link>
      </Header>

      <section>
        <div className="flex gap-10 mb-6">
          <MetricCard title="Receita Total" value="R$52mil" description="Aumento de 5% comparado a mês passado" icon={BanknoteArrowUp}/>
          <MetricCard title="Royalties Emitidos" value="2" description="De um total de 40 lojas" icon={ReceiptText}/>
          <MetricCard title="Royalties Atrasados" value="24" icon={AlertCircle} description="Alerta"/>
        </div>

        <div className="flex justify-between gap-5">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Receita por mês</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid stroke="#979797" vertical={false}/>

                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4}/>
                  <Bar dataKey="royalties" fill="var(--color-royalties)" radius={4}/>

                  <YAxis type="number"/>
                  <XAxis dataKey="month"/>

                  <ChartLegend content={<ChartLegendContent/>}/>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="h-full w-full">
            <CardHeader>
              <CardTitle>Faturamento por Localidade</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartColumnConfig} className="w-full">
                <BarChart layout="vertical" accessibilityLayer data={columnchartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid stroke="#979797" horizontal={false}/>

                  <Bar dataKey="revenue" fill="var(--color-revenue)" barSize={24} radius={4}/>

                  <XAxis type="number"/>
                  <YAxis dataKey="local" type="category"/>

                  <ChartLegend content={<ChartLegendContent/>}/>
                  <ChartTooltip content={<ChartTooltipContent/>}/>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}