import type { Metadata } from 'next';
import { Search, Menu, ChevronDown, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Navbar concepts',
  robots: { index: false, follow: false },
};

const LINKS = ['Directory', 'Firms', 'Jobs', 'Get matched'];

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
          'font-display text-lg font-extrabold tracking-tight',
          dark ? 'text-white' : 'text-navy-900',
        ].join(' ')}
      >
        Accountants<span className="text-brand-500">.co.ke</span>
      </span>
    </span>
  );
}

function Teardrop({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={[
        'flex h-10 w-10 items-center justify-center rounded-2xl rounded-tr-md',
        dark ? 'bg-brand-500 text-navy-950' : 'bg-navy-900 text-white',
      ].join(' ')}
    >
      <Menu className="h-5 w-5" />
    </span>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[380px] overflow-hidden rounded-[2rem] border-[6px] border-slate-900 bg-white shadow-lift">
      <div className="h-[120px]">{children}</div>
    </div>
  );
}

function Section({
  n,
  name,
  desc,
  desktop,
  mobile,
  pad = true,
}: {
  n: number;
  name: string;
  desc: string;
  desktop: React.ReactNode;
  mobile: React.ReactNode;
  pad?: boolean;
}) {
  return (
    <section className="border-b border-slate-200 py-12">
      <div className="shell">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 font-display text-sm font-extrabold text-navy-950">
            {n}
          </span>
          <div>
            <p className="font-display text-lg font-bold text-navy-900">{name}</p>
            <p className="text-sm text-slate-500">{desc}</p>
          </div>
        </div>
      </div>
      {/* desktop preview on a soft canvas so floating/dark bars read */}
      <div className="bg-slate-100/70 py-6">
        <div className={pad ? 'shell' : ''}>{desktop}</div>
      </div>
      {/* mobile preview */}
      <div className="shell mt-6">
        <Phone>{mobile}</Phone>
      </div>
    </section>
  );
}

export default function NavConcepts() {
  return (
    <div>
      <div className="shell py-10">
        <h1 className="font-display text-3xl font-extrabold text-slate-900">
          Navbar concepts
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Five directions for the nav, each shown desktop and mobile. Pick a
          number (mixing is fine, e.g. “3 desktop, 1 mobile”).
        </p>
      </div>

      {/* ============ 1 — Floating pill ============ */}
      <Section
        n={1}
        name="Floating pill"
        desc="A detached, rounded capsule that floats with blur and a soft shadow. Modern, premium, very Linear/Vercel."
        desktop={
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-slate-200 bg-white/85 py-2 pl-4 pr-2 shadow-lift backdrop-blur">
            <Brand />
            <nav className="hidden items-center gap-1 md:flex">
              {LINKS.map((l) => (
                <span key={l} className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-navy-900">
                  {l}
                </span>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <span className="hidden px-3 text-sm font-semibold text-slate-700 sm:block">Sign in</span>
              <span className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-soft">List your practice</span>
            </div>
          </div>
        }
        mobile={
          <div className="m-3 flex items-center justify-between rounded-full border border-slate-200 bg-white/90 py-1.5 pl-3 pr-1.5 shadow-lift backdrop-blur">
            <Brand />
            <Teardrop />
          </div>
        }
      />

      {/* ============ 2 — Segmented centre ============ */}
      <Section
        n={2}
        name="Segmented centre"
        desc="Classic top bar, but the links live in a segmented control with the active page highlighted. Crisp and product-like."
        desktop={
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-soft">
            <Brand />
            <nav className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 md:flex">
              {LINKS.map((l, i) => (
                <span
                  key={l}
                  className={[
                    'rounded-full px-4 py-1.5 text-sm font-semibold',
                    i === 0 ? 'bg-white text-navy-900 shadow-soft' : 'text-slate-600 hover:text-navy-900',
                  ].join(' ')}
                >
                  {l}
                </span>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <span className="hidden px-3 text-sm font-semibold text-slate-700 sm:block">Sign in</span>
              <span className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white">List your practice</span>
            </div>
          </div>
        }
        mobile={
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
            <Brand />
            <Teardrop />
          </div>
        }
      />

      {/* ============ 3 — Dark glass ============ */}
      <Section
        n={3}
        name="Dark glass"
        desc="Charcoal, translucent, blurred. Bold contrast against the white page; teal CTA pops. The most distinctive."
        pad={false}
        desktop={
          <div className="flex items-center justify-between bg-navy-950/95 px-8 py-3.5 backdrop-blur">
            <Brand dark />
            <nav className="hidden items-center gap-1 md:flex">
              {LINKS.map((l) => (
                <span key={l} className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white">
                  {l}
                </span>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-semibold text-white/90 sm:block">Sign in</span>
              <span className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-navy-950">List your practice</span>
            </div>
          </div>
        }
        mobile={
          <div className="flex items-center justify-between bg-navy-950 px-4 py-3">
            <Brand dark />
            <Teardrop dark />
          </div>
        }
      />

      {/* ============ 4 — Search-forward ============ */}
      <Section
        n={4}
        name="Search-forward"
        desc="Puts a real search in the nav, marketplace-first. Fewer links, more action. Great for a directory."
        desktop={
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-soft">
            <Brand />
            <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-1.5">
              <Search className="h-4 w-4 text-slate-400" />
              <span className="flex-1 text-sm text-slate-400">Search accountants, firms or services</span>
              <span className="rounded-full bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white">Search</span>
            </div>
            <span className="hidden text-sm font-semibold text-slate-700 lg:block">Sign in</span>
            <span className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white">List your practice</span>
          </div>
        }
        mobile={
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-3">
            <Brand />
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500">
                <Search className="h-5 w-5" />
              </span>
              <Teardrop />
            </div>
          </div>
        }
      />

      {/* ============ 5 — Mega menu ============ */}
      <Section
        n={5}
        name="Services mega menu"
        desc="A Services dropdown that opens a panel of your service pages. Surfaces SEO pages and feels rich. (Shown open.)"
        desktop={
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between rounded-t-2xl border border-slate-200 bg-white px-5 py-3 shadow-soft">
              <Brand />
              <nav className="hidden items-center gap-1 md:flex">
                <span className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600">Directory</span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3.5 py-2 text-sm font-semibold text-navy-900">
                  Services <ChevronDown className="h-4 w-4" />
                </span>
                <span className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600">Jobs</span>
                <span className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600">Guides</span>
              </nav>
              <span className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white">List your practice</span>
            </div>
            {/* open mega panel */}
            <div className="rounded-b-2xl border border-t-0 border-slate-200 bg-white p-5 shadow-lift">
              <div className="grid grid-cols-3 gap-2">
                {['Rental income tax', 'eTIMS compliance', 'KRA tax returns', 'VAT', 'Bookkeeping', 'Audit & assurance'].map((s) => (
                  <span key={s} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-navy-800 hover:border-slate-300 hover:bg-slate-50">
                    {s}
                    <ArrowRight className="h-4 w-4 text-brand-600" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
        mobile={
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
            <Brand />
            <Teardrop />
          </div>
        }
      />

      <div className="shell py-10 text-center text-sm text-slate-400">
        End of concepts — tell me a number.
      </div>
    </div>
  );
}
