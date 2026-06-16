import type { Metadata } from 'next';
import Link from 'next/link';
import {
  parseDirectoryFilters,
  queryDirectory,
  buildDirectoryHref,
  type RawSearchParams,
} from '@/lib/directory';
import { DirectoryFilters } from '@/components/directory/DirectoryFilters';
import { ProfileCard } from '@/components/directory/ProfileCard';

// Filters live in the URL, so the page is fully cacheable per-querystring.
export const dynamic = 'force-static';
export const revalidate = 300; // ISR: refresh listings every 5 minutes

type PageProps = { searchParams: Promise<RawSearchParams> };

// Dynamic, filter-aware SEO metadata for category/location landing pages.
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const f = parseDirectoryFilters(await searchParams);
  const bits = [
    f.certification && `${f.certification} accountants`,
    f.specialization,
    f.location && `in ${f.town ? `${f.town}, ` : ''}${f.location}`,
  ].filter(Boolean);

  const title = bits.length
    ? `${bits.join(' ')} | Accountants Directory`
    : 'Accountants & Firms Directory — Kenya';

  return {
    title,
    description: `Browse verified ${
      f.certification ?? 'CPA-K, ACCA & CIFA'
    } accountants${f.location ? ` in ${f.location}` : ' across Kenya'}. Premium, verified professionals listed first.`,
    alternates: { canonical: buildDirectoryHref(f, { page: null }) },
  };
}

export default async function DirectoryPage({ searchParams }: PageProps) {
  const filters = parseDirectoryFilters(await searchParams);
  const { profiles, total, page, totalPages } = await queryDirectory(filters);

  return (
    <div className="shell grid grid-cols-1 gap-8 py-12 lg:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <DirectoryFilters filters={filters} />
      </aside>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-navy-900">
              Accountants & Firms Directory
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {total} professional{total === 1 ? '' : 's'} found
              {filters.location ? ` in ${filters.location}` : ' across Kenya'}.
              Premium members listed first.
            </p>
          </div>
        </div>

        {profiles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-slate-500">
              No accountants match these filters yet.
            </p>
            <Link
              href="/directory"
              className="mt-3 inline-block text-sm font-semibold text-navy-700 hover:underline"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {profiles.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            className="mt-8 flex items-center justify-center gap-2"
            aria-label="Pagination"
          >
            {page > 1 && (
              <Link
                href={buildDirectoryHref(filters, { page: page - 1 })}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                rel="prev"
              >
                Previous
              </Link>
            )}
            <span className="px-2 text-sm text-slate-500">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={buildDirectoryHref(filters, { page: page + 1 })}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                rel="next"
              >
                Next
              </Link>
            )}
          </nav>
        )}
      </section>
    </div>
  );
}
