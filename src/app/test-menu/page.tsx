import type { Metadata } from 'next';
import {
  X,
  ArrowRight,
  Search,
  Briefcase,
  BookOpen,
  Building2,
  Handshake,
  LayoutGrid,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mobile menu concepts',
  robots: { index: false, follow: false },
};

const LINKS = ['Directory', 'Services', 'Jobs', 'Guides', 'Firms', 'Get matched'];
const TILES = [
  { label: 'Directory', icon: Search },
  { label: 'Services', icon: LayoutGrid },
  { label: 'Jobs', icon: Briefcase },
  { label: 'Guides', icon: BookOpen },
  { label: 'Firms', icon: Building2 },
  { label: 'Get matched', icon: Handshake },
];

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={[
          'flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-extrabold',
          dark ? 'bg-brand-500 text-navy-950' : 'bg-navy-900 text-white',
        ].join(' ')}
      >
        A
      </span>
      <span
        className={[
          'font-display text-base font-extrabold tracking-tight',
          dark ? 'text-white' : 'text-navy-900',
        ].join(' ')}
      >
        Accountants<span className="text-brand-500">.co.ke</span>
      </span>
    </span>
  );
}

function Close({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={[
        'flex h-9 w-9 items-center justify-center rounded-xl',
        dark ? 'bg-white/10 text-white' : 'bg-slate-100 text-navy-900',
      ].join(' ')}
    >
      <X className="h-5 w-5" />
    </span>
  );
}

function Phone({
  n,
  label,
  children,
}: {
  n: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-[340px]">
      <p className="mb-3 text-sm font-bold text-slate-700">
        {n}. {label}
      </p>
      <div className="overflow-hidden rounded-[2.2rem] border-[7px] border-slate-900 shadow-lift">
        <div className="h-[680px]">{children}</div>
      </div>
    </div>
  );
}

export default function MenuConcepts() {
  return (
    <div className="shell py-10">
      <h1 className="font-display text-3xl font-extrabold text-slate-900">
        Full-bleed mobile menu concepts
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Five full-screen menu directions. Pick a number and I’ll wire it into the
        hamburger.
      </p>

      <div className="mt-10 flex flex-wrap gap-10">
        {/* 1 — Charcoal full-screen */}
        <Phone n={1} label="Charcoal full-screen">
          <div className="flex h-full flex-col bg-navy-950 px-6 pb-6 pt-5 text-white">
            <div className="flex items-center justify-between">
              <Brand dark />
              <Close dark />
            </div>
            <nav className="mt-8 flex-1">
              {LINKS.map((l) => (
                <span
                  key={l}
                  className="flex items-center justify-between border-b border-white/10 py-4 font-display text-xl font-bold"
                >
                  {l}
                  <ArrowRight className="h-5 w-5 text-white/30" />
                </span>
              ))}
            </nav>
            <div className="space-y-2.5">
              <span className="block rounded-xl border border-white/15 py-3 text-center text-sm font-semibold text-white">
                Sign in
              </span>
              <span className="block rounded-xl bg-brand-500 py-3 text-center text-sm font-semibold text-navy-950">
                List your practice
              </span>
            </div>
          </div>
        </Phone>

        {/* 2 — Big type, light */}
        <Phone n={2} label="Oversized type (light)">
          <div className="flex h-full flex-col bg-white px-6 pb-6 pt-5">
            <div className="flex items-center justify-between">
              <Brand />
              <Close />
            </div>
            <nav className="mt-8 flex-1">
              {LINKS.map((l, i) => (
                <span
                  key={l}
                  className="flex items-baseline gap-3 py-2.5 font-display text-3xl font-extrabold tracking-tight text-navy-900"
                >
                  <span className="text-sm font-bold text-brand-600">
                    0{i + 1}
                  </span>
                  {l}
                </span>
              ))}
            </nav>
            <div className="flex gap-2.5">
              <span className="flex-1 rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-navy-900">
                Sign in
              </span>
              <span className="flex-1 rounded-xl bg-navy-900 py-3 text-center text-sm font-semibold text-white">
                List your practice
              </span>
            </div>
          </div>
        </Phone>

        {/* 3 — Action-first (toggle + search) */}
        <Phone n={3} label="Action-first (toggle + search)">
          <div className="flex h-full flex-col bg-white px-6 pb-6 pt-5">
            <div className="flex items-center justify-between">
              <Brand />
              <Close />
            </div>
            <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-sm font-semibold">
              <span className="rounded-full bg-white px-4 py-2 text-navy-900 shadow-soft">
                Need one
              </span>
              <span className="px-4 py-2 text-slate-500">I am one</span>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <Search className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">Search…</span>
            </div>
            <nav className="mt-5 flex-1">
              {LINKS.map((l) => (
                <span
                  key={l}
                  className="flex items-center justify-between rounded-lg px-1 py-3 text-base font-semibold text-navy-800"
                >
                  {l}
                  <ArrowRight className="h-4 w-4 text-slate-300" />
                </span>
              ))}
            </nav>
            <span className="block rounded-xl bg-brand-600 py-3 text-center text-sm font-semibold text-white">
              List your practice
            </span>
          </div>
        </Phone>

        {/* 4 — Bento grid */}
        <Phone n={4} label="Bento grid">
          <div className="flex h-full flex-col bg-slate-50 px-5 pb-5 pt-5">
            <div className="flex items-center justify-between">
              <Brand />
              <Close />
            </div>
            <div className="mt-6 grid flex-1 grid-cols-2 gap-3 content-start">
              {TILES.map((t) => (
                <span
                  key={t.label}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-white">
                    <t.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold text-navy-900">
                    {t.label}
                  </span>
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-2.5">
              <span className="block rounded-xl border border-slate-200 bg-white py-3 text-center text-sm font-semibold text-navy-900">
                Sign in
              </span>
              <span className="block rounded-xl bg-navy-900 py-3 text-center text-sm font-semibold text-white">
                List your practice
              </span>
            </div>
          </div>
        </Phone>

        {/* 5 — Gradient hero-style */}
        <Phone n={5} label="Gradient hero-style">
          <div className="relative flex h-full flex-col overflow-hidden bg-navy-950 px-6 pb-6 pt-5 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-brand-fade"
            />
            <div className="relative flex items-center justify-between">
              <Brand dark />
              <Close dark />
            </div>
            <nav className="relative mt-10 flex-1 space-y-1">
              {LINKS.map((l) => (
                <span
                  key={l}
                  className="block font-display text-2xl font-extrabold tracking-tight text-white/90"
                >
                  {l}
                </span>
              ))}
            </nav>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <span className="block rounded-xl bg-brand-500 py-3 text-center text-sm font-semibold text-navy-950">
                Get matched, free
              </span>
              <div className="mt-2.5 flex items-center justify-between text-sm">
                <span className="font-semibold text-white/80">Sign in</span>
                <span className="inline-flex items-center gap-1 font-semibold text-brand-300">
                  List your practice <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </Phone>
      </div>

      <p className="mt-10 text-sm text-slate-400">End of concepts — tell me a number.</p>
    </div>
  );
}
