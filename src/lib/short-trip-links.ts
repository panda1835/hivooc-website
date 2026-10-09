/** Decode CMS slugs formatted as https-{domain labels}-{en|vi}. */
export function getShortTripExternalUrl(slug: string): string | null {
  const match = /^https-([a-z0-9]+(?:-[a-z0-9]+)+)-(en|vi)$/.exec(slug);
  if (!match) return null;

  const [, domain, locale] = match;
  return `https://${domain.replace(/-/g, ".")}/${locale}`;
}

export function getShortTripHref(slug: string): string {
  return getShortTripExternalUrl(slug) ?? `/short-trip/${slug}`;
}
