import { Prose } from '@/components/page/blocks';

export function ContentLayout({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="shell py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          {title}
        </h1>
        {intro && <p className="mt-3 text-lg leading-relaxed text-slate-600">{intro}</p>}
        {updated && (
          <p className="mt-3 text-sm text-slate-400">Last updated: {updated}</p>
        )}
      </div>
      <div className="mt-8">
        <Prose>{children}</Prose>
      </div>
    </div>
  );
}
