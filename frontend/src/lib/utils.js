import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const API = "http://3.234.250.114/api";

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
