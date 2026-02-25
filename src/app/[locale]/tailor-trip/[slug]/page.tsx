import { notFound } from "next/navigation";

import Hero from "@/components/tailor-trip/Hero";
import Introduction from "@/components/tailor-trip/Introduction";
import Support from "@/components/home/Support";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import TripDetails from "@/components/tailor-trip/TripDetails";
import { type TripDetailsData } from "@/components/short-trip/TripDetails";
import Testimonials from "@/components/tailor/Testimonials";
import TailorMadeTrips, {
  type TailorTourCard,
} from "@/components/home/TailorMadeTrips";
import type { WPMedia } from "@/lib/wordpress-media";
import {
  extractFeaturedImage,
  getFirstTermByTaxonomy,
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

interface WPTailorTour {
  id: number;
  slug: string;
  link?: string;
  title?: { rendered?: string };
  acf?: {
    overview?: {
      header?: string;
      description?: string;
    };
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

function extractGalleryImages(post: WPTailorTour): string[] {
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

function parseTourData(post: WPTailorTour): {
  heroTitle: string;
  heroSubtitleTop: string;
  heroSlides: string[];
  introTitle: string;
  introDescription: string;
  details: TripDetailsData;
} {
  const generalRows = parseKeyValueRows(post.acf?.general);
  const galleryImages = extractGalleryImages(post);
  const featuredImage = extractFeaturedImage(post) || "/tailor-made-trip/image1.jpg";

  const overviewItems = generalRows.map((row) => ({
    title: row.key,
    info: row.value,
    subtitle: "",
  }));

  const heroSubtitleTop =
    getFirstTermByTaxonomy(post, "tour-type") || "Tailor example itineraries";

  return {
    heroTitle: decodeHtmlEntities(post.title?.rendered || "Tailor-made tour"),
    heroSubtitleTop: decodeHtmlEntities(heroSubtitleTop),
    heroSlides:
      galleryImages.length > 0 ? galleryImages.slice(0, 4) : [featuredImage],
    introTitle: decodeHtmlEntities(post.acf?.overview?.header || "Program introduction"),
    introDescription: decodeHtmlEntities(post.acf?.overview?.description || ""),
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

function toTailorTourCard(post: WPTailorTour): TailorTourCard {
  return {
    id: post.id,
    category: "TAILOR-MADE TOUR",
    title: decodeHtmlEntities(post.title?.rendered || "Tailor-made tour"),
    description:
      decodeHtmlEntities(
        post.acf?.overview?.description ||
          "Every journey is crafted to match your interests, pace, and wildlife dreams.",
      ) ||
      "Every journey is crafted to match your interests, pace, and wildlife dreams.",
    image: extractFeaturedImage(post) || "/tailor-made-trip/image1.jpg",
    link: `/tailor-trip/${post.slug}`,
  };
}

async function getTourBySlug(slug: string): Promise<WPTailorTour> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/tailor-made-tour?slug=${encodeURIComponent(slug)}&_embed`,
    {
      // TEMP: Content initiation phase - enable fetch cache when content is stable.
      // next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tailor-made tour");
  }

  const data: WPTailorTour[] = await res.json();
  const post = data[0];
  if (!post) {
    notFound();
  }

  return post;
}

async function getTailorTours(locale: string): Promise<TailorTourCard[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/tailor-made-tour?per_page=100&_embed`,
    {
      // TEMP: Content initiation phase - enable fetch cache when content is stable.
      // next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    return [];
  }

  const data: WPTailorTour[] = await res.json();
  const filtered = data.filter((tour) =>
    locale === "vi"
      ? (tour.link || "").includes("/vi/")
      : !(tour.link || "").includes("/vi/"),
  );

  return filtered.map(toTailorTourCard);
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function TailorTripDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const post = await getTourBySlug(slug);
  const tours = await getTailorTours(locale);
  const {
    heroTitle,
    heroSubtitleTop,
    heroSlides,
    introTitle,
    introDescription,
    details,
  } = parseTourData(post);

  return (
    <main className="flex flex-col w-full">
      <Hero
        subtitleTop={heroSubtitleTop}
        title={heroTitle}
        slideImages={heroSlides}
      />

      <div className="mt-10">
        <Introduction title={introTitle} description={introDescription} />
      </div>

      <TripDetails tripData={details} />
      <div className="px-8 mb-10 rounded-lg">
        <Testimonials />
      </div>
      <ContributeToConservation />
      <TailorMadeTrips tours={tours} />
      <Support />
    </main>
  );
}
