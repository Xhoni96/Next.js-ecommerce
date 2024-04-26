import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const IntlDateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  // timeStyle: "short",
});

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
