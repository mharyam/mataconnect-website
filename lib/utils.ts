export function truncate(sentence: string, length: number): string {
  if (!sentence) return "";
  const trimmed = sentence.trim();
  if (trimmed.length <= length) return trimmed;
  return trimmed.slice(0, length) + " ...";
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
