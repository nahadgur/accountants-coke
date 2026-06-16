import {
  Percent,
  Clock,
  FileText,
  ShieldCheck,
  Calculator,
  Receipt,
  BookOpen,
  BadgeCheck,
  Banknote,
  Building2,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  percent: Percent,
  clock: Clock,
  file: FileText,
  shield: ShieldCheck,
  calculator: Calculator,
  receipt: Receipt,
  book: BookOpen,
  badge: BadgeCheck,
  banknote: Banknote,
  building: Building2,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = MAP[name] ?? FileText;
  return <C className={className ?? 'h-5 w-5'} />;
}
