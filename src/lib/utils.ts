import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price in VES (Bolívares) or USD
 */
export function formatPrice(
  price: number,
  currency: "VES" | "USD" = "USD"
): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string, format: "short" | "long" | "full" = "long"): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Caracas",
  };

  switch (format) {
    case "short":
      options.day = "numeric";
      options.month = "short";
      break;
    case "long":
      options.day = "numeric";
      options.month = "long";
      options.year = "numeric";
      break;
    case "full":
      options.day = "numeric";
      options.month = "long";
      options.year = "numeric";
      options.hour = "2-digit";
      options.minute = "2-digit";
      break;
  }

  return new Intl.DateTimeFormat("es-ES", options).format(d);
}

/**
 * Format a time slot for display
 */
export function formatTimeSlot(slot: string): string {
  const map: Record<string, string> = {
    morning: "08:00 - 12:00",
    midday: "12:00 - 14:00",
    afternoon: "14:00 - 18:00",
    evening: "18:00 - 20:00",
  };
  return map[slot] || slot;
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Truncate text to a max length
 */
export function truncate(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate a random ID for client-side use
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Parse an error response
 */
export function parseError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Ha ocurrido un error inesperado";
}

/**
 * Delay execution (for loading simulations)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
