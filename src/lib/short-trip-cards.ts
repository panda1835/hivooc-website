import { decodeHtmlEntities } from "@/lib/wordpress-text";
import type { WPMedia } from "@/lib/wordpress-media";
import {
  extractFeaturedImage,
  getFirstTermByTaxonomy,
  parseGeneralRowValue,
  type WPTerm,
} from "@/lib/wordpress-post-helpers";

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

interface WPShortTour {
  id: number;
  slug: string;
  link?: string;
  title?: { rendered?: string };
  acf?: {
    overview?: {
      description?: string;
    };
    general?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

export interface ShortTripCardItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
  bestTimeToTravel: string;
  tripLength: string;
}

function toShortTripCard(post: WPShortTour): ShortTripCardItem {
  const destination =
    decodeHtmlEntities(parseGeneralRowValue(post.acf?.general, "location")) ||
    "Vietnam";
  const duration =
    decodeHtmlEntities(parseGeneralRowValue(post.acf?.general, "duration")) ||
    "Flexible";

  return {
    id: post.id,
    category: getFirstTermByTaxonomy(post, "tour-type") || "Short Tour",
    title: decodeHtmlEntities(post.title?.rendered || "Short trip"),
    description:
      decodeHtmlEntities(
        post.acf?.overview?.description ||
          "Every journey is crafted to match your interests, pace, and wildlife dreams.",
      ) ||
      "Every journey is crafted to match your interests, pace, and wildlife dreams.",
    image: extractFeaturedImage(post) || "/short-trip/image1.jpg",
    link: `/short-trip/${post.slug}`,
    bestTimeToTravel: destination,
    tripLength: duration,
  };
}

export async function getShortTripCards(
  locale: string,
  options?: { limit?: number },
): Promise<ShortTripCardItem[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const limit = options?.limit ?? 3;
  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/short-tour?per_page=100&_embed`, {
    // TEMP: Content initiation phase - enable fetch cache when content is stable.
    // next: { revalidate: 300 },
  });

  if (!res.ok) {
    return [];
  }

  const data: WPShortTour[] = await res.json();
  return data
    .filter((tour) =>
      locale === "vi"
        ? (tour.link || "").includes("/vi/")
        : !(tour.link || "").includes("/vi/"),
    )
    .slice(0, limit)
    .map(toShortTripCard);
}
