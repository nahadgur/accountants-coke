'use client';

import { useActionState, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, Check } from 'lucide-react';
import { submitFirmClaim, type ClaimState } from '@/app/firms/claim-actions';

type Ctx = { firm?: string; slug?: string };

/**
 * Global "claim this firm" modal. Opens when any element with `data-claim` is
 * clicked (reads data-claim-firm / data-claim-slug for prefill). Submits a
 * claim request for manual verification. No login required to request.
 */
export function ClaimModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ctx, setCtx] = useState<Ctx>({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest('[data-claim]');
      if (!el) return;
      e.preventDefault();
      setCtx({
        firm: el.getAttribute('data-claim-firm') ?? undefined,
        slug: el.getAttribute('data-claim-slug') ?? undefined,
      });
      setOpen(true);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-950/55 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-panel sm:rounded-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <ClaimForm key={ctx.slug ?? ctx.firm} ctx={ctx} onClose={() => setOpen(false)} />
      </div>
    </div>,
    document.body,
  );
}

function ClaimForm({ ctx, onClose }: { ctx: Ctx; onClose: () => void }) {
  const [state, formAction, pending] = useActionState(submitFirmClaim, {
    status: 'idle',
  } as ClaimState);

  if (state.status === 'success') {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold text-navy-900">
          Claim submitted
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Thanks. We will verify your details against the ICPAK register and email
          you the next steps to manage{' '}
          <span className="font-semibold text-navy-900">{ctx.firm}</span>.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Claim your listing
          </span>
          <h2 className="mt-2 font-display text-xl font-extrabold text-navy-900">
            {ctx.firm ?? 'Claim this firm'}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Confirm you represent this firm. Once verified, you can add your
            contact details, services and team, and receive client leads.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-navy-900 hover:bg-slate-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form action={formAction} className="mt-5 space-y-3">
        <input type="hidden" name="firm_name" value={ctx.firm ?? ''} />
        <input type="hidden" name="firm_slug" value={ctx.slug ?? ''} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Your name">
            <input name="claimant_name" required className={inputCls} />
          </Field>
          <Field label="Your role (optional)">
            <input
              name="claimant_role"
              placeholder="e.g. Partner, Manager"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Work email">
          <input name="claimant_email" type="email" required className={inputCls} />
        </Field>

        <Field label="Phone (optional)">
          <input name="claimant_phone" type="tel" className={inputCls} />
        </Field>

        <Field label="What should we add or update? (optional)">
          <textarea
            name="message"
            rows={2}
            placeholder="Address, services, website, team…"
            className={inputCls}
          />
        </Field>

        {state.status === 'error' && (
          <p className="text-sm text-red-600">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? 'Submitting…' : 'Submit claim'}
        </button>
        <p className="text-center text-xs text-slate-400">
          We verify every claim against the ICPAK register before granting access.
        </p>
      </form>
    </>
  );
}

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}
