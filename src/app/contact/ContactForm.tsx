'use client';

import { useActionState } from 'react';
import { Check } from 'lucide-react';
import { submitContact, type ContactState } from './actions';

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, {
    status: 'idle',
  } as ContactState);

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-brand-200/70 bg-brand-50/60 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600 shadow-soft">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold text-navy-900">
          Message sent
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Thanks for getting in touch. We will reply by email as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Your name">
          <input name="name" required className={inputCls} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required className={inputCls} />
        </Field>
      </div>
      <div className="mt-4">
        <Field label="Subject (optional)">
          <input name="subject" className={inputCls} />
        </Field>
      </div>
      <div className="mt-4">
        <Field label="Message">
          <textarea name="message" rows={5} required className={inputCls} />
        </Field>
      </div>

      {state.status === 'error' && (
        <p className="mt-3 text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60 sm:w-auto sm:px-6"
      >
        {pending ? 'Sending…' : 'Send message'}
      </button>
    </form>
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
