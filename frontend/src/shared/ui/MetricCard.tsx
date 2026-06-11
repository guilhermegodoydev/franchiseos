import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
    title: string,
    value: string,
    icon?: LucideIcon,
    description?: string,
}

export function MetricCard({ title, value, description, icon: Icon }: MetricCardProps) {
    return (
        <Card className="w-full h-auto shadow-md">
            <CardHeader className="relative flex justify-between">
                <CardTitle>
                    <h2 className="text-gray-500 mb-0">{title}</h2>
                </CardTitle>

                {Icon && 
                    <div className="absolute right-4 bg-gray-200/80 rounded-md p-1.5">
                        <Icon className="text-gray-400"/>
                    </div>
                }
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-semibold">{value}</p>
                {description && description != "" ? 
                    <CardDescription>
                        <p>{description}</p>
                    </CardDescription>
                : null}
            </CardContent>
        </Card>
    );
}