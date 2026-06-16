import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({
  className,
  premium,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { premium?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-white shadow-soft',
        premium
          ? 'border-gold-500/40 ring-1 ring-gold-500/20'
          : 'border-slate-200',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-2', className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold text-navy-900', className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-2', className)} {...props} />;
}
