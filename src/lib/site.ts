/**
 * The canonical base URL of this site.
 * Set NEXT_PUBLIC_SITE_URL in your environment (no trailing slash).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hivooc.com"
).replace(/\/$/, "");
