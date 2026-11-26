import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROYALTY_STATUSES, ROYALTY_STATUS_LABEL, type RoyaltyStatus } from "../../schema";
import { buildRoyaltiesHref } from "../../utils";

export function RoyaltiesStatusFilter({ current }: { current?: RoyaltyStatus }) {
  const items: { label: string; status?: RoyaltyStatus }[] = [
    { label: "Todos" },
        ...ROYALTY_STATUSES.map((status) => ({ label: `${ROYALTY_STATUS_LABEL[status]}s`, status })),
  ];

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Filtrar por status">
      {items.map(({ label, status }) => (
        <Link
          key={label}
          href={buildRoyaltiesHref(1, status)}
          className={cn(
            buttonVariants({ variant: current === status ? "default" : "outline", size: "sm" })
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}