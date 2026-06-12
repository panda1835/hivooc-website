import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Hero from "@/components/tailor/Hero";
import Introduction from "@/components/tailor/Introduction";
import Unique from "@/components/tailor/Unique";
import WhatToExpect from "@/components/tailor/WhatToExpect";
import Testimonials from "@/components/tailor/Testimonials";
import GetStarted from "@/components/home/GetStarted";
import TailorMadeTrips, {
  type TailorTourCard,
} from "@/components/home/TailorMadeTrips";
import { fetchWpImagesFromApiRoute, type WPMedia } from "@/lib/wordpress-media";
import { extractFeaturedImage } from "@/lib/wordpress-post-helpers";
import { decodeHtmlEntities } from "@/lib/wordpress-text";
import { getTranslations, setRequestLocale } from "next-intl/server";

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

interface WPTailorTour {
  id: number;
  slug: string;
  link?: string;
  title?: { rendered?: string };
  acf?: {
    overview?: {
      description?: string;
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
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

async function getTailorTours(locale: string): Promise<TailorTourCard[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/tailor-made-tour?per_page=100&_embed`,
    {
      next: { revalidate: 3600, tags: ["wordpress", "tailor-tours"] },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tailor-made tours");
  }

  const data: WPTailorTour[] = await res.json();
  const filtered = data.filter((tour) =>
    locale === "vi"
      ? (tour.link || "").includes("/vi/")
      : !(tour.link || "").includes("/vi/"),
  );

  return filtered.map(toTailorTourCard);
}

async function getTailorTripHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  return fetchWpImagesFromApiRoute(
    `${baseUrl}/wp-json/wp/v2/hero-image?slug=tailor-trips&_embed`,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [[heroImage], t, tHeader] = await Promise.all([
    getTailorTripHeroImages(),
    getTranslations({ locale, namespace: "Tailor.Hero" }),
    getTranslations({ locale, namespace: "Header" }),
  ]);
  return {
    title: tHeader("tailorTour"),
    description: t("description"),
    openGraph: {
      url: `${SITE_URL}/${locale}/tailor-trip`,
      images: heroImage ? [{ url: heroImage }] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/tailor-trip`,
      languages: {
        en: `${SITE_URL}/en/tailor-trip`,
        vi: `${SITE_URL}/vi/tailor-trip`,
        "x-default": `${SITE_URL}/en/tailor-trip`,
      },
    },
  };
}

export default async function TailorTripPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [heroImages, tours] = await Promise.all([
    getTailorTripHeroImages(),
    getTailorTours(locale),
  ]);

  return (
    <main className="w-full">
      <Hero backgroundImages={heroImages} />
      <Introduction />
      <Unique />
      <WhatToExpect />
      <Testimonials />
      <GetStarted />
      <TailorMadeTrips tours={tours} />
    </main>
  );
}
