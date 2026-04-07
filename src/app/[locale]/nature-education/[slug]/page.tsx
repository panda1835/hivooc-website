import { notFound } from "next/navigation";

import Hero from "@/components/short-trip/Hero";
import Pricing from "@/components/short-trip/Pricing";
import Support from "@/components/home/Support";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import ShortTrips, { type ShortTrip } from "@/components/home/ShortTrips";
import TripDetails, {
  type TripDetailsData,
} from "@/components/short-trip/TripDetails";
import type { WPMedia } from "@/lib/wordpress-media";
import {
  extractFeaturedImage,
  type WPTerm,
} from "@/lib/wordpress-post-helpers";
import { decodeHtmlEntities } from "@/lib/wordpress-text";

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

interface WPGalleryItem {
  metadata?: {
    large?: { file_url?: string };
    medium_large?: { file_url?: string };
    medium?: { file_url?: string };
    full?: { file_url?: string };
    thumbnail?: { file_url?: string };
  };
}

interface WPNatureEducation {
  id: number;
  slug: string;
  title?: { rendered?: string };
  acf?: {
    overview?: {
      header?: string;
      description?: string;
    };
    price?: string;
    general?: string;
    highlight?: string;
    map?: string;
    itinerary?: string;
    additional_information?: string;
    policies?: string;
    gallery?: WPGalleryItem[];
    whats_included?: {
      included?: string;
      not_included?: string;
      not_allowed?: string;
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

function stripHtmlTags(value: string): string {
  return decodeHtmlEntities(
    value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
}

function splitByHr(value?: string): string[] {
  if (!value) return [];

  return value
    .split(/<hr\s*\/?\s*>/gi)
    .map((section) => section.trim())
    .filter(Boolean);
}

function parseKeyValueRows(value?: string): Array<{ key: string; value: string }> {
  if (!value) return [];

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf(":");
      if (separator === -1) {
        return null;
      }

      const key = line.slice(0, separator).trim();
      const rowValue = line.slice(separator + 1).trim();
      if (!key || !rowValue) {
        return null;
      }

      return { key: decodeHtmlEntities(key), value: decodeHtmlEntities(rowValue) };
    })
    .filter((row): row is { key: string; value: string } => Boolean(row));
}

function extractListItems(value?: string): string[] {
  if (!value) return [];

  const matches = value.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi);
  if (!matches) return [];

  return matches
    .map((item) =>
      item.replace(/^<li\b[^>]*>/i, "").replace(/<\/li>$/i, "").trim(),
    )
    .filter(Boolean);
}

function parseHtmlSections(value?: string): Array<{ title: string; contentHtml: string }> {
  return splitByHr(value)
    .map((block, index) => {
      const h1Match = block.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
      const title = h1Match ? stripHtmlTags(h1Match[1]) : `Section ${index + 1}`;
      const contentHtml = h1Match ? block.replace(h1Match[0], "").trim() : block;

      if (!contentHtml) {
        return null;
      }

      return {
        title,
        contentHtml,
      };
    })
    .filter(
      (section): section is { title: string; contentHtml: string } =>
        Boolean(section),
    );
}

function parseMapLocations(value?: string): Array<{ name: string; lat: number; lng: number }> {
  if (!value) return [];

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf(":");
      if (separator === -1) return null;

      const name = decodeHtmlEntities(line.slice(0, separator).trim());
      const coordPart = line.slice(separator + 1).trim();
      const [latRaw, lngRaw] = coordPart.split(",").map((part) => part.trim());
      const lat = Number(latRaw);
      const lng = Number(lngRaw);

      if (!name || Number.isNaN(lat) || Number.isNaN(lng)) {
        return null;
      }

      return { name, lat, lng };
    })
    .filter((location): location is { name: string; lat: number; lng: number } =>
      Boolean(location),
    );
}

function extractGalleryImages(post: WPNatureEducation): string[] {
  const gallery = post.acf?.gallery;
  if (!gallery || gallery.length === 0) {
    return [];
  }

  const urls = gallery
    .map((item) => {
      const metadata = item.metadata;
      return (
        metadata?.large?.file_url ||
        metadata?.medium_large?.file_url ||
        metadata?.medium?.file_url ||
        metadata?.full?.file_url ||
        metadata?.thumbnail?.file_url ||
        null
      );
    })
    .filter((url): url is string => Boolean(url));

  return Array.from(new Set(urls));
}

function parseProgramDetails(post: WPNatureEducation): {
  pricing: {
    title: string;
    description: string;
    pricingTiers: { pax: string; price: string }[];
  };
  details: TripDetailsData;
  heroTitle: string;
  heroSubtitle: string;
  heroSlides: string[];
} {
  const generalRows = parseKeyValueRows(post.acf?.general);
  const priceRows = parseKeyValueRows(post.acf?.price);
  const galleryImages = extractGalleryImages(post);
  const featuredImage = extractFeaturedImage(post) || "/short-trip/image1.jpg";

  const overviewItems = generalRows.map((row) => ({
    title: row.key,
    info: row.value,
    subtitle: "",
  }));

  const pricingTiers = priceRows.map((row) => ({
    pax: row.key,
    price: row.value,
  }));

  return {
    heroTitle: decodeHtmlEntities(post.title?.rendered || "Nature education"),
    heroSubtitle: decodeHtmlEntities(post.acf?.overview?.description || ""),
    heroSlides:
      galleryImages.length > 0 ? galleryImages.slice(0, 4) : [featuredImage],
    pricing: {
      title: decodeHtmlEntities(post.acf?.overview?.header || "Program overview"),
      description: decodeHtmlEntities(post.acf?.overview?.description || ""),
      pricingTiers,
    },
    details: {
      overview: {
        items: overviewItems,
        description: decodeHtmlEntities(post.acf?.overview?.description || ""),
      },
      highlights: {
        description: "",
        items: extractListItems(post.acf?.highlight).map(stripHtmlTags),
        highlightImages:
          galleryImages.length > 0 ? galleryImages.slice(0, 4) : [featuredImage],
      },
      mapLocations: parseMapLocations(post.acf?.map),
      included: extractListItems(post.acf?.whats_included?.included),
      excluded: extractListItems(post.acf?.whats_included?.not_included),
      notAllowed: extractListItems(post.acf?.whats_included?.not_allowed),
      itinerarySections: parseHtmlSections(post.acf?.itinerary),
      additionalInfoSections: parseHtmlSections(post.acf?.additional_information),
      policySections: parseHtmlSections(post.acf?.policies),
      photos: galleryImages.length > 0 ? galleryImages : [featuredImage],
    },
  };
}

function parseRelatedProgramCard(post: WPNatureEducation): ShortTrip {
  const generalRows = parseKeyValueRows(post.acf?.general);
  const featuredImage = extractFeaturedImage(post) || "/short-trip/image1.jpg";
  const duration =
    generalRows.find((row) => row.key.toLowerCase() === "duration")?.value ||
    "Flexible";
  const typeName =
    post._embedded?.["wp:term"]
      ?.flat()
      .find((term) => term.taxonomy === "education-type")?.name ||
    "Nature Education";

  return {
    id: post.id,
    category: typeName,
    title: decodeHtmlEntities(post.title?.rendered || "Nature education"),
    description:
      decodeHtmlEntities(
        post.acf?.overview?.description ||
          "Meaningful learning experiences designed around nature and conservation.",
      ) ||
      "Meaningful learning experiences designed around nature and conservation.",
    image: featuredImage,
    link: `/nature-education/${post.slug}`,
    bestTimeToTravel: "Custom",
    tripLength: duration,
  };
}

async function getProgramBySlug(slug: string): Promise<WPNatureEducation> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/nature-education?slug=${encodeURIComponent(slug)}&_embed`,
    {
      // TEMP: Content initiation phase - enable fetch cache when content is stable.
      // next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch nature education program");
  }

  const data: WPNatureEducation[] = await res.json();
  const post = data[0];
  if (!post) {
    notFound();
  }

  return post;
}

async function getRelatedPrograms(currentId: number): Promise<ShortTrip[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/nature-education?per_page=100&_embed`,
    {
      // TEMP: Content initiation phase - enable fetch cache when content is stable.
      // next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    return [];
  }

  const data: WPNatureEducation[] = await res.json();
  return data
    .filter((program) => program.id !== currentId)
    .slice(0, 3)
    .map(parseRelatedProgramCard);
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function NatureEducationPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const post = await getProgramBySlug(slug);
  const { heroTitle, heroSubtitle, heroSlides, pricing, details } =
    parseProgramDetails(post);
  const relatedPrograms = await getRelatedPrograms(post.id);
  const isVietnamese = locale === "vi";

  return (
    <main className="flex flex-col w-full non-selectable-content">
      <Hero title={heroTitle} subtitle={heroSubtitle} slideImages={heroSlides} />

      <Pricing
        title={pricing.title}
        description={pricing.description}
        pricingTiers={pricing.pricingTiers}
        inquiryType="Nature Education Tour"
        inquiryName={heroTitle}
      />

      <TripDetails
        tripData={details}
        inquiryType="Nature Education Tour"
        inquiryName={heroTitle}
      />
      <ContributeToConservation />

      {relatedPrograms.length > 0 && (
        <ShortTrips
          title={isVietnamese ? "Chương trình liên quan" : "Related programs"}
          description={
            isVietnamese
              ? "Tiếp tục khám phá các chương trình giáo dục thiên nhiên khác phù hợp với mục tiêu học tập của bạn."
              : "Continue exploring more nature education programs that match your learning goals."
          }
          trips={relatedPrograms}
          viewMoreHref="/nature-education"
        />
      )}

      <Support />
    </main>
  );
}
