'use client';

import { useActionState, useState } from 'react';
import { submitLead, type MatchState } from '@/app/match/actions';
import { SPECIALIZATIONS, KENYAN_CITIES, NAIROBI_TOWNS } from '@/lib/types';

const initial: MatchState = { status: 'idle' };

/**
 * Multi-step "Match me with an accountant" questionnaire.
 * Steps 1–2 are pure client UI state; the final submit posts the whole form to
 * the `submitLead` Server Action, which runs the routing engine.
 */
export function MatchWizard() {
  const [step, setStep] = useState(1);
  const [state, formAction, pending] = useActionState(submitLead, initial);

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h2 className="text-xl font-bold text-emerald-800">Request received</h2>
        <p className="mt-2 text-emerald-700">
          {state.matched > 0
            ? `We've notified ${state.matched} matching specialist${
                state.matched === 1 ? '' : 's'
              }. Expect a call shortly.`
            : `We'll match you with a specialist and be in touch shortly.`}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200 bg-white p-8"
    >
      <div className="mb-6 flex gap-2">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full ${
              n <= step ? 'bg-gold-500' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Step 1: what do you need */}
      <div className={step === 1 ? 'block' : 'hidden'}>
        <h2 className="text-lg font-bold text-navy-900">What do you need?</h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {SPECIALIZATIONS.map((s) => (
            <label
              key={s}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 p-3 text-sm has-[:checked]:border-gold-500 has-[:checked]:bg-gold-50"
            >
              <input
                type="radio"
                name="service_needed"
                value={s}
                required
                className="accent-gold-500"
              />
              {s}
            </label>
          ))}
        </div>
        <StepNav onNext={() => setStep(2)} />
      </div>

      {/* Step 2: where */}
      <div className={step === 2 ? 'block' : 'hidden'}>
        <h2 className="text-lg font-bold text-navy-900">Where are you based?</h2>
        <div className="mt-4 space-y-4">
          <Select name="location" label="City" required>
            {KENYAN_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Select name="town" label="Area (optional)">
            {NAIROBI_TOWNS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <StepNav onBack={() => setStep(1)} onNext={() => setStep(3)} />
      </div>

      {/* Step 3: contact */}
      <div className={step === 3 ? 'block' : 'hidden'}>
        <h2 className="text-lg font-bold text-navy-900">Your details</h2>
        <div className="mt-4 space-y-4">
          <Input name="client_name" label="Full name" required />
          <Input name="client_email" label="Email" type="email" required />
          <Input name="client_phone" label="Phone (optional)" type="tel" />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Anything else? (optional)
            </span>
            <textarea
              name="message"
              rows={3}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        {state.status === 'error' && (
          <p className="mt-3 text-sm text-red-600">{state.message}</p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-gold-500 px-6 py-2.5 font-semibold text-navy-900 hover:bg-gold-400 disabled:opacity-60"
          >
            {pending ? 'Matching…' : 'Find my accountant'}
          </button>
        </div>
      </div>
    </form>
  );
}

function StepNav({
  onBack,
  onNext,
}: {
  onBack?: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        className="rounded-md bg-navy-900 px-6 py-2.5 font-semibold text-white hover:bg-navy-800"
      >
        Continue
      </button>
    </div>
  );
}

function Input({
  name,
  label,
  type = 'text',
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
      />
    </label>
  );
}

function Select({
  name,
  label,
  required,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
      >
        <option value="" disabled={required}>
          Select…
        </option>
        {children}
      </select>
    </label>
  );
}
