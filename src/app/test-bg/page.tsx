import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Section background tests',
  robots: { index: false, follow: false },
};

/* ---------- geometry helpers (deterministic, server-rendered) ---------- */

// Option 1 — flowing line ribbon. Blend many fine lines between two waves of the
// same frequency but phase-shifted. The shared frequency makes the midline flow
// as an S, while the phase offset opens wide fans that pinch to soft waists where
// the lines cross — the natural woven ribbon from the reference.
function ribbonPaths(n = 46, w = 1200, step = 8) {
  const C = 200;
  const A = 128;
  const f = 1 / 175;
  const phi = 2.2;
  const a = (x: number) => C + A * Math.sin(x * f) + 12 * Math.sin(x / 70);
  const b = (x: number) => C + A * Math.sin(x * f + phi) + 12 * Math.sin(x / 70 + 1);
  const lines: string[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    let d = '';
    for (let x = 0; x <= w; x += step) {
      const y = a(x) * (1 - t) + b(x) * t;
      d += (x === 0 ? `M${x} ` : `L${x} `) + y.toFixed(1) + ' ';
    }
    lines.push(d.trim());
  }
  return lines;
}

// Option 3 — concentric rounded hairpins (nested U-turns opening downward)
function hairpin(cx: number, count: number, gap: number, r0: number, turnY: number, bottom: number) {
  const lines: string[] = [];
  for (let i = 0; i < count; i++) {
    const r = r0 + i * gap;
    lines.push(
      `M${cx - r} ${bottom} V${turnY} A${r} ${r} 0 0 1 ${cx + r} ${turnY} V${bottom}`,
    );
  }
  return lines;
}

/* ---------- sample content wrapper ---------- */

function SampleCards({ dark }: { dark?: boolean }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {['Jane Wanjiru', 'David Otieno', 'Grace Achieng'].map((name) => (
        <div
          key={name}
          className={[
            'rounded-xl border p-5 shadow-soft',
            dark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white',
          ].join(' ')}
        >
          <p className={['font-display text-base font-bold', dark ? 'text-white' : 'text-navy-900'].join(' ')}>
            {name}
          </p>
          <p className={['mt-1 text-sm', dark ? 'text-slate-300' : 'text-slate-500'].join(' ')}>
            CPA-K · Nairobi
          </p>
        </div>
      ))}
    </div>
  );
}

function BgSection({
  n,
  name,
  note,
  dark,
  svg,
}: {
  n: number;
  name: string;
  note: string;
  dark?: boolean;
  svg: React.ReactNode;
}) {
  return (
    <section className={['relative overflow-hidden', dark ? 'bg-navy-950' : 'bg-white'].join(' ')}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {svg}
      </div>
      <div className="shell relative py-20">
        <span
          className={[
            'inline-block rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide',
            dark ? 'bg-white/10 text-brand-300' : 'bg-brand-50 text-brand-700',
          ].join(' ')}
        >
          Option {n} · {name}
        </span>
        <h2 className={['mt-4 font-display text-2xl font-extrabold tracking-tight', dark ? 'text-white' : 'text-navy-900'].join(' ')}>
          A better way to find financial talent
        </h2>
        <p className={dark ? 'mt-1 text-slate-300' : 'mt-1 text-slate-600'}>{note}</p>
        <SampleCards dark={dark} />
      </div>
    </section>
  );
}

export default function TestBgPage() {
  const ribbon = ribbonPaths();
  const hairpinsA = hairpin(150, 6, 26, 28, 150, 460);
  const hairpinsB = hairpin(430, 6, 26, 28, 200, 460);

  return (
    <div>
      <div className="shell py-10">
        <h1 className="font-display text-3xl font-extrabold text-slate-900">
          Section background options
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Three directions matching your references, in the brand teal. Each sits
          behind real section content so you can judge it. Tell me the number
          (and light, dark, or both).
        </p>
      </div>

      {/* 1 — Flowing line ribbon */}
      <BgSection
        n={1}
        name="Flowing line ribbon"
        note="Many fine lines blended into a flowing wave, with a teal gradient."
        svg={
          <svg
            className="h-full w-full [mask-image:radial-gradient(140%_120%_at_75%_30%,black,transparent_85%)]"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="rib" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#0d7f78" />
                <stop offset="0.5" stopColor="#16b1a4" />
                <stop offset="1" stopColor="#5fded0" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#rib)" strokeWidth="0.8" strokeOpacity="0.5">
              {ribbon.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </svg>
        }
      />

      {/* 2 — Dash & dot field */}
      <BgSection
        n={2}
        name="Dash & dot field"
        note="A soft field of teal dashes and dots, flowing on a diagonal."
        svg={
          <svg
            className="h-full w-full text-brand-600/35 [mask-image:radial-gradient(120%_120%_at_70%_10%,black,transparent_80%)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dd"
                width="46"
                height="46"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(-22)"
              >
                <line x1="8" y1="6" x2="8" y2="22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="30" cy="12" r="2.4" fill="#38c3b6" />
                <line x1="26" y1="26" x2="26" y2="40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="8" cy="36" r="2.4" fill="currentColor" />
                <circle cx="42" cy="34" r="2.4" fill="#38c3b6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dd)" />
          </svg>
        }
      />

      {/* 3 — Rounded hairpins + diagonals */}
      <BgSection
        n={3}
        name="Rounded hairpins + diagonals"
        note="Concentric rounded line turns with a field of fine diagonal lines."
        svg={
          <svg
            className="h-full w-full [mask-image:radial-gradient(130%_130%_at_70%_20%,black,transparent_85%)]"
            viewBox="0 0 1200 460"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="hp" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#0d7f78" />
                <stop offset="1" stopColor="#38c3b6" />
              </linearGradient>
              <pattern id="diag3" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="14" stroke="#16b1a4" strokeWidth="1" />
              </pattern>
              <linearGradient id="dfade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.5" />
              </linearGradient>
              <mask id="dmask">
                <rect x="620" y="0" width="580" height="460" fill="url(#dfade)" />
              </mask>
            </defs>
            {/* diagonal line field on the right */}
            <rect x="620" y="0" width="580" height="460" fill="url(#diag3)" mask="url(#dmask)" opacity="0.6" />
            {/* concentric rounded hairpins on the left */}
            <g fill="none" stroke="url(#hp)" strokeWidth="2.5" strokeOpacity="0.6">
              {hairpinsA.map((d, i) => (
                <path key={`a${i}`} d={d} />
              ))}
              {hairpinsB.map((d, i) => (
                <path key={`b${i}`} d={d} />
              ))}
            </g>
          </svg>
        }
      />
    </div>
  );
}
