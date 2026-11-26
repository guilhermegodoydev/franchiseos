import { redirect } from "next/navigation";
import { GenerateRoyaltiesDialog } from "@/modules/royalty/features/GenerateRoyaltiesDialog";
import { RoyaltiesStatusFilter } from "@/modules/royalty/features/list-royalties/RoyaltiesStatusFilter";
import { getRoyalties } from "@/modules/royalty/queries";
import { ROYALTY_STATUSES } from "@/modules/royalty/schema";
import { buildRoyaltiesHref } from "@/modules/royalty/utils";
import { DataPagination } from "@/shared/ui/Pagination";
import { Header } from "@/shared/ui/Header";
import { DataTable } from "@/shared/ui/table/DataTable";
import { columns } from "@/modules/royalty/features/list-royalties/columns";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ page?: string; status?: string }>;
};

export default async function RoyaltiesPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const status = ROYALTY_STATUSES.find((s) => s === params.status);

  const { royalties, totalItems, totalPages } = await getRoyalties({ page, status });

  if (totalPages > 0 && page > totalPages) {
    redirect(buildRoyaltiesHref(totalPages, status));
  }

  return (
    <>
      <Header title="Royalties" subtext="Acompanhe o que cada unidade deve à matriz, mês a mês.">
          <GenerateRoyaltiesDialog />
      </Header>
      
      <RoyaltiesStatusFilter current={status} />

      <DataTable columns={columns} data={royalties}/>

      <DataPagination 
        registerName="Royalties"
        totalItems={totalItems ?? 0} 
        totalPages={totalPages ?? 1} 
        currentPage={page ?? 1}
      />
    </>
  );
}