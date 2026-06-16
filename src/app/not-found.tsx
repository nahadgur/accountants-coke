import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="shell py-16 text-center sm:py-24">
      <p className="text-sm font-semibold text-gold-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-navy-900">Page not found</h1>
      <p className="mt-2 text-slate-500">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
      >
        Back home
      </Link>
    </div>
  );
}
