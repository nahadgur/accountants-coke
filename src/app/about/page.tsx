import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentLayout } from '@/components/page/ContentLayout';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Accountants.co.ke is Kenya’s directory of verified CPA-K, ACCA and CIFA accounting firms and professionals, with private client matching.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <ContentLayout
      title="About Accountants.co.ke"
      intro="Kenya’s directory of verified accounting firms and professionals, built to make finding the right one straightforward."
    >
      <p>
        Finding a trustworthy accountant in Kenya usually means asking around and
        hoping for the best. There was no single, reliable place to see who is
        properly licensed, what they specialise in and how to reach them. We
        built Accountants.co.ke to fix that.
      </p>

      <h2>What we do</h2>
      <p>
        We bring every licensed accounting firm in Kenya into one searchable
        directory, drawn from the ICPAK register. Businesses and individuals can
        find a firm by name or tell us what they need and get matched privately
        with the professionals best suited to it. Firms can claim their listing,
        keep it accurate and receive client enquiries directly.
      </p>

      <h2>Why verification matters</h2>
      <p>
        Accounting is built on trust. Every firm in our directory is drawn from
        the official register of licensed practitioners, and we verify every
        claim against that register before a firm can manage its listing. That
        keeps the directory honest and protects the people relying on it.
      </p>

      <h2>How we make money</h2>
      <p>
        The directory and client matching are free to use. Firms can later choose
        optional paid features to stand out. We do not take a commission on the
        work that follows, so the price you agree with a professional is between
        the two of you.
      </p>

      <h2>Who runs it</h2>
      <p>
        Accountants.co.ke is run by a small independent team based in Nairobi. We
        are not affiliated with ICPAK or any regulator. If you have feedback or a
        question, we would like to hear it, reach us through{' '}
        <Link href="/contact">our contact page</Link>.
      </p>
    </ContentLayout>
  );
}
