"use client";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { Building2, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Filter } from "./Filter";
import { MONTHS, YEARS } from "../consts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { logoutUser } from "@/modules/auth/actions";

const dateReferenceSchema = z.object({
  month: z.string().min(1, "Selecione o mês"),
  year: z.string().min(1, "Selecione o ano"),
});

type DateReferenceFormData = z.infer<typeof dateReferenceSchema>;

export function MySidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ isPending, setIsPending ] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<DateReferenceFormData>({
    resolver: zodResolver(dateReferenceSchema),
    defaultValues: {
      month: searchParams.get("month") ?? "",
      year: searchParams.get("year") ?? "",
    },
  });

  const onSubmit = (data: DateReferenceFormData) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", data.month);
    params.set("year", data.year);

    router.push(`${pathname}?${params}`);
  };

  const handleLogout = async () => {
    setIsPending(true);
    await logoutUser();
    
    router.replace("/login");
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-center font-semibold text-xl">FranchiseOS</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Geral</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Link href="/units" passHref>
                <SidebarMenuButton isActive={pathname === "/units"}>
                  <Building2 />
                  <p>Unidades</p>
                </SidebarMenuButton>
              </Link>
            </SidebarMenu>
          </SidebarGroupContent>

          <hr className="my-3"/>

          <SidebarGroupContent>
            <SidebarMenu>
              <form
                id="general-date-reference"
                onSubmit={handleSubmit(onSubmit)}
                className="px-2"
              >
                <FieldGroup>
                  <Field>
                    <Controller
                      control={control}
                      name="month"
                      render={({ field, fieldState }) => (
                        <Filter
                          name="month"
                          items={MONTHS}
                          value={field.value}
                          placeholder="Mês"
                          onChange={(_, value) => field.onChange(value)}
                          aria-invalid={!!fieldState.error}
                        />
                      )}
                    />
                    {errors.month && <FieldError>{errors.month.message}</FieldError>}
                  </Field>

                  <Field>
                    <Controller
                      control={control}
                      name="year"
                      render={({ field, fieldState }) => (
                        <Filter
                          name="year"
                          items={YEARS}
                          value={field.value}
                          placeholder="Ano"
                          onChange={(_, value) => field.onChange(value)}
                          aria-invalid={!!fieldState.error}
                        />
                      )}
                    />
                    {errors.year && <FieldError>{errors.year.message}</FieldError>}
                  </Field>
                </FieldGroup>

                <Button type="submit" className="mt-3 w-full">Alterar</Button>
              </form>
            </SidebarMenu>
          </SidebarGroupContent>

          <hr className="my-3"/>
          
          <SidebarGroupContent>
            <SidebarMenu>
              <Button 
                variant="destructive" 
                className={`bg-transparent ${isPending ? "cursor-not-allowed" : ""}`}
                disabled={isPending}
                onClick={handleLogout}
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full border-2 border-transparent border-t-red-500 w-5 h-5"></div>
                    Saindo...
                  </>
                ) : (
                  <>
                    <LogOut className="rotate-180"/>
                    Sair
                  </>
                )}
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}