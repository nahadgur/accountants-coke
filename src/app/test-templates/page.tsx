import type { Metadata } from 'next';
import { Percent, Clock, FileText, ShieldCheck } from 'lucide-react';
import {
  PageHero,
  JumpNav,
  FactGrid,
  MatchCTA,
  ProsRow,
  FaqAccordion,
  Prose,
  type Pro,
} from '@/components/page/blocks';

export const metadata: Metadata = {
  title: 'Template — editorial money page',
  robots: { index: false, follow: false },
};

const PROS: Pro[] = [
  { initial: 'J', name: 'Jane Wanjiru', cert: 'CPA-K', loc: 'Westlands, Nairobi', premium: true, bio: 'Rental income & tax assurance lead, 11 years with landlords and property investors.', tags: ['Rental income', 'Tax'] },
  { initial: 'D', name: 'David Otieno', cert: 'ACCA', loc: 'Kilimani, Nairobi', bio: 'Landlord bookkeeping and monthly MRI filing for residential portfolios.', tags: ['Rental income', 'Bookkeeping'] },
  { initial: 'G', name: 'Grace Achieng', cert: 'CIFA', loc: 'CBD, Nairobi', bio: 'Property investment tax planning and eRITS compliance.', tags: ['Rental income'] },
];

const FACTS = [
  { icon: <Percent className="h-5 w-5" />, label: '7.5%', sub: 'Flat MRI tax on gross rent' },
  { icon: <Clock className="h-5 w-5" />, label: 'By the 20th', sub: 'Filed every month' },
  { icon: <FileText className="h-5 w-5" />, label: 'KES 280k–15m', sub: 'Annual rent band' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'NIL return', sub: 'Required even at zero rent' },
];

const FAQS = [
  { q: 'How much is rental income tax in Kenya?', a: 'Monthly Rental Income (MRI) is a final tax of 7.5% on gross rent for landlords earning between KES 280,000 and 15 million a year.' },
  { q: 'When is it due?', a: 'By the 20th of the following month, every month. You must file a NIL return even in months you receive no rent.' },
  { q: 'Can I deduct expenses?', a: 'Not under MRI — it is a flat 7.5% of gross rent. Landlords with high expenses can elect the standard income-tax regime instead.' },
  { q: 'What is eRITS?', a: 'KRA’s Electronic Rental Income Tax System for registering properties, filing and paying MRI online.' },
];

export default function TemplateDemo() {
  return (
    <article className="shell py-10">
      <PageHero
        breadcrumb={[
          { label: 'Services', href: '/services' },
          { label: 'Rental income tax', href: '/services/rental-income-tax' },
          { label: 'Nairobi' },
        ]}
        title="Rental income tax accountants in Nairobi"
        lead="If you earn residential rent in Nairobi, KRA expects a Monthly Rental Income return every month, even when a unit is empty. A verified accountant registers your properties on eRITS, files on time, and keeps you clear of the 7.5% trap and penalties."
        primary={{ label: 'Get matched', href: '/match' }}
        secondary={{ label: 'Browse accountants', href: '/directory' }}
      />

      <div className="mt-10">
        <JumpNav
          items={[
            { label: 'The essentials', id: 'essentials' },
            { label: 'How MRI works', id: 'how' },
            { label: 'Filing on eRITS', id: 'erits' },
            { label: 'Accountants', id: 'pros' },
            { label: 'FAQ', id: 'faq' },
          ]}
        />
      </div>

      <section id="essentials" className="scroll-mt-28">
        <FactGrid facts={FACTS} />
      </section>

      <div id="how" className="mt-12 scroll-mt-28">
        <Prose>
          <h2>How MRI works</h2>
          <p>
            Monthly Rental Income is a <strong>final tax of 7.5% on gross rent</strong>.
            You cannot deduct expenses, and a return is due by the 20th of every month,
            including a NIL return in months a unit sits empty. It applies to landlords
            earning between KES 280,000 and 15 million a year.
          </p>
          <ul>
            <li>Charged on gross rent received, not profit</li>
            <li>Filed monthly, NIL return required when there is no rent</li>
            <li>High-expense landlords can elect the standard regime instead</li>
          </ul>
        </Prose>
      </div>

      <div className="my-10">
        <MatchCTA
          body="Tell us about your property and we’ll connect you with up to 3 verified rental-income accountants in Nairobi."
          ctaLabel="Get matched for free"
        />
      </div>

      <div id="erits" className="scroll-mt-28">
        <Prose>
          <h2>Filing on eRITS</h2>
          <p>
            KRA’s <strong>eRITS</strong> platform handles property registration, filing
            and payment. An accountant sets this up once and files for you each month,
            so you never miss the 20th.
          </p>
        </Prose>
      </div>

      <section id="pros" className="mt-12 scroll-mt-28">
        <ProsRow
          heading="Verified rental-income accountants in Nairobi"
          sub="Premium members first, every listing CPA-K verified."
          pros={PROS}
          href="/directory?specialization=Tax%20Audit"
        />
      </section>

      <section id="faq" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
          Common questions
        </h2>
        <div className="mt-5 max-w-3xl">
          <FaqAccordion items={FAQS} />
        </div>
      </section>
    </article>
  );
}
