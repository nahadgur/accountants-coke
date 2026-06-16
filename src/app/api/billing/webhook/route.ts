import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'node:crypto';
import { createServiceClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

/**
 * Paystack webhook.
 *
 * Security: Paystack signs the raw body with HMAC-SHA512 using your secret key
 * and sends it in `x-paystack-signature`. We verify before trusting anything.
 *
 * We use the SERVICE client (RLS-bypassing) because billing is the only trusted
 * writer of `subscriptions` / `listing_orders`. The DB trigger
 * `sync_profile_from_subscription` then mirrors the tier onto `profiles`.
 *
 * Configure metadata.profile_id when creating the Paystack subscription so we
 * can map the event back to a user.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: 'not configured' }, { status: 500 });
  }

  const raw = await request.text();
  const signature = request.headers.get('x-paystack-signature') ?? '';
  const expected = crypto
    .createHmac('sha512', secret)
    .update(raw)
    .digest('hex');

  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(raw) as {
    event: string;
    data: Record<string, any>;
  };
  const supabase = createServiceClient();

  switch (event.event) {
    case 'subscription.create':
    case 'charge.success': {
      const profileId = event.data?.metadata?.profile_id;
      const purpose = event.data?.metadata?.purpose; // 'subscription' | 'listing'

      if (purpose === 'listing') {
        // One-off featured / newsletter purchase.
        const jobId = event.data?.metadata?.job_id;
        if (jobId) {
          await supabase
            .from('listing_orders')
            .update({ paid: true, provider_ref: String(event.data?.reference ?? '') })
            .eq('job_id', jobId);
          await supabase
            .from('job_postings')
            .update({ is_featured: true })
            .eq('id', jobId);
        }
      } else if (profileId) {
        // Subscription activation. Upsert keeps the unique(profile_id) intact.
        const periodEnd = event.data?.next_payment_date ?? null;
        await supabase.from('subscriptions').upsert(
          {
            profile_id: profileId,
            provider: 'paystack',
            provider_ref: String(event.data?.subscription_code ?? event.data?.reference ?? ''),
            status: 'active',
            current_period_end: periodEnd,
          },
          { onConflict: 'profile_id' },
        );
      }
      break;
    }

    case 'subscription.disable':
    case 'subscription.not_renew': {
      const profileId = event.data?.metadata?.profile_id;
      if (profileId) {
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('profile_id', profileId);
      }
      break;
    }

    case 'invoice.payment_failed': {
      const profileId = event.data?.metadata?.profile_id;
      if (profileId) {
        await supabase
          .from('subscriptions')
          .update({ status: 'past_due' })
          .eq('profile_id', profileId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
