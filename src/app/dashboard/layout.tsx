import Link from 'next/link';
import {
  LayoutDashboard,
  UserCog,
  Inbox,
  Briefcase,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { requireUser, getCurrentProfile } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'My profile', icon: UserCog },
  { href: '/dashboard/leads', label: 'Leads', icon: Inbox },
  { href: '/dashboard/jobs', label: 'My jobs', icon: Briefcase },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();
  const profile = await getCurrentProfile();
  const premium =
    profile?.design_tier === 'premium' && profile.monthly_subscription_active;

  return (
    <div className="shell grid grid-cols-1 gap-8 py-12 lg:grid-cols-[230px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <nav className="space-y-1 rounded-xl border border-slate-200 bg-white p-3">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-navy-900"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          {!premium && (
            <Link
              href="/dashboard/upgrade"
              className="mt-2 flex items-center gap-2.5 rounded-md bg-gold-50 px-3 py-2 text-sm font-semibold text-gold-700 hover:bg-gold-100"
            >
              <Sparkles className="h-4 w-4" />
              Upgrade to Premium
            </Link>
          )}

          <form action="/auth/signout" method="post" className="pt-2">
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </nav>

        <div className="mt-3 px-3 text-xs text-slate-400">
          {premium ? (
            <Badge variant="premium">Premium member</Badge>
          ) : (
            <span>Free tier</span>
          )}
        </div>
      </aside>

      <section>{children}</section>
    </div>
  );
}
