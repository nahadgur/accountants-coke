'use client';

import { useMemo, useState } from 'react';
import { Search, ShieldCheck } from 'lucide-react';
import type { LicensedFirm } from '@/data/firms';

const PAGE = 60;

export function FirmsBrowser({ firms }: { firms: LicensedFirm[] }) {
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return firms;
    return firms.filter((f) => f.name.toLowerCase().includes(q));
  }, [firms, query]);

  const visible = filtered.slice(0, shown);

  return (
    <div>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShown(PAGE);
          }}
          placeholder="Search 1,067 licensed firms…"
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {filtered.length.toLocaleString()} firm
        {filtered.length === 1 ? '' : 's'}
        {query ? ` matching “${query}”` : ' on the ICPAK register'}.
      </p>

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-sm text-slate-500">
          No firms match that search.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((firm) => (
            <FirmCard key={firm.slug} firm={firm} />
          ))}
        </div>
      )}

      {shown < filtered.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShown((s) => s + PAGE)}
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 hover:border-slate-300 hover:bg-slate-50"
          >
            Show more firms
          </button>
        </div>
      )}
    </div>
  );
}

function FirmCard({ firm }: { firm: LicensedFirm }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 font-display text-base font-bold uppercase text-brand-700">
          {firm.name.replace(/[^a-zA-Z]/g, '').charAt(0) || 'A'}
        </span>
        <div className="min-w-0">
          <h2 className="font-semibold leading-snug text-navy-900">{firm.name}</h2>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            ICPAK licensed
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-400">Unclaimed listing</span>
        <button
          type="button"
          data-claim
          data-claim-firm={firm.name}
          data-claim-slug={firm.slug}
          className="rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-navy-800"
        >
          Claim this firm
        </button>
      </div>
    </div>
  );
}
