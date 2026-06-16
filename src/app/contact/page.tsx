import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Accountants.co.ke. Questions about finding an accountant, claiming a firm listing or your data, send us a message.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="shell py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Contact us
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">
          Questions about finding an accountant, claiming a firm or your data?
          Send us a message and we will get back to you by email.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="max-w-2xl">
          <ContactForm />
        </div>

        <aside className="space-y-6 text-sm">
          <div>
            <h2 className="font-display text-base font-bold text-navy-900">
              Looking for an accountant?
            </h2>
            <p className="mt-1.5 text-slate-600">
              The fastest route is to{' '}
              <Link
                href="/match"
                className="font-semibold text-brand-700 hover:underline"
              >
                get matched
              </Link>{' '}
              or browse the{' '}
              <Link
                href="/directory"
                className="font-semibold text-brand-700 hover:underline"
              >
                firms directory
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-navy-900">
              Run a firm?
            </h2>
            <p className="mt-1.5 text-slate-600">
              Find your firm in the directory and use{' '}
              <Link
                href="/directory"
                className="font-semibold text-brand-700 hover:underline"
              >
                Claim your firm
              </Link>{' '}
              to manage your listing.
            </p>
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-navy-900">
              Based in
            </h2>
            <p className="mt-1.5 text-slate-600">Nairobi, Kenya</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
