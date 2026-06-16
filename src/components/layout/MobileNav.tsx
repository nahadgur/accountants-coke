'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV = [
  { href: '/directory', label: 'Directory' },
  { href: '/services', label: 'Services' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/guides', label: 'Guides' },
  { href: '/firms', label: 'Firms' },
  { href: '/match', label: 'Get matched' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      {/* Teardrop / bento hamburger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-2xl rounded-tr-md bg-navy-900 text-white shadow-soft transition-transform active:scale-95"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-navy-950/30 backdrop-blur-[2px]"
            onClick={close}
          />
          <div className="fixed inset-x-3 top-[4.25rem] z-50">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-lift">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-slate-300" />
                </Link>
              ))}

              <div className="my-2 h-px bg-slate-100" />

              <Link
                href="/login"
                onClick={close}
                className="block rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Sign in
              </Link>
              <Link
                href="/login"
                onClick={close}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-navy-900 px-3.5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                List your practice
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
