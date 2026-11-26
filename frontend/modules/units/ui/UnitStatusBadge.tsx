import { Badge } from "@/components/ui/badge";
import { UNIT_STATUS_LABEL } from "../schema";

const styles = {
    Active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    Inactive: "bg-gray-500/15 text-gray-500 border-gray-400",
}

export function UnitStatusBadge({ status }: { status: "Active" | "Inactive" }) {
    const formattedValue = UNIT_STATUS_LABEL[status];

    return (
        <Badge variant="outline" className={styles[status as keyof typeof styles]}>
            {formattedValue}
        </Badge>
    );
}