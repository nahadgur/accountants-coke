'use client';

import { useActionState } from 'react';
import { updateProfile, type ProfileState } from './actions';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select, Label } from '@/components/ui/input';
import {
  CERTIFICATIONS,
  KENYAN_CITIES,
  NAIROBI_TOWNS,
  SPECIALIZATIONS,
  type DirectoryProfile,
} from '@/lib/types';

const initial: ProfileState = { status: 'idle' };

export function ProfileForm({ profile }: { profile: DirectoryProfile }) {
  const [state, formAction, pending] = useActionState(updateProfile, initial);
  const premium =
    profile.design_tier === 'premium' && profile.monthly_subscription_active;

  return (
    <form action={formAction} className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-navy-900">Basic details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" name="full_name" defaultValue={profile.full_name} required />
          </div>
          <div>
            <Label htmlFor="certification_type">Designation</Label>
            <Select
              id="certification_type"
              name="certification_type"
              defaultValue={profile.certification_type ?? ''}
            >
              <option value="">Select…</option>
              {CERTIFICATIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="registration_number">Registration number</Label>
            <Input
              id="registration_number"
              name="registration_number"
              defaultValue={profile.registration_number ?? ''}
              placeholder="e.g. ICPAK 12345"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location">City</Label>
              <Select id="location" name="location" defaultValue={profile.location} required>
                {KENYAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="town">Area</Label>
              <Select id="town" name="town" defaultValue={profile.town ?? ''}>
                <option value="">—</option>
                {NAIROBI_TOWNS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" rows={4} defaultValue={profile.bio ?? ''} />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-1 font-semibold text-navy-900">Specializations</h2>
        <p className="mb-4 text-sm text-slate-500">
          Used to match you with client leads.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SPECIALIZATIONS.map((s) => (
            <label
              key={s}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 p-2.5 text-sm has-[:checked]:border-navy-700 has-[:checked]:bg-navy-50"
            >
              <input
                type="checkbox"
                name="specializations"
                value={s}
                defaultChecked={profile.specializations.includes(s)}
                className="accent-navy-700"
              />
              {s}
            </label>
          ))}
        </div>
      </section>

      <section className="relative rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-1 font-semibold text-navy-900">Contact & booking</h2>
        <p className="mb-4 text-sm text-slate-500">
          {premium
            ? 'Shown publicly on your premium profile.'
            : 'Saved now, but only displayed once you upgrade to Premium.'}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" defaultValue={profile.phone ?? ''} />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" name="whatsapp" type="tel" defaultValue={profile.whatsapp ?? ''} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="calendly_url">Calendly / booking URL</Label>
            <Input
              id="calendly_url"
              name="calendly_url"
              type="url"
              defaultValue={profile.calendly_url ?? ''}
              placeholder="https://calendly.com/your-handle"
            />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save changes'}
        </Button>
        {state.status === 'success' && (
          <span className="text-sm text-emerald-600">Saved.</span>
        )}
        {state.status === 'error' && (
          <span className="text-sm text-red-600">{state.message}</span>
        )}
      </div>
    </form>
  );
}
