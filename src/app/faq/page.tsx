import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentLayout } from '@/components/page/ContentLayout';
import { FaqAccordion } from '@/components/page/blocks';
import { faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers about finding a verified accountant in Kenya, how matching works, claiming a firm listing, pricing and data privacy on Accountants.co.ke.',
  alternates: { canonical: '/faq' },
};

const FAQS = [
  {
    q: 'Is Accountants.co.ke free to use?',
    a: 'Yes. Searching the directory and getting matched with an accountant are free for individuals and businesses. Firms can choose optional paid features to stand out, but listing and being found cost nothing.',
  },
  {
    q: 'How are firms verified?',
    a: 'Every firm in the directory is drawn from the official ICPAK register of licensed practitioners. When a firm claims its listing, we check the claimant against that register before granting access.',
  },
  {
    q: 'What is ICPAK?',
    a: 'The Institute of Certified Public Accountants of Kenya is the professional body that licenses and regulates accountants in Kenya. We are independent and not affiliated with ICPAK.',
  },
  {
    q: 'How does matching work?',
    a: 'When you tell us the service you need and your location, we route your request privately to a small number of suitable verified firms so they can respond. We never broadcast your details to the whole directory.',
  },
  {
    q: 'Do you provide accounting or tax advice?',
    a: 'No. We are a directory and matching service, not an accountancy firm. Any engagement, fee and advice is agreed directly between you and the professional you choose.',
  },
  {
    q: 'How do I claim my firm’s listing?',
    a: 'Find your firm in the directory and use the Claim your firm button. Submit your name, role and work email, and we will verify you against the ICPAK register before giving you access to manage the listing.',
  },
  {
    q: 'Is my information safe?',
    a: 'We only share a match request with the firms best suited to it, never the whole directory, and we never sell your data. See our Privacy Policy for the full detail of how we handle personal data under the Data Protection Act, 2019.',
  },
  {
    q: 'Which areas of Kenya do you cover?',
    a: 'The whole country. The directory includes licensed firms nationwide, and you can filter matches by your city or area.',
  },
];

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <ContentLayout
        title="Frequently Asked Questions"
        intro="The things people most often ask about finding an accountant, claiming a firm and how we handle your data."
      >
        <FaqAccordion items={FAQS} />
        <p className="!mt-10">
          Still have a question? Reach us through{' '}
          <Link href="/contact">our contact page</Link>.
        </p>
      </ContentLayout>
    </>
  );
}
