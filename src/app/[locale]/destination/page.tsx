import SpeciesContent from "@/components/species/SpeciesContent";
import SpeciesHero from "@/components/species/SpeciesHero";
import SpeciesIntro from "@/components/species/SpeciesIntro";
import { type SpeciesCardData } from "@/components/species/SpeciesCard";
import { getLocale, getTranslations } from "next-intl/server";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import ShortTrips from "@/components/home/ShortTrips";
import { type ShortTrip } from "@/components/home/ShortTrips";

interface WordPressTerm {
  name: string;
  slug: string;
  taxonomy?: string;
}

interface WordPressFeaturedMedia {
  source_url?: string;
}

interface WordPressDestinationResponse {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: WordPressFeaturedMedia[];
    "wp:term"?: WordPressTerm[][];
  };
}

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

const customTripsArray: ShortTrip[] = [
  {
    id: 1,
    category: "PRE-MADE TRIP",
    title: "Vietnam Primate Photography",
    description:
      "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
    image: "/short-trip/image1.jpg",
    link: "/short-trip/vietnam-primate-photography",
    bestTimeToTravel: "APR - JUN",
    tripLength: "16 DAYS",
  },
  {
    id: 2,
    category: "PRE-MADE TRIP",
    title: "Vietnam Primate Photography",
    description:
      "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
    image: "/short-trip/image2.JPG",
    link: "/short-trip/vietnam-primate-photography-2",
    bestTimeToTravel: "APR - JUN",
    tripLength: "16 DAYS",
  },
  {
    id: 3,
    category: "PRE-MADE TRIP",
    title: "Vietnam Primate Photography",
    description:
      "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
    image: "/short-trip/image3.jpg",
    link: "/short-trip/vietnam-primate-photography-3",
    bestTimeToTravel: "APR - JUN",
    tripLength: "16 DAYS",
  },
];

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getRegionTerm(
  article: WordPressDestinationResponse,
): WordPressTerm | undefined {
  const terms = article._embedded?.["wp:term"]?.flat() ?? [];
  return terms.find((term) => term.taxonomy === "region") ?? terms[0];
}

async function getDestinationData(): Promise<{
  destinationList: SpeciesCardData[];
  filterOptions: { value: string; label: string }[];
}> {
  const locale = await getLocale();

  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/destination?per_page=100&_embed`,
      {
        // next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch destinations");
    }

    const data: WordPressDestinationResponse[] = await res.json();

    const filtered = data.filter((article) =>
      locale === "vi"
        ? article.link.indexOf("/vi/") !== -1
        : article.link.indexOf("/vi/") === -1,
    );

    const destinationList: SpeciesCardData[] = filtered.map((article) => {
      const regionTerm = getRegionTerm(article);
      const categoryValue = regionTerm?.slug || toSlug(regionTerm?.name || "other");
      const categoryLabel = regionTerm?.name || "Other";

      return {
        id: article.id,
        name: article.title.rendered,
        category: categoryValue,
        categoryLabel,
        link: `/destination/${article.slug}`,
        image:
          article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "/short-trip/image1.jpg",
      };
    });

    const filterOptions = Array.from(
      new Map(
        destinationList.map((item) => [
          item.category,
          { value: item.category, label: item.categoryLabel },
        ]),
      ).values(),
    );

    return { destinationList, filterOptions };
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return { destinationList: [], filterOptions: [] };
  }
}

export default async function DestinationPage() {
  const t = await getTranslations("DestinationPage");
  const shortTripT = await getTranslations("ShortTrips");
  const collageImages = [
    "/gallery/image1.jpg",
    "/gallery/image3.jpg",
    "/gallery/image4.jpg",
    "/gallery/image6.jpg",
    "/gallery/image7.JPG",
    "/gallery/image8.jpg",
  ];

  const { destinationList, filterOptions } = await getDestinationData();

  return (
    <main className="flex flex-col w-full bg-white">
      <SpeciesHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        collageImages={collageImages}
      />

      <SpeciesIntro
        title={t("introTitle")}
        description={t("introDescription")}
      />

      <SpeciesContent
        species={destinationList}
        filterOptions={filterOptions}
        filterTitle={t("filterTitle")}
        filterSubtitle={t("filterSubtitle")}
        emptyStateText={t("emptyState")}
      />

      <ContributeToConservation />
      <ShortTrips
        title={shortTripT("relatedShortTrip")}
        description={shortTripT("description")}
        trips={customTripsArray}
      />
      <Support />
    </main>
  );
}
