"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { LoginFormData, loginSchema } from "@/modules/auth/schema";
import { loginUser } from "@/modules/auth/actions";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passVisible, setPassVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
        mode: "onSubmit",
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);
        const result = await loginUser(data);
        setIsSubmitting(false);

        if (!result.success) {
            toast.error(result.error);
            return;
        }

        window.location.href = "/units";
    };

    const togglePassVisibility = () => {
        setPassVisible(!passVisible);
    };

    return (
        <div className="w-full max-w-[400px] rounded-[20px] border border-[#ECEEF1] bg-white p-10 shadow-[0_1px_2px_rgba(16,21,26,.04),0_16px_36px_rgba(16,21,26,.07)]">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Bem-vindo de volta</h2>
            <p className="mb-8 mt-1.5 text-sm text-muted-foreground">Entre com suas credenciais para acessar o painel.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px]">
                <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                    id="email"
                    type="email"
                    placeholder="voce@suaempresa.com"
                    autoComplete="email"
                    className="rounded-xl"
                    {...register("email")}
                    />
                    {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </Field>

                <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <div className="relative">
                        <Input
                            id="password"
                            type={passVisible ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className="rounded-xl"
                            {...register("password")}
                        />
                        <button type="button" onClick={togglePassVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {passVisible ? (<EyeOff className="h-5 w-5"/>) : (<Eye className="h-5 w-5"/>)}
                        </button>
                    </div>
                    {errors.password && <FieldError>{errors.password.message}</FieldError>}
                </Field>

                {/* <div className="-mt-1 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-[13px] text-foreground">
                    <Checkbox className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                    Lembrar-me
                    </label>
                    <a href="#" className="text-[13px] font-semibold text-indigo-700 hover:text-indigo-900">
                    Esqueceu a senha?
                    </a>
                </div> */}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1.5 h-auto rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 py-3 text-[15px] font-bold text-white hover:opacity-90"
                >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
            </form>
            <p className="mt-7 text-center text-[13px] text-muted-foreground">Ainda não tem acesso? Fale com o administrador da sua franquia.</p>
        </div>
    );
}