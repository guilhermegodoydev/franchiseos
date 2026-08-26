import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingUnitsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-10 w-56 rounded-xl" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>

        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-44 rounded-xl" />
          <Skeleton className="h-10 w-44 rounded-xl" />
        </div>
      </div>

      <section className="grid gap-5 md:grid-cols-3">
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-32 rounded-3xl" />
      </section>

      <section className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40 rounded-md" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-24 rounded-3xl" />
              <Skeleton className="h-24 rounded-3xl" />
              <Skeleton className="h-24 rounded-3xl" />
            </div>
            <Skeleton className="h-10 rounded-3xl" />
            <Skeleton className="h-10 rounded-3xl" />
            <Skeleton className="h-10 rounded-3xl" />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
