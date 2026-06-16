import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import type { Firm } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Accounting Firms in Kenya',
  description:
    'Directory of accounting and audit firms across Kenya — Nairobi, Mombasa, Kisumu and beyond. Premium firms listed first.',
};

export const revalidate = 300;

export default async function FirmsPage() {
  let firms: Firm[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('firms')
      .select('*')
      .eq('is_published', true)
      .order('premium_status', { ascending: false })
      .order('name', { ascending: true });
    firms = (data as Firm[]) ?? [];
  } catch {
    firms = [];
  }

  return (
    <div className="shell py-12">
      <h1 className="text-2xl font-bold tracking-tight text-navy-900">
        Accounting Firms
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        {firms.length} firm{firms.length === 1 ? '' : 's'} across Kenya.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {firms.map((firm) => (
          <Link
            key={firm.id}
            href={`/firms/${firm.slug ?? firm.id}`}
            className={`block rounded-xl border bg-white p-5 transition-all ${
              firm.premium_status
                ? 'border-gold-500/40 ring-1 ring-gold-500/20 hover:shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {firm.logo_url ? (
                  <Image src={firm.logo_url} alt={firm.name} fill sizes="44px" className="object-contain p-1" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-semibold text-slate-400">
                    {firm.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-navy-900">{firm.name}</h2>
                <p className="text-sm text-slate-500">
                  {[firm.town, firm.location].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
            {firm.premium_status && (
              <Badge variant="premium" className="mt-3">
                Premium firm
              </Badge>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
