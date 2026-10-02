"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Eye, Pen, TrashIcon } from "lucide-react"
import { ButtonDesactiveUnit } from "./ButtonDesactiveUnit"

export function TableRowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost"><Ellipsis/></Button>} />
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Eye/>
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pen/>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <TrashIcon/>
            Desativar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}