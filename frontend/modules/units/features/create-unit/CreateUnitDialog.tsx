"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldError, FieldLabel } from "@/components/ui/field";
import { Filter } from "@/shared/ui/Filter";
import { unitSchema, UNIT_STATUS_LABEL, UNIT_TYPE_LABEL, UNIT_SIZE_LABEL } from "@/modules/units/schema";
import { createUnit } from "@/modules/units/actions";

const createUnitSchema = unitSchema.omit({ id: true, main_office_id: true });
type CreateUnitFormData = z.infer<typeof createUnitSchema>;

const defaultValues: CreateUnitFormData = {
  name: "",
  status: "" as any,
  size: "" as any,
  type: "" as any,
  cep: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  royalties_percentage: null,
};

const STEPS: { title: string; fields: (keyof CreateUnitFormData)[] }[] = [
  { title: "Identificação", fields: ["name"] },
  { title: "Classificação", fields: ["status", "type", "size"] },
  { title: "Endereço", fields: ["cep", "street", "number", "neighborhood", "city", "state"] },
  { title: "Financeiro", fields: ["royalties_percentage"] },
];

interface CreateUnitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mainOfficeId: string;
}

export function CreateUnitDialog({ open, onOpenChange, mainOfficeId }: CreateUnitDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    trigger,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CreateUnitFormData>({
    resolver: zodResolver(createUnitSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
      setStep(0);
    }
  }, [open, reset]);

  const isLastStep = step === STEPS.length - 1;

  const handleNext = async () => {
    const valid = await trigger(STEPS[step].fields);
    if (valid) {
      clearErrors();
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data: CreateUnitFormData) => {
    setIsSubmitting(true);
    const result = await createUnit(mainOfficeId, data);
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Unidade criada com sucesso");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova unidade</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Etapa {step + 1} de {STEPS.length} — {STEPS[step].title}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {step === 0 && (
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input id="name" {...register("name")} />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
            )}

            {step === 1 && (
              <>
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Filter
                        name="status"
                        items={UNIT_STATUS_LABEL}
                        placeholder="Selecione o status"
                        value={field.value}
                        allowClear={false}
                        onChange={(_, value) => field.onChange(value)}
                      />
                    )}
                  />
                  {errors.status && <FieldError>{errors.status.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel>Tipo</FieldLabel>
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <Filter
                        name="type"
                        items={UNIT_TYPE_LABEL}
                        placeholder="Selecione o tipo"
                        value={field.value}
                        allowClear={false}
                        onChange={(_, value) => field.onChange(value)}
                      />
                    )}
                  />
                  {errors.type && <FieldError>{errors.type.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel>Tamanho</FieldLabel>
                  <Controller
                    control={control}
                    name="size"
                    render={({ field }) => (
                      <Filter
                        name="size"
                        items={UNIT_SIZE_LABEL}
                        placeholder="Selecione o tamanho"
                        value={field.value}
                        allowClear={false}
                        onChange={(_, value) => field.onChange(value)}
                      />
                    )}
                  />
                  {errors.size && <FieldError>{errors.size.message}</FieldError>}
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex gap-3">
                  <Field className="w-32">
                    <FieldLabel htmlFor="cep">CEP</FieldLabel>
                    <Input id="cep" {...register("cep")} />
                    {errors.cep && <FieldError>{errors.cep.message}</FieldError>}
                  </Field>

                  <Field className="flex-1">
                    <FieldLabel htmlFor="street">Rua</FieldLabel>
                    <Input id="street" {...register("street")} />
                    {errors.street && <FieldError>{errors.street.message}</FieldError>}
                  </Field>
                </div>

                <div className="flex gap-3">
                  <Field className="w-28">
                    <FieldLabel htmlFor="number">Número</FieldLabel>
                    <Input id="number" {...register("number")} />
                    {errors.number && <FieldError>{errors.number.message}</FieldError>}
                  </Field>

                  <Field className="flex-1">
                    <FieldLabel htmlFor="neighborhood">Bairro</FieldLabel>
                    <Input id="neighborhood" {...register("neighborhood")} />
                    {errors.neighborhood && <FieldError>{errors.neighborhood.message}</FieldError>}
                  </Field>
                </div>

                <div className="flex gap-3">
                  <Field className="flex-1">
                    <FieldLabel htmlFor="city">Cidade</FieldLabel>
                    <Input id="city" {...register("city")} />
                    {errors.city && <FieldError>{errors.city.message}</FieldError>}
                  </Field>

                  <Field className="w-20">
                    <FieldLabel htmlFor="state">UF</FieldLabel>
                    <Input id="state" maxLength={2} {...register("state")} />
                    {errors.state && <FieldError>{errors.state.message}</FieldError>}
                  </Field>
                </div>
              </>
            )}

            {step === 3 && (
              <Field>
                <FieldLabel htmlFor="royalties_percentage">Royalties (%) — opcional</FieldLabel>
                <Controller
                  control={control}
                  name="royalties_percentage"
                  render={({ field }) => (
                    <Input
                      id="royalties_percentage"
                      type="number"
                      step="0.01"
                      min={1}
                      max={100}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        field.onChange(raw === "" ? null : Number(raw));
                      }}
                    />
                  )}
                />
                {errors.royalties_percentage && (
                  <FieldError>{errors.royalties_percentage.message}</FieldError>
                )}
              </Field>
            )}
          </FieldGroup>

          <DialogFooter className="mt-6">
            {step > 0 && (
              <Button key="btn-back" type="button" variant="outline" onClick={handleBack}>
                Voltar
              </Button>
            )}
            {isLastStep ? (
              <Button key="btn-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Criando..." : "Criar unidade"}
              </Button>
            ) : (
              <Button key="btn-next" type="button" onClick={handleNext}>
                Próximo
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}