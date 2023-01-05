import type { Locus } from "@backend-shared-types/game";

export const clsx = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(" ").trim() || undefined;

export const locusToSet = (locus: Locus[]) => new Set(locus.map((l) => `${l[0]}${l[1]}`));
