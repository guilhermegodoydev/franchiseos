"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Building2, Handshake, LayoutDashboard, LogOut, ReceiptText, Settings } from "lucide-react";
import Link from "next/link";

export function MainSideBar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <span className="text-center font-semibold text-xl">FranchiseOS</span>
            </SidebarHeader>

            <hr />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>GERAL</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuButton asChild isActive>
                                <Link href="/">
                                    <LayoutDashboard/>
                                    <p>Dashboard</p>
                                </Link>
                            </SidebarMenuButton>
                            
                            <SidebarMenuButton asChild>
                                <Link href="/units">
                                    <Building2/>
                                    <p>Unidades</p>
                                </Link>
                            </SidebarMenuButton>

                            <SidebarMenuButton asChild>
                                <Link href="/franchises">
                                    <Handshake/>
                                    <p>Franqueados</p>
                                </Link>
                            </SidebarMenuButton>

                            <SidebarMenuButton asChild>
                                <Link href="/royalties">
                                    <ReceiptText/>
                                    <p>Royalties</p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <hr />

                <SidebarGroup>
                    <SidebarGroupLabel>SUPPORT</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuButton asChild>
                                <Link href="/">
                                    <Settings/>
                                    <p>Configurações</p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <hr />
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuButton asChild>
                                <Link href="/">
                                    <LogOut/>
                                    <p>Sair</p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuButton className="py-6 hover:bg-hover">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt=""/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Ronaldo</p>
                            <p className="text-xs text-gray-500">Gerente</p>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}