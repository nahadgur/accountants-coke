import 'server-only';

/**
 * Google Apps Script capture webhook (see scripts/apps-script.gs). Hardcoded by
 * fleet convention, never an env var: env vars have silently no-opped before,
 * and this must keep capturing even when Supabase is unreachable.
 *
 * After deploying the Apps Script as a web app, paste its /exec URL here.
 */
const WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbygjPqH7ogrZ7rt_BNUqqHidg2vZkwvYYoBSztj8pN8G0dHQk7JQDi277VrSrDo9VsExg/exec';

/** Fire-and-forget POST to the capture sheet. Returns true on a 2xx response. */
export async function postToSheet(
  payload: Record<string, unknown>,
): Promise<boolean> {
  if (WEBHOOK_URL.includes('REPLACE_WITH')) return false; // not configured yet
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Server-to-server; don't let a slow Sheet hang the request forever.
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
