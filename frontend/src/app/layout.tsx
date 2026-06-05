import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pt-br">
      <body className="min-h-full flex flex-col">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
