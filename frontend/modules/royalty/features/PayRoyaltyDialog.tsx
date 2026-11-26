"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormFilterField } from "@/shared/ui/form/FormFilterField";
import { payRoyaltyAction } from "../actions";
import { PAY_METHOD_LABEL, payRoyaltyFormSchema, type PayRoyaltyFormData, type Royalty } from "../schema";
import { formatCurrency, formatReference, todayInSaoPaulo } from "../utils";

type Props = {
  royalty: Royalty;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PayRoyaltyDialog({ royalty, open, onOpenChange }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<PayRoyaltyFormData>({
    resolver: zodResolver(payRoyaltyFormSchema),
    defaultValues: { payMethod: "" as any, payDate: todayInSaoPaulo() },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (open) reset({ payMethod: "" as any, payDate: todayInSaoPaulo() });
  }, [open, reset]);

  const onSubmit = async (data: PayRoyaltyFormData) => {
    setIsSubmitting(true);
    const result = await payRoyaltyAction({ id: royalty.id, ...data });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    toast.success("Pagamento registrado com sucesso");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar pagamento</DialogTitle>
          <DialogDescription>
            {royalty.unitName} · {formatReference(royalty.referenceMonth, royalty.referenceYear)} ·{" "}
            {formatCurrency(royalty.amount)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormFilterField
              name="payMethod"
              control={control}
              label="Forma de pagamento"
              items={PAY_METHOD_LABEL}
              placeholder="Selecione a forma de pagamento"
              error={errors.payMethod?.message}
            />

            <Field>
              <FieldLabel htmlFor="payDate">Data do pagamento</FieldLabel>
              <Controller
                control={control}
                name="payDate"
                render={({ field }) => (
                  <Input
                    id="payDate"
                    type="date"
                    max={todayInSaoPaulo()}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.payDate && <FieldError>{errors.payDate.message}</FieldError>}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Confirmar pagamento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}