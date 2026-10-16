import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function Serachbar() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const activeSearch = searchParams.get("searchName") ?? "";
    const [searchValue, setSearchValue] = useState(activeSearch);
    
    const handleSearch = () => {
        const trimmed = searchValue.trim();
        const params = new URLSearchParams(searchParams.toString());

        if (!trimmed) {
            params.delete("searchName");
        } else {
            params.set("searchName", trimmed);
        }

        params.delete("page");

        router.push(`${pathName}?${params.toString()}`, { scroll: false });
    };

    const isSearchDisabled = searchValue.trim() === "" && activeSearch === "";

    return (
        <div className="relative w-full max-w-sm">
            <Input
                placeholder="Buscar por nome"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                }}
                className="pr-10"
            />
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                disabled={isSearchDisabled}
                onClick={handleSearch}
            >
            <Search className="h-4 w-4" />
            </Button>
        </div>
    );
}