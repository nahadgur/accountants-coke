'use client';

import { useActionState, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, Check } from 'lucide-react';
import { submitLead, type MatchState } from '@/app/match/actions';
import { SPECIALIZATIONS, KENYAN_CITIES, NAIROBI_TOWNS } from '@/lib/types';

type Ctx = { service?: string; serviceLabel?: string; location?: string };

/**
 * Global, context-aware lead modal. Opens when any element with `data-match`
 * is clicked (reads data-match-service / data-match-location for prefill), or
 * when a `open-match` CustomEvent is dispatched. Submits the anonymous lead via
 * the existing `submitLead` action and routes to premium pros. No login.
 */
export function MatchModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ctx, setCtx] = useState<Ctx>({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest('[data-match]');
      if (!el) return;
      e.preventDefault();
      setCtx({
        service: el.getAttribute('data-match-service') ?? undefined,
        serviceLabel: el.getAttribute('data-match-label') ?? undefined,
        location: el.getAttribute('data-match-location') ?? undefined,
      });
      setOpen(true);
    }
    function onEvent(e: Event) {
      setCtx(((e as CustomEvent).detail as Ctx) ?? {});
      setOpen(true);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('click', onClick);
    window.addEventListener('open-match', onEvent as EventListener);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('open-match', onEvent as EventListener);
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
        <MatchForm ctx={ctx} onClose={() => setOpen(false)} />
      </div>
    </div>,
    document.body,
  );
}

function MatchForm({ ctx, onClose }: { ctx: Ctx; onClose: () => void }) {
  const [state, formAction, pending] = useActionState(submitLead, {
    status: 'idle',
  } as MatchState);

  if (state.status === 'success') {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold text-navy-900">
          Request received
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Thanks. We&apos;ll review your request and be in touch shortly.
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

  const serviceDefault = SPECIALIZATIONS.includes(ctx.service as never)
    ? ctx.service
    : '';
  const locationDefault = KENYAN_CITIES.includes(ctx.location as never)
    ? ctx.location
    : '';

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-extrabold text-navy-900">
            Tell us what you need
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {ctx.serviceLabel
              ? `Share your ${ctx.serviceLabel.toLowerCase()} needs and we'll be in touch.`
              : `Share what you need and we'll be in touch.`}
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
        <Field label="What do you need?">
          <select
            name="service_needed"
            required
            defaultValue={serviceDefault}
            className={inputCls}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SPECIALIZATIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="City">
            <select
              name="location"
              required
              defaultValue={locationDefault}
              className={inputCls}
            >
              <option value="" disabled>
                Select
              </option>
              {KENYAN_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Area (optional)">
            <select name="town" defaultValue="" className={inputCls}>
              <option value="">Any</option>
              {NAIROBI_TOWNS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Full name">
            <input name="client_name" required className={inputCls} />
          </Field>
          <Field label="Phone (optional)">
            <input name="client_phone" type="tel" className={inputCls} />
          </Field>
        </div>

        <Field label="Email">
          <input name="client_email" type="email" required className={inputCls} />
        </Field>

        <Field label="Anything else? (optional)">
          <textarea name="message" rows={2} className={inputCls} />
        </Field>

        {state.status === 'error' && (
          <p className="text-sm text-red-600">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Send'}
          {!pending && <ArrowRight className="h-4 w-4" />}
        </button>
        <p className="text-center text-xs text-slate-400">
          Free, no obligation. We route your request privately, never broadcast.
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
