"use client";

import { ErrorState } from "@/shared/ui/ErrorState";

export default function Error(props: React.ComponentProps<typeof ErrorState>) {
  return <ErrorState {...props} />;
}