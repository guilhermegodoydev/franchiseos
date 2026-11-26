"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function ErrorState({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <AlertTriangle className="h-10 w-10 text-destructive" />
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Algo deu errado</h2>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar os dados desta página.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">Código: {error.digest}</p>
        )}
      </div>
      <Button onClick={() => reset()}>Tentar novamente</Button>
    </div>
  );
}