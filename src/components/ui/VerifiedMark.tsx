import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Consistent "verified" mark: solid emerald disc with a white tick. */
export function VerifiedMark({ className }: { className?: string }) {
  return (
    <span
      aria-label="Verified"
      className={cn(
        'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500',
        className,
      )}
    >
      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
    </span>
  );
}
