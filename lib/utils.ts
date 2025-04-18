import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to "YYYY" or "Month YYYY" format
export function formatDate(dateString?: string) {
  if (!dateString) return "Unknown"

  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return "Unknown"
  }

  const year = date.getFullYear()
  const month = date.toLocaleString("default", { month: "short" })

  return `${month} ${year}`
}
