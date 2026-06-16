export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600" />
        <span className="text-sm font-medium text-slate-400">Loading…</span>
      </div>
    </div>
  );
}
