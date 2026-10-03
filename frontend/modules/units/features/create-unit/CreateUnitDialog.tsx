"use client";

import { FocusEvent, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldError, FieldLabel } from "@/components/ui/field";
import { unitSchema, UNIT_STATUS_LABEL, UNIT_TYPE_LABEL, UNIT_SIZE_LABEL, CreateUnitFormData, UpdateUnitFormData, createUnitSchema } from "@/modules/units/schema";
import { createUnit, updateUnit } from "@/modules/units/actions";
import { getAddressByCep } from "@/shared/actions";
import { FormTextField } from "@/shared/ui/form/FormTextField";
import { FormFilterField } from "@/shared/ui/form/FormFilterField";
import { IMaskInput } from 'react-imask';
import { CONFIG_MASKS } from "@/shared/consts";

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
  royaltiesPercentage: null,
};

const STEPS: { title: string; fields: (keyof CreateUnitFormData)[] }[] = [
  { title: "Identificação", fields: ["name"] },
  { title: "Classificação", fields: ["status", "type", "size"] },
  { title: "Endereço", fields: ["cep", "street", "number", "neighborhood", "city", "state"] },
  { title: "Financeiro", fields: ["royaltiesPercentage"] },
];

interface CreateUnitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mainOfficeId?: string;
  unitId?: string;
  unit?: UpdateUnitFormData;
}

export function CreateUnitDialog({ open, onOpenChange, mainOfficeId, unitId, unit }: CreateUnitDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const isEditMode = !!unitId;

  const { control, register, setValue, handleSubmit, trigger, clearErrors, reset, formState: { errors }, } = useForm<CreateUnitFormData>({
    resolver: zodResolver(createUnitSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (open) {
      reset(unit ? { ...unit, status: "Active" as any } : defaultValues);
    } else {
      setStep(0);
    }
  }, [open, unit, reset]);

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

    const { status, ...rest } = data;

    const result = isEditMode
      ? await updateUnit(unitId!, rest)
      : await createUnit(mainOfficeId!, data);

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success(isEditMode ? "Unidade atualizada com sucesso" : "Unidade criada com sucesso");
    onOpenChange(false);
  };

  const getAddress = async (e: FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value;

    const res = await getAddressByCep(cep);

    if (res?.error) return;

    const data = res.data;

    setValue("city", data?.city || "");
    setValue("neighborhood", data?.neighborhood || "");
    setValue("state", data?.state || "");
    setValue("street", data?.street || "");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Editar unidade" : "Nova unidade"}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Etapa {step + 1} de {STEPS.length} — {STEPS[step].title}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {step === 0 && (
              <FormTextField id="name" label="Nome" register={register("name")} error={errors.name?.message}/>
            )}

            {step === 1 && (
              <>
                {!isEditMode && (
                  <FormFilterField 
                    name="status" 
                    control={control} 
                    label="Status" 
                    items={UNIT_STATUS_LABEL}
                    placeholder="Selecione o status"
                    error={errors.status?.message}
                  />
                )}

                <FormFilterField 
                  name="type" 
                  control={control} 
                  label="Tipo" 
                  items={UNIT_TYPE_LABEL}
                  placeholder="Selecione o Tipo"
                  error={errors.type?.message}
                />

                <FormFilterField 
                  name="size" 
                  control={control} 
                  label="Tamanho" 
                  items={UNIT_SIZE_LABEL}
                  placeholder="Selecione o tamanho"
                  error={errors.size?.message}
                />
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex gap-3">
                  <Field className="w-32">
                    <FieldLabel htmlFor="cep">CEP</FieldLabel>
                    <Controller
                      control={control}
                      name="cep"
                      render={({ field }) => (
                        <IMaskInput
                          mask={CONFIG_MASKS.cep}
                          value={field.value}
                          onAccept={(value, maskRef) => field.onChange(maskRef.unmaskedValue)}
                          onBlur={(e) => {
                            field.onBlur();
                            getAddress(e as any);
                          }}
                          className="border bg-gray-100/80 p-2 rounded-full w-full"
                          id="cep"
                        />
                      )}
                    />
                    {errors.cep && <FieldError>{errors.cep.message}</FieldError>}
                  </Field>

                  <FormTextField id="street" label="Rua" className="flex-1" register={register("street")} error={errors.street?.message} />
                </div>

                <div className="flex gap-3">
                  <FormTextField id="number" label="Número" className="w-28" register={register("number")} error={errors.number?.message} />
                  <FormTextField id="neighborhood" label="Bairro" className="flex-1" register={register("neighborhood")} error={errors.neighborhood?.message}/>
                </div>

                <div className="flex gap-3">
                  <FormTextField id="city" label="Cidade" className="flex-1" register={register("city")} error={errors.city?.message}/>                  
                  <FormTextField id="state" label="Estado" className="w-20" register={register("state")} error={errors.state?.message}/>
                </div>
              </>
            )}

            {step === 3 && (
              <Field>
                <FieldLabel htmlFor="royaltiesPercentage">Royalties (%) — opcional</FieldLabel>
                <Controller
                  control={control}
                  name="royaltiesPercentage"
                  render={({ field }) => (
                    <Input
                      id="royaltiesPercentage"
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
                {errors.royaltiesPercentage && (
                  <FieldError>{errors.royaltiesPercentage.message}</FieldError>
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
                {isSubmitting ? "Salvando..." : isEditMode ? "Salvar alterações" : "Criar unidade"}
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