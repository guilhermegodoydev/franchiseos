import type { Metadata } from "next";
import { MySidebar } from "../../shared/ui/MySidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "FranchiseOS",
  description: "FranchiseOS é um sistema de gestão de franquias que oferece uma solução completa para empreendedores e franqueadores. Com recursos avançados de gerenciamento, análise de dados e comunicação, o FranchiseOS ajuda a otimizar operações, aumentar a eficiência e impulsionar o crescimento do negócio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-full flex flex-col">
        <SidebarProvider>
          <MySidebar/>

          <main className="min-w-0 flex-1">
            <SidebarTrigger />
            
            <div className="p-4">
              {children}
            </div>
          </main>
        </SidebarProvider>
    </div>
  );
}
