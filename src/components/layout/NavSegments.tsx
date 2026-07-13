'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/directory', label: 'Directory' },
  { href: '/services', label: 'Services' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/guides', label: 'Guides' },
  { href: '/blog', label: 'Career Guides' },
];

export function NavSegments() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 md:flex">
      {ITEMS.map((it) => {
        const active =
          pathname === it.href || pathname.startsWith(`${it.href}/`);
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? 'page' : undefined}
            className={[
              'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
              active
                ? 'bg-white text-navy-900 shadow-soft'
                : 'text-slate-600 hover:text-navy-900',
            ].join(' ')}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
