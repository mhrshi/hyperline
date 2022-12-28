export const clsx = (...classes: string[]) => classes.filter(Boolean).join(" ").trim() || undefined;
