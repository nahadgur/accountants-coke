import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { FirmsBrowser } from '@/components/firms/FirmsBrowser';
import { LICENSED_FIRMS, LICENSED_FIRM_COUNT } from '@/data/firms';

export const metadata: Metadata = {
  title: 'Licensed Accounting Firms in Kenya — ICPAK Directory',
  description: `Browse all ${LICENSED_FIRM_COUNT.toLocaleString()} ICPAK-licensed accounting and audit firms in Kenya. Search by name, find a verified firm, or claim and manage your own firm's listing.`,
  alternates: { canonical: '/directory' },
};

const firms = [...LICENSED_FIRMS].sort((a, b) =>
  a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
);

export default function DirectoryPage() {
  return (
    <div className="shell py-10 sm:py-12">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          ICPAK register
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Licensed Accounting Firms in Kenya
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Every one of the {LICENSED_FIRM_COUNT.toLocaleString()} accounting and
          audit firms licensed by ICPAK, in one searchable directory. Find a firm
          by name, or if you run one, claim your listing to add your details and
          start receiving client leads.
        </p>
      </div>

      <div className="mt-8">
        <FirmsBrowser firms={firms} />
      </div>

      <div className="mt-12 rounded-2xl border border-brand-200/70 bg-brand-50/60 p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-navy-900">
          Is this your firm?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          These listings come straight from the ICPAK register, so most are not
          yet managed by their owners. Claim yours to add your contact details,
          services and team, appear higher in search, and receive matched client
          enquiries. We verify every claim against the register before granting
          access.
        </p>
      </div>
    </div>
  );
}
