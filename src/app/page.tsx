import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  ArrowRight,
  Building2,
  Handshake,
  Zap,
  FileSearch,
  Receipt,
  Fingerprint,
  BookOpen,
  TrendingUp,
  Banknote,
  ClipboardCheck,
  Lightbulb,
  Stamp,
  type LucideIcon,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { queryDirectory } from '@/lib/directory';
import { ProfileCard } from '@/components/directory/ProfileCard';
import { VerifiedMark } from '@/components/ui/VerifiedMark';
import { HeroToggle } from '@/components/home/HeroToggle';
import { Button } from '@/components/ui/button';
import { SPECIALIZATIONS, type JobWithFirm } from '@/lib/types';
import { formatSalary } from '@/lib/utils';

export const revalidate = 300;

const SPEC_ICONS: Record<string, LucideIcon> = {
  'Tax Audit': Receipt,
  'Forensic Accounting': Fingerprint,
  Bookkeeping: BookOpen,
  'Corporate Finance': TrendingUp,
  Payroll: Banknote,
  'Statutory Audit': ClipboardCheck,
  'Management Consulting': Lightbulb,
  'Company Secretarial': Stamp,
};

async function getFeatured() {
  const { profiles } = await queryDirectory({
    q: null,
    location: null,
    town: null,
    specialization: null,
    certification: null,
    page: 1,
  });
  return profiles.slice(0, 3);
}

async function getLatestJobs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('job_postings')
    .select('*, firm:firms(id,name,logo_url,website,location)')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(4);
  return (data as JobWithFirm[]) ?? [];
}

export default async function HomePage() {
  const [featured, jobs] = await Promise.all([getFeatured(), getLatestJobs()]);

  return (
    <>
      {/* ---------- Hero (full-bleed on mobile, contained on desktop) ---------- */}
      <section className="pb-0 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-navy-950 sm:mx-auto sm:max-w-7xl sm:rounded-3xl">
          {/* Background video */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Softer left gradient so the video reads through */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-navy-950/75 via-navy-950/35 to-transparent"
          />
          {/* Fine film grain, concentrated on the dark side */}
          <div
            aria-hidden
            className="grain absolute inset-0 opacity-[0.15] mix-blend-soft-light [mask-image:linear-gradient(to_right,black,black_35%,transparent_68%)]"
          />

          <div className="relative flex min-h-[calc(100svh-8rem)] flex-col justify-center px-6 py-12 sm:min-h-[540px] sm:px-10 sm:py-16 lg:min-h-[600px] lg:px-14">
            <div className="max-w-2xl animate-fade-up">
              <h1 className="display text-[2rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white [text-shadow:0_2px_30px_rgba(8,11,16,0.55)] sm:text-[3.5rem] sm:leading-[1.0] sm:tracking-[-0.035em] lg:text-[4.5rem]">
                Kenya’s Verified Accountants,
                <br className="hidden sm:block" /> Matched to Your Business
              </h1>
              <p className="mt-3 max-w-lg text-[15px] font-medium leading-snug text-white [text-shadow:0_1px_18px_rgba(8,11,16,0.6)] sm:mt-4 sm:text-xl">
                Search CPA-K, ACCA and CIFA professionals and firms, compare
                credentials, and connect directly. No middlemen, no inflated
                commissions.
              </p>

              <div className="mt-5 sm:mt-7">
                <HeroToggle />
              </div>

              <div className="hidden flex-wrap gap-2 sm:mt-7 sm:flex">
                {SPECIALIZATIONS.slice(0, 4).map((s) => (
                  <Link
                    key={s}
                    href={`/directory?specialization=${encodeURIComponent(s)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/15"
                  >
                    {s}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Directory showcase ---------- */}
      <section className="shell py-8 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <h2 className="display text-3xl text-navy-900 sm:text-[2.1rem]">
              A Directory Built for Trust
            </h2>
            <p className="mt-3 text-slate-600">
              Every professional and firm is checked against their certification
              before they appear. Contact details stay private until a member is
              an active, verified premium subscriber.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Filter by city, specialization and designation',
                'See verified CPA-K, ACCA and CIFA credentials at a glance',
                'Reach premium members directly, or get matched privately',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate-700">
                  <VerifiedMark className="mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/directory" className="mt-7 inline-block">
              <Button variant="outline" size="md">
                Browse the directory
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="min-w-0 lg:pl-6">
            <HeroPanel />
          </div>
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className="border-y border-slate-200/70">
        <div className="shell flex flex-col items-center justify-between gap-5 py-7 sm:flex-row">
          <p className="text-sm font-medium text-slate-500">
            Verified against recognised professional bodies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {['CPA-K', 'ACCA', 'CIFA', 'ICPAK'].map((c) => (
              <span
                key={c}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-display text-sm font-bold text-navy-800"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Value props ---------- */}
      <section className="shell py-8 sm:py-20">
        <SectionHead
          title="A Better Way to Find Financial Talent"
          subtitle="Built for businesses that want the right professional fast, and for accountants who want to be found."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Verified Credentials"
            body="Every professional and firm is checked against their certification before listing."
          />
          <Feature
            icon={<FileSearch className="h-5 w-5" />}
            title="Compare in Seconds"
            body="Filter by city, specialization and designation to shortlist the right fit."
          />
          <Feature
            icon={<Handshake className="h-5 w-5" />}
            title="Connect Directly"
            body="Reach premium members through their contact details, or get matched privately."
          />
          <Feature
            icon={<Zap className="h-5 w-5" />}
            title="Hire and Get Hired"
            body="Post accounting roles and apply to openings from firms across Kenya."
          />
        </div>
      </section>

      {/* ---------- Featured accountants ---------- */}
      <section>
        <div className="shell py-8 sm:py-20">
          <SectionHead
            title="Featured Professionals"
            subtitle="Premium members first, followed by the wider verified directory."
            href="/directory"
            cta="Browse the directory"
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="shell py-8 sm:py-20">
        <SectionHead
          title="Three Steps to the Right Accountant"
          subtitle="From first search to a signed engagement, without the back and forth."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Step
            n="1"
            title="Search and Filter"
            body="Narrow the directory by location, specialization and certification to build a shortlist."
          />
          <Step
            n="2"
            title="Compare Credentials"
            body="Review verified certifications, specializations and firm affiliations on each profile."
          />
          <Step
            n="3"
            title="Connect or Get Matched"
            body="Contact premium members directly, or tell us your needs and we route you privately."
          />
        </div>
      </section>

      {/* ---------- Specializations ---------- */}
      <section>
        <div className="shell py-8 sm:py-20">
          <SectionHead
            title="Find a Specialist"
            subtitle="Every discipline of the profession, from statutory audit to forensic accounting."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {SPECIALIZATIONS.map((s) => {
              const Icon = SPEC_ICONS[s] ?? ArrowRight;
              return (
                <Link
                  key={s}
                  href={`/directory?specialization=${encodeURIComponent(s)}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft"
                >
                  <span className="text-sm font-semibold leading-snug text-navy-800">
                    {s}
                  </span>
                  <Icon className="h-5 w-5 shrink-0 text-brand-600" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Latest jobs ---------- */}
      {jobs.length > 0 && (
        <section className="shell py-8 sm:py-20">
          <SectionHead
            title="Open Accounting Roles"
            subtitle="Featured positions from firms and direct employers across Kenya."
            href="/jobs"
            cta="See all jobs"
          />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {jobs.map((job) => {
              const employer = job.firm?.name ?? job.direct_employer ?? 'Employer';
              const salary = formatSalary(
                job.salary_range_min,
                job.salary_range_max,
                job.salary_currency,
              );
              return (
                <Link
                  key={job.id}
                  href={`/jobs/${job.slug ?? job.id}`}
                  className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lift"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-display font-bold text-slate-400">
                    {employer.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-display text-base font-bold text-navy-900">
                        {job.title}
                      </h3>
                      {job.is_featured && (
                        <span className="badge badge-featured shrink-0">Featured</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{employer}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                      <span className="chip">
                        {[job.town, job.location].filter(Boolean).join(', ')}
                      </span>
                      <span className="chip">{job.employment_type}</span>
                      {salary && (
                        <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">
                          {salary}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ---------- CTA band ---------- */}
      <section className="shell pb-8 sm:pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-navy-950 px-6 py-14 sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-brand-fade opacity-60"
          />
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="display text-3xl text-white sm:text-4xl">
                Ready to Find Your Accountant?
              </h2>
              <p className="mt-3 max-w-md text-slate-300">
                Tell us what you need and get matched privately with up to three
                qualified professionals, free.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/match">
                <Button variant="brand" size="lg">
                  Get matched
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Building2 className="h-4 w-4" />
                  List your practice
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- product mockup ---------------- */

function HeroPanel() {
  const rows = [
    { initial: 'J', name: 'Jane Wanjiru', cert: 'CPA-K', loc: 'Westlands', premium: true },
    { initial: 'D', name: 'David Otieno', cert: 'ACCA', loc: 'Nyali', premium: false },
    { initial: 'G', name: 'Grace Achieng', cert: 'CIFA', loc: 'Nakuru', premium: false },
  ];
  return (
    <div className="relative">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
        {/* panel header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
            <span className="font-display text-sm font-bold text-navy-900">
              Directory
            </span>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
            Nairobi · Tax
          </span>
        </div>

        {/* search mock */}
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
          <Search className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-500">Tax advisory</span>
        </div>

        {/* result rows */}
        <div className="mt-3 space-y-2.5">
          {rows.map((r) => (
            <div
              key={r.name}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-display text-sm font-bold text-slate-500">
                {r.initial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-bold text-navy-900">
                    {r.name}
                  </span>
                  <VerifiedMark className="h-3.5 w-3.5" />
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-brand-700">{r.cert}</span> ·{' '}
                  {r.loc}
                </div>
              </div>
              {r.premium ? (
                <span className="badge badge-premium">Premium</span>
              ) : (
                <span className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  View
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* floating match toast */}
      <div className="absolute -bottom-5 -left-3 hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lift sm:flex lg:-left-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/15 text-brand-600">
          <Handshake className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-bold text-navy-900">New lead matched</p>
          <p className="text-[11px] text-slate-500">Bookkeeping · Mombasa</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- local components ---------------- */

function SectionHead({
  title,
  subtitle,
  href,
  cta,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="display text-3xl text-navy-900 sm:text-[2.1rem]">
          {title}
        </h2>
        {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
      </div>
      {href && cta && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-brand-700"
        >
          {cta}
          <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lift">
      <span className="icon-tile h-10 w-10">{icon}</span>
      <h3 className="mt-4 font-display text-base font-bold text-navy-900">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <span className="icon-tile h-10 w-10 font-display text-sm font-bold">
        {n}
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-base font-bold text-navy-900">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
      </div>
    </div>
  );
}
