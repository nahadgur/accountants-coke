import {
  CERTIFICATIONS,
  KENYAN_CITIES,
  NAIROBI_TOWNS,
  SPECIALIZATIONS,
} from '@/lib/types';
import type { DirectoryFilters as Filters } from '@/lib/directory';

/**
 * Pure-HTML filter form using method=GET. No client JS: the browser serialises
 * inputs into the URL querystring on submit, which keeps every filter
 * combination a crawlable, shareable, SSR-rendered URL — ideal for SEO.
 */
export function DirectoryFilters({ filters }: { filters: Filters }) {
  return (
    <form
      method="get"
      action="/directory"
      className="space-y-5 rounded-xl border border-slate-200 bg-white p-5"
    >
      <Field label="Search name">
        <input
          type="search"
          name="q"
          defaultValue={filters.q ?? ''}
          placeholder="e.g. Jane Mwangi"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
        />
      </Field>

      <Field label="City">
        <Select name="location" value={filters.location} placeholder="All cities">
          {KENYAN_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Town / area">
        <Select name="town" value={filters.town} placeholder="All areas">
          {NAIROBI_TOWNS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Specialization">
        <Select
          name="specialization"
          value={filters.specialization}
          placeholder="All specializations"
        >
          {SPECIALIZATIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Designation">
        <Select
          name="designation"
          value={filters.certification}
          placeholder="All designations"
        >
          {CERTIFICATIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </Field>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
        >
          Apply filters
        </button>
        <a
          href="/directory"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Reset
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function Select({
  name,
  value,
  placeholder,
  children,
}: {
  name: string;
  value: string | null;
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <select
      name={name}
      defaultValue={value ?? ''}
      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
    >
      <option value="">{placeholder}</option>
      {children}
    </select>
  );
}
