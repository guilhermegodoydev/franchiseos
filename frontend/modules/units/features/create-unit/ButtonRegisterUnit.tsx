"use client";

import { Button } from "@/components/ui/button";
import { CreateUnitDialog } from "./CreateUnitDialog";
import { useState } from "react";

export function ButtonRegisterUnit() {
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setCreateOpen(true)}>Cadastrar Nova Unidade</Button>

            <CreateUnitDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
                mainOfficeId="01a0dea4-983d-7123-a123-123456789abc"
            />
        </>
    );
}