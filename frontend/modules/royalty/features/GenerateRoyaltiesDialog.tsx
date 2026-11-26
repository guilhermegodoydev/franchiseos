"use client";

import { useState, useTransition } from "react";
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
import { Label } from "@/components/ui/label";
import { generateRoyaltiesAction } from "../actions";
import { MONTH_NAMES, previousMonth } from "../utils";

const SELECT_CLASS =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

export function GenerateRoyaltiesDialog() {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(next: boolean) {
    if (next) {
      // Padrão: o mês anterior, que já está fechado.
      const prev = previousMonth();
      setMonth(String(prev.month));
      setYear(String(prev.year));
      setError(null);
      setCreated(null);
    }
    setOpen(next);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await generateRoyaltiesAction({ month: Number(month), year: Number(year) });
      if (result.ok) setCreated(result.data.created);
      else setError(result.error);
    });
  }

  return (
    <>
      <Button onClick={() => handleOpenChange(true)}>Gerar royalties</Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerar royalties</DialogTitle>
            <DialogDescription>
              Calcula o royalty de cada unidade com percentual definido, a partir do faturamento do mês
              escolhido. Unidades que já têm royalty nesse mês são ignoradas.
            </DialogDescription>
          </DialogHeader>

          {created !== null ? (
            <>
              <p className="text-sm">
                {created === 0
                  ? "Nenhum royalty novo: todos desse mês já foram gerados ou não há faturamento registrado."
                  : `${created} ${created === 1 ? "royalty gerado" : "royalties gerados"} com sucesso.`}
              </p>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Fechar</Button>
              </DialogFooter>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="royalty-month">Mês</Label>
                  <select
                    id="royalty-month"
                    className={SELECT_CLASS}
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {MONTH_NAMES.map((name, i) => (
                      <option key={name} value={i + 1}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="royalty-year">Ano</Label>
                  <Input
                    id="royalty-year"
                    type="number"
                    min={2000}
                    max={2100}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Gerando..." : "Gerar"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}