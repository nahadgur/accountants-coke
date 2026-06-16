import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional + conflicting Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a KES salary range into a compact human badge. */
export function formatSalary(
  min: number | null,
  max: number | null,
  currency = 'KES',
): string | null {
  const fmt = (n: number) =>
    n >= 1000 ? `${currency} ${Math.round(n / 1000)}k` : `${currency} ${n}`;
  if (min && max) return `${fmt(min)}–${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return null;
}

/** Slugify a string for SEO-friendly URLs. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Relative "x days ago" for listing freshness. */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
}

const MINOR_WORDS = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'of', 'in', 'on', 'to',
  'with', 'near', 'by', 'at', 'vs', 'as', 'from',
]);

/** Title-case a heading, preserving acronyms/brands that already carry an
 *  uppercase letter (eTIMS, VAT, MRI, KRA, CPA-K, ACCA, Kenya, …). */
export function titleCase(input: string): string {
  const words = input.split(' ');
  const last = words.length - 1;
  return words
    .map((w, i) => {
      if (!w) return w;
      if (/[A-Z]/.test(w)) return w; // keep acronyms / proper nouns as-is
      const lower = w.toLowerCase();
      if (i !== 0 && i !== last && MINOR_WORDS.has(lower)) return lower;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}
