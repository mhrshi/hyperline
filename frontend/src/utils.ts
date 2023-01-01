export const clsx = (...classes: (string | undefined | null)[]) =>
  classes.filter(Boolean).join(" ").trim() || undefined;
