import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentLayout } from '@/components/page/ContentLayout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of Accountants.co.ke, the directory connecting Kenyan businesses with verified accounting firms and professionals.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <ContentLayout
      title="Terms of Service"
      intro="The terms that govern your use of Accountants.co.ke."
      updated="16 June 2026"
    >
      <p>
        These terms apply to everyone who uses Accountants.co.ke. By using the
        site you accept them. If you do not agree, please do not use the service.
      </p>

      <h2>What we do</h2>
      <p>
        Accountants.co.ke is a directory and matching service. We help you find
        and connect with verified accounting firms and professionals in Kenya,
        and we help firms list their presence. We are not an accountancy firm,
        we do not provide accounting, audit or tax advice, and we are not a party
        to any engagement you enter into with a professional you find here.
      </p>

      <h2>No guarantee of outcomes</h2>
      <p>
        We take care to verify the firms and professionals listed, but we do not
        guarantee the quality, availability or results of any work they perform.
        Any engagement, fee and deliverable is agreed directly between you and
        the professional. You are responsible for carrying out your own checks
        before appointing anyone.
      </p>

      <h2>Listings and claims</h2>
      <p>
        Firm listings are drawn from public professional records. If you claim a
        listing, you confirm that you are authorised to represent that firm. We
        verify claims against the ICPAK register before granting access. We may
        decline or remove a claim or listing at our discretion, for example where
        details cannot be verified or appear to be misused.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Provide accurate information and keep it up to date.</li>
        <li>Do not submit false, misleading or unlawful content.</li>
        <li>Do not scrape, copy or resell the directory or its data.</li>
        <li>Do not use the service to harass, defraud or harm others.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The site, its design and its content belong to us or our licensors, and
        are protected by law. You may not reproduce or distribute them without
        permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for any loss
        arising from your use of the service, from any engagement with a
        professional found through it, or from reliance on information on the
        site. The service is provided on an &ldquo;as is&rdquo; basis.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains how we handle
        your personal data and forms part of these terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Kenya, and any dispute is subject
        to the jurisdiction of the Kenyan courts.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The date at the top shows
        when they were last revised. Continuing to use the site after a change
        means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Reach us through{' '}
        <Link href="/contact">our contact page</Link>.
      </p>
    </ContentLayout>
  );
}
