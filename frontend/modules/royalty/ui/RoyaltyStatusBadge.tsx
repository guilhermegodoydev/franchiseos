import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RoyaltyStatus } from "../schema";

const CONFIG: Record<RoyaltyStatus, { label: string; className: string }> = {
  Pending: {
    label: "Pendente",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  Overdue: {
    label: "Atrasado",
    className: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
  },
  Paid: {
    label: "Pago",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  Cancelled: {
    label: "Cancelado",
    className: "border-gray-500/30 bg-gray-500/10 text-gray-700 dark:text-gray-400",
  },
};

export function RoyaltyStatusBadge({ status }: { status: RoyaltyStatus }) {
  const { label, className } = CONFIG[status];
  return (
    <Badge variant="outline" className={cn(className)}>
      {label}
    </Badge>
  );
}