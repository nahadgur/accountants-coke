import { Check } from 'lucide-react';
import { getCurrentProfile } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Upgrade to Premium', robots: { index: false } };

const FREE = [
  'Listed in the directory',
  'Basic public profile',
  'Post jobs (standard)',
];
const PREMIUM = [
  'Pinned to the top of search results',
  'Verified trust badge',
  'Contact details & WhatsApp button visible',
  'Custom header image & avatar',
  'Matched client leads delivered to you',
  'Embedded Calendly booking',
];

export default async function UpgradePage() {
  const profile = await getCurrentProfile();
  const premium =
    profile?.design_tier === 'premium' && profile.monthly_subscription_active;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Choose your plan</h1>
      <p className="mt-1 text-sm text-slate-500">
        Upgrade any time. Cancel any time.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Free</h2>
          <p className="mt-1 text-3xl font-bold text-navy-900">
            KES 0<span className="text-base font-normal text-slate-400">/mo</span>
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-600">
            {FREE.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-slate-400" />
                {f}
              </li>
            ))}
          </ul>
          <Button variant="outline" disabled className="mt-6 w-full">
            {premium ? 'Downgrade in billing portal' : 'Current plan'}
          </Button>
        </div>

        <div className="rounded-2xl border-2 border-gold-500 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-navy-900">Premium</h2>
            <span className="rounded-full bg-gold-500 px-2.5 py-0.5 text-xs font-semibold text-navy-900">
              Most popular
            </span>
          </div>
          <p className="mt-1 text-3xl font-bold text-navy-900">
            KES 2,500<span className="text-base font-normal text-slate-400">/mo</span>
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-600">
            {PREMIUM.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
          {/* Payment placeholder — wire to Paystack subscription create. */}
          <Button variant="premium" disabled={premium} className="mt-6 w-full">
            {premium ? 'You’re Premium ✓' : 'Upgrade with Paystack'}
          </Button>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        After payment, Paystack calls our webhook (<code>/api/billing/webhook</code>),
        which writes a <code>subscriptions</code> row — a database trigger then flips
        your profile to Premium automatically.
      </p>
    </div>
  );
}
