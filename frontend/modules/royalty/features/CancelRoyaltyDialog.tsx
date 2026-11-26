"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { FieldGroup } from "@/components/ui/field";
import { FormTextField } from "@/shared/ui/form/FormTextField";
import { cancelRoyaltyAction } from "../actions";
import { cancelRoyaltyFormSchema, type CancelRoyaltyFormData, type Royalty } from "../schema";
import { formatCurrency, formatReference } from "../utils";

type Props = {
  royalty: Royalty;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CancelRoyaltyDialog({ royalty, open, onOpenChange }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CancelRoyaltyFormData>({
    resolver: zodResolver(cancelRoyaltyFormSchema),
    defaultValues: { reason: "" },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (open) reset({ reason: "" });
  }, [open, reset]);

  const onSubmit = async (data: CancelRoyaltyFormData) => {
    setIsSubmitting(true);
    const result = await cancelRoyaltyAction({ id: royalty.id, ...data });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    toast.success("Royalty cancelado com sucesso");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancelar royalty</DialogTitle>
          <DialogDescription>
            {royalty.unitName} · {formatReference(royalty.referenceMonth, royalty.referenceYear)} ·{" "}
            {formatCurrency(royalty.amount)}. O registro é mantido no histórico como cancelado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormTextField
              id="reason"
              label="Motivo do cancelamento"
              register={register("reason")}
              error={errors.reason?.message}
            />
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Voltar
            </Button>
            <Button type="submit" variant="destructive" disabled={isSubmitting}>
              {isSubmitting ? "Cancelando..." : "Cancelar royalty"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}