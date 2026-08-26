"use client";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MySidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <span className="text-center font-semibold text-xl">FranchiseOS</span>
            </SidebarHeader>
            
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Unidades</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <Link href="/units" passHref>
                                <SidebarMenuButton isActive={pathname === "/units"}>
                                        <Building2/>
                                        <p>Unidades</p>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}