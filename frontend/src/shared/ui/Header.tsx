import { ReactNode } from "react";

interface HeaderProps {
    pageTitle: string,
    subtext?: string,
    children?: ReactNode,
}

export function Header({ pageTitle, subtext, children }: HeaderProps) {
    return (
        <section className="relative mb-4">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-bold">{pageTitle}</h1>
                <p className="text-gray-500">{subtext}</p>
                </div>

                <div>
                    {children}
                </div>
            </div>

            <hr className="mt-5 border"/>
        </section>
    );
}