import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentLayout } from '@/components/page/ContentLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Accountants.co.ke collects, uses and protects your personal data under the Kenya Data Protection Act, 2019.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <ContentLayout
      title="Privacy Policy"
      intro="How we collect, use and protect your personal data when you use Accountants.co.ke."
      updated="16 June 2026"
    >
      <p>
        This policy explains how Accountants.co.ke (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;) handles personal data in line with the Kenya Data
        Protection Act, 2019. By using the site you agree to the practices
        described here.
      </p>

      <h2>Who we are</h2>
      <p>
        Accountants.co.ke is an online directory that helps individuals and
        businesses in Kenya find verified accounting firms and professionals,
        and helps firms list and manage their presence. We are the data
        controller for the personal data described below. You can reach us at{' '}
        <Link href="/contact">our contact page</Link>.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Get matched requests.</strong> When you ask to be matched with
          an accountant, we collect your name, email address, phone number, the
          service you need, your location and any message you provide.
        </li>
        <li>
          <strong>Claim your firm requests.</strong> When you claim a firm
          listing, we collect your name, role, work email, phone number, the
          firm you represent and any details you ask us to add.
        </li>
        <li>
          <strong>Account data.</strong> If you create an account, we store your
          email, the name you provide and your account type.
        </li>
        <li>
          <strong>Technical data.</strong> Basic information your browser sends,
          such as device and approximate location, used to keep the site secure
          and working.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To match your request with relevant verified accountants or firms.</li>
        <li>To verify firm claims against the ICPAK register before granting access.</li>
        <li>To operate, secure and improve the directory and our services.</li>
        <li>To contact you about your request or your listing.</li>
      </ul>

      <h2>Legal basis for processing</h2>
      <p>
        We process your data on the basis of your consent (which you give when
        you submit a form), to take steps you have requested, and for our
        legitimate interest in running and improving the service. You may
        withdraw consent at any time by contacting us.
      </p>

      <h2>Who we share it with</h2>
      <p>
        When you ask to be matched, we share your request with the small number
        of verified firms best suited to it, so they can respond. We never
        broadcast your details to the whole directory and we do not sell your
        data. We also use trusted service providers to host the site and process
        form submissions on our behalf, under appropriate confidentiality
        obligations.
      </p>

      <h2>International transfers</h2>
      <p>
        Some of our service providers store data on servers outside Kenya. Where
        that happens, we take reasonable steps to ensure your data remains
        protected to a standard consistent with the Data Protection Act, 2019.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your data only as long as needed for the purpose it was
        collected, to meet legal obligations, and to resolve disputes. You can
        ask us to delete your data at any time.
      </p>

      <h2>Your rights</h2>
      <p>Under the Data Protection Act, 2019 you have the right to:</p>
      <ul>
        <li>Be informed of how your data is used.</li>
        <li>Access the personal data we hold about you.</li>
        <li>Ask us to correct inaccurate data.</li>
        <li>Ask us to delete your data.</li>
        <li>Object to or restrict certain processing.</li>
      </ul>
      <p>
        To exercise any of these, contact us through{' '}
        <Link href="/contact">our contact page</Link>. You also have the right to
        lodge a complaint with the Office of the Data Protection Commissioner
        (ODPC).
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect your
        data against loss, misuse and unauthorised access. No method of
        transmission over the internet is completely secure, so we cannot
        guarantee absolute security.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        We use only the cookies needed for the site to function. If we introduce
        analytics or other non-essential cookies, we will ask for your consent
        first and update this policy.
      </p>

      <h2>Children</h2>
      <p>
        The service is intended for businesses and adults. We do not knowingly
        collect data from anyone under 18.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top shows
        when it was last revised.
      </p>
    </ContentLayout>
  );
}
