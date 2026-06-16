import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentLayout } from '@/components/page/ContentLayout';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'How to find and connect with a verified accountant in Kenya, and how firms claim and manage their listing on Accountants.co.ke.',
  alternates: { canonical: '/how-it-works' },
};

export default function HowItWorksPage() {
  return (
    <ContentLayout
      title="How It Works"
      intro="Whether you need an accountant or you run a firm, here is how Accountants.co.ke works."
    >
      <h2>If you need an accountant</h2>
      <ul>
        <li>
          <strong>Search the directory.</strong> Browse every licensed accounting
          firm in Kenya, or look up one by name on the{' '}
          <Link href="/directory">directory</Link>.
        </li>
        <li>
          <strong>Tell us what you need.</strong> Prefer to be introduced? Use{' '}
          <Link href="/match">Get matched</Link> and share the service, your
          location and how to reach you.
        </li>
        <li>
          <strong>Get connected.</strong> We pass your request privately to the
          verified professionals best suited to it, and they get in touch. There
          is no charge and no obligation.
        </li>
      </ul>

      <h2>If you run a firm</h2>
      <ul>
        <li>
          <strong>Find your listing.</strong> Your firm is likely already in the
          directory, drawn from the ICPAK register.
        </li>
        <li>
          <strong>Claim it.</strong> Use the{' '}
          <Link href="/directory">Claim your firm</Link> button on your listing
          and confirm you represent the firm.
        </li>
        <li>
          <strong>We verify, then you manage it.</strong> We check your details
          against the ICPAK register. Once verified, you can add your contact
          details, services and team, and receive matched client enquiries.
        </li>
      </ul>

      <h2>How matching works</h2>
      <p>
        When you submit a request, we look at the service you need and your
        location, and route it to a small number of suitable verified firms. We
        never broadcast your details to the whole directory, and we never sell
        them. You can read more in our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>What it costs</h2>
      <p>
        Searching the directory and getting matched are free. Firms can choose
        optional paid features to stand out, but listing and being found cost
        nothing.
      </p>
    </ContentLayout>
  );
}
