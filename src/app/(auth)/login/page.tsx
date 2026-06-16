import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AuthForm } from './AuthForm';
import { getUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await getUser()) redirect('/dashboard');
  return (
    <div className="shell max-w-md py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-navy-900">
          Welcome to Accountants.co.ke
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your profile, leads and job postings.
        </p>
      </div>
      <AuthForm />
    </div>
  );
}
