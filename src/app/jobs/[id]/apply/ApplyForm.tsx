'use client';

import { useActionState } from 'react';
import { applyToJob, type ApplyState } from './actions';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Label } from '@/components/ui/input';

const initial: ApplyState = { status: 'idle' };

export function ApplyForm({ jobId }: { jobId: string }) {
  const [state, formAction, pending] = useActionState(applyToJob, initial);

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h2 className="text-lg font-bold text-emerald-800">Application sent</h2>
        <p className="mt-1 text-sm text-emerald-700">
          The employer has your details and will reach out if you’re a fit.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <input type="hidden" name="job_id" value={jobId} />
      <div>
        <Label htmlFor="applicant_name">Full name</Label>
        <Input id="applicant_name" name="applicant_name" required />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="applicant_email">Email</Label>
          <Input id="applicant_email" name="applicant_email" type="email" required />
        </div>
        <div>
          <Label htmlFor="applicant_phone">Phone</Label>
          <Input id="applicant_phone" name="applicant_phone" type="tel" />
        </div>
      </div>
      <div>
        <Label htmlFor="cv_url">CV link (Google Drive, Dropbox…)</Label>
        <Input id="cv_url" name="cv_url" type="url" placeholder="https://" />
      </div>
      <div>
        <Label htmlFor="cover_note">Cover note</Label>
        <Textarea id="cover_note" name="cover_note" rows={4} />
      </div>

      {state.status === 'error' && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Sending…' : 'Submit application'}
      </Button>
    </form>
  );
}
