'use client';

import { useActionState, useState } from 'react';
import { signIn, signUp, type AuthState } from './actions';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/input';

export function AuthForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<'professional' | 'seeker'>('professional');
  const action = mode === 'signin' ? signIn : signUp;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    undefined,
  );

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-8">
      <div className="mb-6 flex rounded-lg bg-slate-100 p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setMode('signin')}
          className={`flex-1 rounded-md py-2 ${
            mode === 'signin' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`flex-1 rounded-md py-2 ${
            mode === 'signup' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          Create account
        </button>
      </div>

      <form action={formAction} className="space-y-4">
        {mode === 'signup' && (
          <>
            <div>
              <Label>I am a…</Label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(
                  [
                    ['professional', 'Accountant / firm'],
                    ['seeker', 'Job seeker'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={[
                      'rounded-lg border py-2.5 text-sm font-semibold transition-colors',
                      role === value
                        ? 'border-brand-500 bg-brand-50 text-navy-900'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <input type="hidden" name="role" value={role} />
            </div>
            <div>
              <Label htmlFor="full_name">
                {role === 'seeker' ? 'Full name' : 'Your name or firm name'}
              </Label>
              <Input id="full_name" name="full_name" required autoComplete="name" />
            </div>
          </>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          />
        </div>

        {state?.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending
            ? 'Please wait…'
            : mode === 'signin'
              ? 'Sign in'
              : 'Create account'}
        </Button>
      </form>
    </div>
  );
}
