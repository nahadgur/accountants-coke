import Link from 'next/link';
import { getCurrentProfile } from '@/lib/auth';
import { ProfileForm } from './ProfileForm';

export const metadata = { title: 'My profile', robots: { index: false } };

export default async function ProfilePage() {
  const profile = await getCurrentProfile();
  if (!profile) {
    return (
      <p className="text-sm text-slate-500">
        We couldn’t load your profile.{' '}
        <Link href="/login" className="text-navy-700 underline">
          Sign in again
        </Link>
        .
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-900">My profile</h1>
        {profile.slug && (
          <Link
            href={`/directory/${profile.slug}`}
            className="text-sm font-medium text-navy-700 hover:underline"
          >
            View public profile →
          </Link>
        )}
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
