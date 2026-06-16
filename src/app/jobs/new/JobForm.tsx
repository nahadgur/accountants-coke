'use client';

import { useActionState, useState } from 'react';
import { Sparkles, Mail, Check } from 'lucide-react';
import { createJob, type JobState } from './actions';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select, Label } from '@/components/ui/input';
import {
  EMPLOYMENT_TYPES,
  KENYAN_CITIES,
  NAIROBI_TOWNS,
  SPECIALIZATIONS,
} from '@/lib/types';

const initial: JobState = { status: 'idle' };

const ADDONS = [
  {
    value: 'featured',
    icon: Sparkles,
    title: 'Featured listing',
    price: 'KES 3,000',
    desc: 'Pinned to the top of the feed with a gold highlight for 30 days.',
  },
  {
    value: 'newsletter',
    icon: Mail,
    title: 'Newsletter push',
    price: 'KES 5,000',
    desc: 'Included in the weekly email to 8,000+ Kenyan accountants.',
  },
] as const;

export function JobForm() {
  const [step, setStep] = useState(1);
  const [state, formAction, pending] = useActionState(createJob, initial);

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex gap-2">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full ${
              n <= step ? 'bg-navy-900' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Step 1 — role details */}
      <section className={step === 1 ? 'block' : 'hidden'}>
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Role details</h2>
          <div>
            <Label htmlFor="title">Job title</Label>
            <Input id="title" name="title" required placeholder="Senior Tax Manager" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={6} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="employment_type">Employment type</Label>
              <Select id="employment_type" name="employment_type" required defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Select id="specialization" name="specialization" defaultValue="">
                <option value="">—</option>
                {SPECIALIZATIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="button" onClick={() => setStep(2)}>
            Continue
          </Button>
        </div>
      </section>

      {/* Step 2 — employer + location + salary */}
      <section className={step === 2 ? 'block' : 'hidden'}>
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Employer & location</h2>
          <div>
            <Label htmlFor="direct_employer">Employer name</Label>
            <Input
              id="direct_employer"
              name="direct_employer"
              placeholder="Your company or firm name"
            />
            <p className="mt-1 text-xs text-slate-400">
              Leave blank if posting under a firm you own (set via firm_id).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location">City</Label>
              <Select id="location" name="location" required defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {KENYAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="town">Area</Label>
              <Select id="town" name="town" defaultValue="">
                <option value="">—</option>
                {NAIROBI_TOWNS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="salary_range_min">Salary min (KES/mo)</Label>
              <Input id="salary_range_min" name="salary_range_min" type="number" min={0} />
            </div>
            <div>
              <Label htmlFor="salary_range_max">Salary max (KES/mo)</Label>
              <Input id="salary_range_max" name="salary_range_max" type="number" min={0} />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Button type="button" variant="ghost" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button type="button" onClick={() => setStep(3)}>
            Continue
          </Button>
        </div>
      </section>

      {/* Step 3 — upgrades (UI placeholder for payment) */}
      <section className={step === 3 ? 'block' : 'hidden'}>
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Boost your listing</h2>
          <p className="text-sm text-slate-500">
            Optional paid add-ons. You’ll be taken to checkout after submitting.
          </p>
          <div className="space-y-3">
            {ADDONS.map(({ value, icon: Icon, title, price, desc }) => (
              <label
                key={value}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-300 p-4 has-[:checked]:border-gold-500 has-[:checked]:bg-gold-50/50"
              >
                <input
                  type="checkbox"
                  name="addons"
                  value={value}
                  className="mt-1 accent-gold-500"
                />
                <Icon className="mt-0.5 h-5 w-5 text-gold-600" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy-900">{title}</span>
                    <span className="text-sm font-semibold text-gold-700">{price}</span>
                  </div>
                  <p className="text-sm text-slate-500">{desc}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            <Check className="h-4 w-4 text-emerald-500" />
            Standard listing is free and live for 30 days.
          </div>
        </div>

        {state.status === 'error' && (
          <p className="mt-3 text-sm text-red-600">{state.message}</p>
        )}

        <div className="mt-4 flex justify-between">
          <Button type="button" variant="ghost" onClick={() => setStep(2)}>
            Back
          </Button>
          <Button type="submit" variant="premium" disabled={pending}>
            {pending ? 'Publishing…' : 'Publish job'}
          </Button>
        </div>
      </section>
    </form>
  );
}
