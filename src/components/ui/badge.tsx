import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        neutral: 'bg-slate-100 text-slate-600',
        premium: 'bg-gold-500 text-navy-900',
        verified: 'bg-brand-50 text-brand-700 ring-1 ring-brand-600/20',
        salary: 'bg-brand-50 text-brand-700',
        featured: 'bg-gold-100 text-gold-700 ring-1 ring-gold-500/30',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
