export const clsx = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(" ").trim() || undefined;
