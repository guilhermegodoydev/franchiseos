"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Royalty } from "../../schema";
import { PayRoyaltyDialog } from "../PayRoyaltyDialog";
import { Ban, Check, Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CancelRoyaltyDialog } from "../CancelRoyaltyDialog";

export function RoyaltiesRowActions({ royalty }: { royalty: Royalty }) {
  const [payOpen, setPayOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  if (royalty.status === "Paid" || royalty.status === "Cancelled") {
    return <span className="text-sm text-muted-foreground">--</span>;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost"><Ellipsis/></Button>} />
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setPayOpen(true)}>
              <Check />
              Marcar como pago
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => setCancelOpen(true)}>
              <Ban />
              Cancelar
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <PayRoyaltyDialog royalty={royalty} open={payOpen} onOpenChange={setPayOpen} />
      <CancelRoyaltyDialog royalty={royalty} open={cancelOpen} onOpenChange={setCancelOpen} />
    </>
  );
}