"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type ParamUpdates = Record<string, string | null>;

interface UpdateParamsOptions {
  resetPage?: boolean;
  scroll?: boolean;
}

export function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: ParamUpdates, options?: UpdateParamsOptions) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      if (options?.resetPage) {
        params.delete("page");
      }

      router.push(`${pathname}?${params.toString()}`, {
        scroll: options?.scroll ?? false,
      });
    },
    [router, pathname, searchParams]
  );

  return { updateParams, searchParams };
}