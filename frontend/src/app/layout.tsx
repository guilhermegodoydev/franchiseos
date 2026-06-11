import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSideBar } from "@/shared/ui/MainSideBar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "FranchiseOS",
  description: "Enterprise Grade Financial Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-row antialiased">

        <SidebarProvider>
          <MainSideBar/>
 
          <main className="flex flex-col w-full p-5">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
