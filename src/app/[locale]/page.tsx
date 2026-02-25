import Hero from "@/components/home/Hero";
import SellingPoint from "@/components/home/SellingPoint";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import ShortTrips from "@/components/home/ShortTrips";
import DailyExperiences from "@/components/home/DailyExperiences";
import GetStarted from "@/components/home/GetStarted";
import Reviews from "@/components/home/Reviews";
import News from "@/components/home/News";
import Partners from "@/components/home/Partners";
import Support from "@/components/home/Support";
import Gallery from "@/components/home/Gallery";

import type { ShortTrip } from "@/components/home/ShortTrips";
import type { TailorTourCard } from "@/components/home/TailorMadeTrips";
import type { DailyExperience } from "@/components/home/DailyExperiences";
import type { HomeNewsArticle } from "@/components/home/News";

import { getLocale, getTranslations } from "next-intl/server";
import { fetchWpImagesFromApiRoute, type WPMedia } from "@/lib/wordpress-media";
import {
  extractFeaturedImage,
  getFirstTermByTaxonomy,
  parseGeneralRowValue,
  type WPTerm,
} from "@/lib/wordpress-post-helpers";
import { getShortTripCards } from "@/lib/short-trip-cards";
import { decodeHtmlEntities } from "@/lib/wordpress-text";

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

interface WordPressTerm {
  name: string;
}

interface WordPressNewsResponse {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WordPressTerm[][];
  };
}

interface WPSimpleTour {
  id: number;
  slug: string;
  link?: string;
  title?: { rendered?: string };
  acf?: {
    overview?: { description?: string };
    general?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

async function getHomeHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  return fetchWpImagesFromApiRoute(
    `${baseUrl}/wp-json/wp/v2/hero-image?slug=home&_embed`,
  );
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

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toNatureEducationCard(post: WPSimpleTour): DailyExperience {
  const location = decodeHtmlEntities(
    parseGeneralRowValue(post.acf?.general, "location"),
  );

  return {
    id: post.id,
    tourType: getFirstTermByTaxonomy(post, "education-type") || "Nature Education",
    title: decodeHtmlEntities(post.title?.rendered || "Nature education"),
    description:
      decodeHtmlEntities(
        post.acf?.overview?.description ||
          "Meaningful learning experiences designed around nature and conservation.",
      ) ||
      "Meaningful learning experiences designed around nature and conservation.",
    image: extractFeaturedImage(post) || "/daily-experience/image1.png",
    link: `/nature-education/${post.slug}`,
    timeSlots: [{ label: "Location", time: location || "Vietnam" }],
  };
}

async function getNatureEducationTours(locale: string): Promise<DailyExperience[]> {
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

  const data: WPSimpleTour[] = await res.json();
  const filtered = data.filter((tour) =>
    locale === "vi"
      ? (tour.link || "").includes("/vi/")
      : !(tour.link || "").includes("/vi/"),
  );

  return filtered.slice(0, 3).map(toNatureEducationCard);
}

async function getNewsArticles(locale: string): Promise<HomeNewsArticle[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/news?per_page=20&_embed`, {
    // TEMP: Content initiation phase - enable fetch cache when content is stable.
    // next: { revalidate: 300 },
  });

  if (!res.ok) {
    return [];
  }

  const data: WordPressNewsResponse[] = await res.json();
  const filtered = data.filter((article) =>
    locale === "vi"
      ? article.link.indexOf("/vi/") !== -1
      : article.link.indexOf("/vi/") === -1,
  );

  return filtered.slice(0, 4).map((article) => {
    const descriptionFromExcerpt = stripHtml(article.excerpt?.rendered || "");
    const descriptionFromContent = stripHtml(article.content.rendered);
    const description =
      descriptionFromExcerpt ||
      (descriptionFromContent.length > 180
        ? `${descriptionFromContent.substring(0, 180)}...`
        : descriptionFromContent);

    return {
      id: article.id,
      title: decodeHtmlEntities(article.title.rendered),
      description,
      category: article._embedded?.["wp:term"]?.[0]?.[0]?.name || "News",
      image:
        article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/news/image1.jpg",
      link: `/news/${article.slug}`,
    };
  });
}

export default async function Home() {
  const t = await getTranslations();
  const locale = await getLocale();
  const [homeHeroImages, tailorTours, shortTours, natureEducationTours, newsArticles] = await Promise.all([
    getHomeHeroImages(),
    getTailorTours(locale),
    getShortTripCards(locale, { limit: 3 }),
    getNatureEducationTours(locale),
    getNewsArticles(locale),
  ]);
  return (
    <main className="flex flex-col w-full">
      <Hero slideImages={homeHeroImages} />
      <SellingPoint />
      <TailorMadeTrips tours={tailorTours} />
      <ShortTrips
        title={t("ShortTrips.title")}
        description={t("ShortTrips.description")}
        trips={shortTours}
        viewMoreHref="/short-trip"
        leftInfoLabel={locale === "vi" ? "ĐIỂM ĐẾN" : "DESTINATION"}
        rightInfoLabel={t("ShortTrips.tripLength")}
      />
      <DailyExperiences experiences={natureEducationTours} />
      <GetStarted />
      <Reviews />
      <News articles={newsArticles} />
      <Partners />
      <Support />
      <Gallery />
    </main>
  );
}
