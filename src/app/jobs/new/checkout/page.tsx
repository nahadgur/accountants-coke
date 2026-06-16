import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Sparkles } from 'lucide-react';

type PageProps = { searchParams: Promise<{ job?: string }> };

interface Order {
  id: string;
  addon: string;
  amount_kes: number;
  paid: boolean;
}

export const metadata = { title: 'Checkout', robots: { index: false } };

export default async function CheckoutPage({ searchParams }: PageProps) {
  await requireUser();
  const jobId = (await searchParams).job;
  if (!jobId) notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from('listing_orders')
    .select('id, addon, amount_kes, paid')
    .eq('job_id', jobId);
  const orders = (data as Order[]) ?? [];
  const total = orders.reduce((s, o) => s + o.amount_kes, 0);

  return (
    <div className="shell max-w-lg py-12">
      <div className="rounded-2xl border border-gold-500/40 bg-white p-8 ring-1 ring-gold-500/20">
        <div className="flex items-center gap-2 text-gold-600">
          <Sparkles className="h-5 w-5" />
          <h1 className="text-xl font-bold text-navy-900">Complete your upgrade</h1>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          Your job is published. Pay to activate the add-ons below.
        </p>

        <ul className="mt-6 divide-y divide-slate-100">
          {orders.map((o) => (
            <li key={o.id} className="flex items-center justify-between py-3">
              <span className="text-sm capitalize text-slate-700">{o.addon} listing</span>
              <span className="text-sm font-medium text-navy-900">
                KES {o.amount_kes.toLocaleString()}
              </span>
            </li>
          ))}
          <li className="flex items-center justify-between py-3 font-semibold">
            <span className="text-navy-900">Total</span>
            <span className="text-navy-900">KES {total.toLocaleString()}</span>
          </li>
        </ul>

        {/* Payment integration placeholder — wire to Paystack inline / Stripe Checkout. */}
        <button
          disabled
          className="mt-4 w-full cursor-not-allowed rounded-md bg-gold-500/70 px-5 py-3 font-semibold text-navy-900"
        >
          Pay with Paystack (integration pending)
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">
          On success, the billing webhook flips <code>listing_orders.paid</code> and
          sets the job to featured.
        </p>

        <Link
          href={`/jobs/${jobId}`}
          className="mt-4 block text-center text-sm text-slate-500 hover:underline"
        >
          Skip for now — view my job
        </Link>
      </div>
    </div>
  );
}
