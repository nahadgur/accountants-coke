import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Palette tests',
  robots: { index: false, follow: false },
};

type Palette = {
  id: string;
  name: string;
  rationale: string;
  recommended?: boolean;
  dark: string; // hero / footer surface
  contentBg: string; // light working background
  ink: string; // headings on light
  muted: string; // body text on light
  border: string; // hairlines on light
  primary: string; // CTA
  primaryText: string;
  accent: string; // verified / links
  premium: string; // premium badge
  premiumText: string;
};

const PALETTES: Palette[] = [
  {
    id: 'A',
    name: 'Navy Authority',
    rationale:
      'Safest, best-evidenced finance-trust palette. Blue-on-white the way the big institutions do it, with one reserved accent for CTAs.',
    dark: '#102A4C',
    contentBg: '#F7F8FA',
    ink: '#0B1F3A',
    muted: '#5A6B82',
    border: '#E2E6EC',
    primary: '#0FA3A3',
    primaryText: '#FFFFFF',
    accent: '#0FA3A3',
    premium: '#E0A226',
    premiumText: '#0B1F3A',
  },
  {
    id: 'B',
    name: 'Slate Premium',
    rationale:
      'Most differentiated. Charcoal brand surfaces + warm off-white content + sparing gold reads “members’ club”, not another SaaS. Breaks from the blue/purple fintech crowd and the M-Pesa-green commodity look.',
    recommended: true,
    dark: '#14181F',
    contentBg: '#F5F4F0',
    ink: '#16181D',
    muted: '#5B6270',
    border: '#E4E2DC',
    primary: '#11A39A',
    primaryText: '#FFFFFF',
    accent: '#11A39A',
    premium: '#C9A24B',
    premiumText: '#1B1B16',
  },
  {
    id: 'C',
    name: 'Forest Growth',
    rationale:
      'Money/growth angle, but dark forest for authority (not bright eco-green). Cream ground + brass reads premium-editorial; one bright emerald reserved for CTAs.',
    dark: '#123B2E',
    contentBg: '#F4F1E9',
    ink: '#1A1C1A',
    muted: '#4B5246',
    border: '#E5E0D4',
    primary: '#2FBF71',
    primaryText: '#06281A',
    accent: '#1B5E45',
    premium: '#B08D2E',
    premiumText: '#F4F1E9',
  },
];

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-7 w-7 rounded-md ring-1 ring-black/10"
        style={{ backgroundColor: color }}
      />
      <span className="font-mono text-[11px] text-slate-500">{label}</span>
    </div>
  );
}

function Verified({ color }: { color: string }) {
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
      style={{ backgroundColor: color }}
      aria-label="Verified"
    >
      ✓
    </span>
  );
}

function PaletteBlock({ p }: { p: Palette }) {
  return (
    <section
      className="overflow-hidden rounded-2xl border bg-white shadow-soft"
      style={{ borderColor: p.recommended ? p.primary : '#E2E8F0' }}
    >
      {/* header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-extrabold text-slate-900">
              {p.id}. {p.name}
            </h2>
            {p.recommended && (
              <span
                className="rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: p.primary }}
              >
                Recommended
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-slate-500">{p.rationale}</p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-2.5 sm:grid-cols-3">
          <Swatch color={p.dark} label={p.dark} />
          <Swatch color={p.contentBg} label={p.contentBg} />
          <Swatch color={p.primary} label={p.primary} />
          <Swatch color={p.accent} label={p.accent} />
          <Swatch color={p.premium} label={p.premium} />
          <Swatch color={p.ink} label={p.ink} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* dark / hero sample */}
        <div
          className="flex flex-col justify-center gap-5 p-8"
          style={{ backgroundColor: p.dark }}
        >
          <div>
            <h3 className="font-display text-2xl font-extrabold leading-tight text-white">
              Kenya’s verified accountants,{' '}
              <span style={{ color: p.primary }}>matched to you</span>
            </h3>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              Search CPA-K, ACCA and CIFA professionals and connect directly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              className="rounded-lg px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: p.primary, color: p.primaryText }}
            >
              Find an accountant
            </button>
            <button className="rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white">
              List your practice
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Tax Audit', 'Bookkeeping', 'Payroll'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white/85"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* light / content sample */}
        <div className="p-8" style={{ backgroundColor: p.contentBg }}>
          <div
            className="rounded-xl border bg-white p-5 shadow-soft"
            style={{ borderColor: p.border }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                  style={{ backgroundColor: p.dark }}
                >
                  J
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="font-display text-base font-bold"
                      style={{ color: p.ink }}
                    >
                      Jane Wanjiru
                    </span>
                    <Verified color={p.accent} />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold" style={{ color: p.accent }}>
                      CPA-K
                    </span>{' '}
                    <span style={{ color: p.muted }}>Westlands, Nairobi</span>
                  </div>
                </div>
              </div>
              <span
                className="rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide"
                style={{ backgroundColor: p.premium, color: p.premiumText }}
              >
                Premium
              </span>
            </div>
            <p className="mt-3 text-sm" style={{ color: p.muted }}>
              Tax and assurance lead with 11 years across multinationals and
              Kenyan SMEs.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Tax Audit', 'Statutory Audit'].map((t) => (
                <span
                  key={t}
                  className="rounded-md border px-2.5 py-1 text-xs font-medium"
                  style={{
                    borderColor: p.border,
                    color: p.muted,
                    backgroundColor: '#fff',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* buttons + badges row */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              className="rounded-lg px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: p.primary, color: p.primaryText }}
            >
              Primary action
            </button>
            <button
              className="rounded-lg border bg-white px-5 py-2.5 text-sm font-semibold"
              style={{ borderColor: p.ink, color: p.ink }}
            >
              Outline
            </button>
            <span
              className="rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: p.ink }}
            >
              Featured
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TestPalettesPage() {
  return (
    <div className="shell py-12">
      <h1 className="font-display text-3xl font-extrabold text-slate-900">
        Colour direction options
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Three research-backed directions, each shown on real components: a dark
        hero on the left, a light directory card with buttons and badges on the
        right. Buttons use the colour, not black. Gold is used sparingly for
        Premium only. Tell me which letter you want (mixing is fine).
      </p>

      <div className="mt-10 space-y-8">
        {PALETTES.map((p) => (
          <PaletteBlock key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
