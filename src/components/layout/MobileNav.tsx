'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV = [
  { href: '/directory', label: 'Directory' },
  { href: '/services', label: 'Services' },
  { href: '/jobs', label: 'Jobs' },
  // /guides + /blog content sections hidden for now (see HIDDEN-FOR-LAUNCH.md).
  { href: '/match', label: 'Get matched' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => setMounted(true), []);

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const overlay = (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white px-6 pb-8 pt-4">
      <div className="flex items-center justify-between">
        <Link href="/" onClick={close} className="flex items-center gap-2">
          <Image
            src="/logo-mark.png"
            alt="Accountants.co.ke"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-display text-lg font-extrabold tracking-tight text-navy-900">
            Accountants<span className="text-brand-600">.co.ke</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={close}
          aria-label="Close menu"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-navy-900 transition-colors hover:bg-slate-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-10 flex-1 animate-fade-up">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              aria-current={active ? 'page' : undefined}
              className={[
                'group flex items-center justify-between border-b border-slate-100 py-3.5 font-display text-[2rem] font-extrabold tracking-tight transition-colors',
                active ? 'text-brand-600' : 'text-navy-900',
              ].join(' ')}
            >
              {item.label}
              <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
            </Link>
          );
        })}
      </nav>

      <div className="flex gap-3">
        {/* Sign in hidden for now — restore when auth is live.
        <Link
          href="/login"
          onClick={close}
          className="flex-1 rounded-xl border border-slate-200 py-3.5 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50"
        >
          Sign in
        </Link>
        */}
        {/* Was "List your practice" -> /login. Repointed to the public claim
            flow while auth/dashboard is hidden. */}
        <Link
          href="/directory"
          onClick={close}
          className="flex-1 rounded-xl bg-navy-900 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          Claim your firm
        </Link>
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-2xl rounded-tr-md bg-navy-900 text-white shadow-soft transition-transform active:scale-95"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && mounted && createPortal(overlay, document.body)}
    </div>
  );
}
