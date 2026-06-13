import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationTable {
    hrefPrevious: string,
    hrefNext: string,
    items: [{
        href: string,
        index: string,
        isActive: boolean
    }]
}

export function PaginationTable({ hrefPrevious, hrefNext, items }: PaginationTable) {
    return (
        <div className="my-2">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={hrefPrevious} />
                    </PaginationItem>
                    {items.map(item => (
                        <PaginationItem key={item.index}>
                            <PaginationLink href={item.href} isActive={item.isActive}>{item.index}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href={hrefNext} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}