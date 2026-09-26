"use client";

import { UNIT_SIZE_LABEL, UNIT_STATUS_LABEL, UNIT_TYPE_LABEL } from "@/modules/units/schema";
import { Download } from "lucide-react";
import { Filter } from "@/shared/ui/Filter";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Serachbar } from "@/shared/ui/Searchbar";

export function ContainerFilters({ states, cities }: { states: string[], cities: string[] }) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const handleAlterFiler = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!value) {
            params.delete(name);
        } else {
            params.set(name, value);
        }

        if (name === "state") {
            params.delete("city");
        }

        params.delete("page");

        router.push(`${pathName}?${params.toString()}`, { scroll: false });
    }

    return (
        <>
            <Serachbar/>
            <div className="flex justify-between my-3">
                <div className="flex gap-3">
                    <Filter placeholder="Filtrar por Tipo" value={searchParams.get("type") ?? ""} items={UNIT_TYPE_LABEL} name="type" onChange={handleAlterFiler}/>
                    <Filter placeholder="Filtrar por Status" value={searchParams.get("status") ?? ""} items={UNIT_STATUS_LABEL} name="status" onChange={handleAlterFiler}/>
                    <Filter placeholder="Filtrar por Tamanho" value={searchParams.get("size") ?? ""} items={UNIT_SIZE_LABEL} name="size" onChange={handleAlterFiler}/>
                    <Filter placeholder="Filtrar por Estado" value={searchParams.get("state") ?? ""} items={states} name="state" onChange={handleAlterFiler}/>
                    <Filter placeholder="Filtrar por Cidade" value={searchParams.get("city") ?? ""} items={cities} name="city" onChange={handleAlterFiler}/>
                </div>

                <div className="flex gap-3">
                    <Button variant="secondary">
                        <Download/>
                    </Button>
                </div>
            </div>
        </>
    );
}