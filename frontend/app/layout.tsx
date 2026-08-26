import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MySidebar } from "../shared/ui/MySidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FranchiseOS",
  description: "FranchiseOS é um sistema de gestão de franquias que oferece uma solução completa para empreendedores e franqueadores. Com recursos avançados de gerenciamento, análise de dados e comunicação, o FranchiseOS ajuda a otimizar operações, aumentar a eficiência e impulsionar o crescimento do negócio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", figtree.variable)}
    >
      <body className="min-h-full flex flex-col">
          <SidebarProvider>
            <MySidebar/>

            <main className="flex-1 p-4">
              <SidebarTrigger />
              
              {children}
            </main>
          </SidebarProvider>
      </body>
    </html>
  );
}
