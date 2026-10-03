"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Eye, Pen, TrashIcon } from "lucide-react"

interface TableRowActionsProps {
  onDelete: (unitId: string) => void;
  onUpdate: (unitId: string) => void;
}

export function TableRowActions({ onDelete, onUpdate }: TableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost"><Ellipsis/></Button>} />
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Eye/>
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdate("unitId")}>
            <Pen/>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => onDelete("unitId")}>
            <TrashIcon/>
            Desativar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}