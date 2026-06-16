'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

type Mode = 'hire' | 'work';

export function HeroToggle() {
  const [mode, setMode] = useState<Mode>('hire');

  return (
    <div className="w-full max-w-xl">
      {/* Segmented control */}
      <div className="inline-flex rounded-full border border-white/25 bg-white/10 p-1 backdrop-blur">
        <button
          type="button"
          onClick={() => setMode('hire')}
          aria-pressed={mode === 'hire'}
          className={[
            'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
            mode === 'hire'
              ? 'bg-white text-navy-900'
              : 'text-white/90 hover:text-white',
          ].join(' ')}
        >
          I need an accountant
        </button>
        <button
          type="button"
          onClick={() => setMode('work')}
          aria-pressed={mode === 'work'}
          className={[
            'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
            mode === 'work'
              ? 'bg-white text-navy-900'
              : 'text-white/90 hover:text-white',
          ].join(' ')}
        >
          I am an accountant
        </button>
      </div>

      {mode === 'hire' ? (
        <div className="mt-6">
          {/* Desktop: search field + button */}
          <form
            action="/directory"
            method="get"
            className="hidden w-full flex-col gap-2 rounded-xl border border-white/15 bg-white/95 p-2 shadow-panel backdrop-blur sm:flex sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                name="q"
                type="text"
                placeholder="Search by name, firm or service"
                className="h-11 w-full min-w-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Find an accountant
            </button>
          </form>
          {/* Mobile: CTA only, no text field */}
          <Link
            href="/directory"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-600 text-base font-semibold text-white transition-all hover:bg-brand-700 sm:hidden"
          >
            Find an accountant
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-sm text-white/80">
            Browse verified CPA-K, ACCA and CIFA professionals across Kenya.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          {/* Was "List your practice" -> /login. Repointed to the public claim
              flow while auth/dashboard is hidden. */}
          <Link
            href="/directory"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-600 px-7 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Claim your firm
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-sm text-white/80">
            Find your firm on the ICPAK register and claim your listing to
            receive matched client leads.
          </p>
        </div>
      )}
    </div>
  );
}
