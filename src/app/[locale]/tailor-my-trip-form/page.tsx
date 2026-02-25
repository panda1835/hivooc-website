import TailorForm from '@/components/tailor/TailorForm';
import TailorMadeTrips from '@/components/home/TailorMadeTrips';
import ShortTrips from '@/components/home/ShortTrips';
import { getShortTripCards } from '@/lib/short-trip-cards';
import DailyExperiences from '@/components/home/DailyExperiences';
import { Separator } from '@/components/ui/separator';
import { getLocale } from 'next-intl/server';
import type { WPMedia } from '@/lib/wordpress-media';
import {
  extractFeaturedImage,
  getFirstTermByTaxonomy,
  parseGeneralRowValue,
  type WPTerm,
} from '@/lib/wordpress-post-helpers';
import { decodeHtmlEntities } from '@/lib/wordpress-text';
import type { TailorTourCard } from '@/components/home/TailorMadeTrips';
import type { DailyExperience } from '@/components/home/DailyExperiences';

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

interface WPTour {
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

  const data: WPTour[] = await res.json();
  return data
    .filter((tour) =>
      locale === "vi"
        ? (tour.link || "").includes("/vi/")
        : !(tour.link || "").includes("/vi/"),
    )
    .slice(0, 4)
    .map((tour) => ({
      id: tour.id,
      category: "TAILOR-MADE TOUR",
      title: decodeHtmlEntities(tour.title?.rendered || "Tailor-made tour"),
      description:
        decodeHtmlEntities(
          tour.acf?.overview?.description ||
            "Every journey is crafted to match your interests, pace, and wildlife dreams.",
        ) ||
        "Every journey is crafted to match your interests, pace, and wildlife dreams.",
      image: extractFeaturedImage(tour) || "/tailor-made-trip/image1.jpg",
      link: `/tailor-trip/${tour.slug}`,
    }));
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

  const data: WPTour[] = await res.json();
  return data
    .filter((tour) =>
      locale === "vi"
        ? (tour.link || "").includes("/vi/")
        : !(tour.link || "").includes("/vi/"),
    )
    .slice(0, 3)
    .map((tour) => ({
      id: tour.id,
      tourType: getFirstTermByTaxonomy(tour, "education-type") || "Nature Education",
      title: decodeHtmlEntities(tour.title?.rendered || "Nature education"),
      description:
        decodeHtmlEntities(
          tour.acf?.overview?.description ||
            "Meaningful learning experiences designed around nature and conservation.",
        ) ||
        "Meaningful learning experiences designed around nature and conservation.",
      image: extractFeaturedImage(tour) || "/daily-experience/image1.png",
      link: `/nature-education/${tour.slug}`,
      timeSlots: [
        {
          label: "Location",
          time:
            decodeHtmlEntities(parseGeneralRowValue(tour.acf?.general, "location")) ||
            "Vietnam",
        },
      ],
    }));
}

export default async function TailorPage() {
  const locale = await getLocale();
  const [shortTrips, tailorTours, natureEducationTours] = await Promise.all([
    getShortTripCards(locale, { limit: 3 }),
    getTailorTours(locale),
    getNatureEducationTours(locale),
  ]);

  return (
    <div className='flex flex-col'>
      <div className="min-h-screen bg-branding-yellow py-12 px-4 md:px-8 flex justify-center items-start">
        <TailorForm />
      </div>
      <TailorMadeTrips tours={tailorTours} />
      <Separator />
      <ShortTrips trips={shortTrips} />
      <Separator />
      <DailyExperiences experiences={natureEducationTours} />
    </div>
  );
}
