import Link from 'next/link';
import Image from 'next/image';
import { VerifiedMark } from '@/components/ui/VerifiedMark';
import type { DirectoryProfile } from '@/lib/types';

function isActivePremium(p: DirectoryProfile) {
  return p.design_tier === 'premium' && p.monthly_subscription_active;
}

export function ProfileCard({ profile }: { profile: DirectoryProfile }) {
  const premium = isActivePremium(profile);
  const href = `/directory/${profile.slug ?? profile.id}`;
  const location = [profile.town, profile.location].filter(Boolean).join(', ');

  return (
    <Link
      href={href}
      className={[
        'group relative flex flex-col rounded-xl border bg-white p-5 transition-all duration-200',
        premium
          ? 'border-gold-500/40 ring-1 ring-gold-500/15 hover:-translate-y-1 hover:shadow-lift'
          : 'border-slate-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift',
      ].join(' ')}
    >
      {premium && (
        <span className="badge badge-premium absolute right-4 top-4">Premium</span>
      )}

      <div className="flex items-center gap-3.5">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-display text-xl font-bold text-slate-400">
              {profile.full_name.charAt(0)}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="flex items-center gap-1.5 truncate font-display text-base font-bold text-navy-900">
            <span className="truncate">{profile.full_name}</span>
            {profile.is_verified && <VerifiedMark />}
          </h3>
          <div className="mt-0.5 flex items-center gap-2 text-sm">
            {profile.certification_type && (
              <span className="font-semibold text-brand-700">
                {profile.certification_type}
              </span>
            )}
            {location && <span className="truncate text-slate-500">{location}</span>}
          </div>
        </div>
      </div>

      {profile.bio && (
        <p className="mt-3.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {profile.bio}
        </p>
      )}

      {profile.specializations.length > 0 && (
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {profile.specializations.slice(0, 3).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
          {profile.specializations.length > 3 && (
            <span className="chip">+{profile.specializations.length - 3}</span>
          )}
        </div>
      )}
    </Link>
  );
}
