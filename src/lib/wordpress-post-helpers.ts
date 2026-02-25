import type { WPMedia } from "@/lib/wordpress-media";

export interface WPTerm {
  name?: string;
  taxonomy?: string;
}

type WPPostWithFeaturedMedia = {
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
};

type WPPostWithTerms = {
  _embedded?: {
    "wp:term"?: WPTerm[][];
  };
};

export function extractFeaturedImage(post: WPPostWithFeaturedMedia): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) {
    return null;
  }

  const sizes = media.media_details?.sizes;
  return (
    sizes?.large?.source_url ||
    sizes?.medium_large?.source_url ||
    sizes?.medium?.source_url ||
    sizes?.thumbnail?.source_url ||
    sizes?.full?.source_url ||
    media.source_url ||
    null
  );
}

export function getTermsByTaxonomy(post: WPPostWithTerms, taxonomy: string): string[] {
  const groups = post._embedded?.["wp:term"] || [];
  return groups
    .flat()
    .filter((term) => term.taxonomy === taxonomy && Boolean(term.name))
    .map((term) => term.name as string);
}

export function getFirstTermByTaxonomy(post: WPPostWithTerms, taxonomy: string): string {
  return getTermsByTaxonomy(post, taxonomy)[0] || "";
}

export function parseGeneralRowValue(general: string | undefined, keyPrefix: string): string {
  if (!general) {
    return "";
  }

  const line = general
    .split(/\r?\n/)
    .map((item) => item.trim())
    .find((item) => item.toLowerCase().startsWith(`${keyPrefix.toLowerCase()}:`));

  return line ? line.split(":").slice(1).join(":").trim() : "";
}

export function parseGeneralLocationDuration(
  general: string | undefined,
  fallback: {
    location: string;
    duration: string;
  },
): {
  location: string;
  duration: string;
} {
  return {
    location: parseGeneralRowValue(general, "location") || fallback.location,
    duration: parseGeneralRowValue(general, "duration") || fallback.duration,
  };
}
