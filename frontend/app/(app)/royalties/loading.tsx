import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingRoyaltiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-10 w-56 rounded-xl" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-44 rounded-xl" />
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-xl" />
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton className="h-11 rounded-xl" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-10 rounded-xl" />
        ))}
      </div>

      <Skeleton className="h-9 w-56 rounded-xl" />
    </div>
  );
}