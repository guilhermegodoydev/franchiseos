import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/shared/ui/Header";
import { MetricCard } from "@/shared/ui/MetricCard";
import { PaginationTable } from "@/shared/ui/Pagination";

const paginationItems:any = [
    { href: "#", index: 1, isActive: false },
    { href: "#", index: 2, isActive: true },
    { href: "#", index: 3, isActive: false },
];

export default function RoyaltiesPage() {
    return (
        <>
            <Header pageTitle="Royalties" subtext="Gerencie os royalties">
                <div className="flex gap-3">
                    <Button className="bg-zinc-900/80">Cobrar Pendentes</Button>
                    <Button className="bg-zinc-900/80">Fechar mês</Button>
                </div>
            </Header>

            <section className="flex gap-5">
                <MetricCard title="Total ganho em pagamentos" value="23mil" description="Total ganho dos royalties pagos"/>
                <MetricCard title="Emitidos" value="2 de 12" description="Quantos foram emitidos e quantos faltam"/>
                <MetricCard title="Pagamentos Pendentes" value="7" description="Royalties dentro do prazo do vencimento"/>
            </section>

            <section className="mt-10">
                <Tabs>
                    <TabsList>
                        <TabsTrigger value="pending">Pendentes</TabsTrigger>
                        <TabsTrigger value="noreleased">Não Lançados</TabsTrigger>
                        <TabsTrigger value="paid">Pagos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pending">
                        <Card>
                            <CardHeader className="flex items-center justify-between mb-3">
                                <CardTitle>Franqueado Ponta da Praia</CardTitle>

                                <div className="flex gap-3">
                                    <p className="border border-red-600/50 p-1 rounded-md text-color-red-600 px-1 font-medium bg-red-600/40 text-red-900">Pendente</p>
                                </div>
                            </CardHeader>

                            <CardContent className="flex items-end justify-between">
                                <div className="">
                                    <p className="font-medium">A receber: 12.5mil</p>
                                    <p>Score: <span className="text-green-700 font-medium">BOM</span></p>
                                </div>

                                <Button className="bg-zinc-800">Cobrar</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="noreleased">
                        <Card>
                            <CardHeader className="flex items-center justify-between mb-3">
                                <CardTitle>Franqueado Ponta da Praia</CardTitle>

                                <div className="flex gap-3">
                                    <p className="border border-gray-600/50 p-1 rounded-md px-1 font-medium bg-gray-600/40 text-gray-900">Sem fechamento</p>
                                </div>
                            </CardHeader>

                            <CardContent className="flex items-end justify-between">
                                <div className="">
                                    <p className="font-medium">A receber: 12.5mil</p>
                                    <p>Score: <span className="text-green-700 font-medium">REGULAR</span></p>
                                </div>

                                <Button className="bg-zinc-800">Lançar</Button>
                            </CardContent>
                        </Card>    
                    </TabsContent>

                    <TabsContent value="paid">
                        <Card>
                            <CardHeader className="flex items-center justify-between mb-3">
                                <CardTitle>Franqueado Ponta da Praia</CardTitle>

                                <div className="flex gap-3">
                                    <p className="border border-green-600/50 p-1 rounded-md px-1 font-medium bg-green-600/40 text-green-900">Pago</p>
                                </div>
                            </CardHeader>

                            <CardContent className="flex items-end justify-between">
                                <div className="">
                                    <p className="font-medium">A receber: 12.5mil</p>
                                    <p>Score: <span className="text-red-700 font-medium">RUIM</span></p>
                                </div>

                                <Button className="bg-zinc-800">Ver pagamento</Button>
                            </CardContent>
                        </Card>    
                    </TabsContent>
                </Tabs>

                <PaginationTable hrefPrevious="#" hrefNext="#" items={paginationItems}/>
            </section>
        </>
    );
}