import SpeciesContent from "@/components/species/SpeciesContent";
import SpeciesHero from "@/components/species/SpeciesHero";
import SpeciesIntro from "@/components/species/SpeciesIntro";
import { type SpeciesCardData } from "@/components/species/SpeciesCard";
import { getLocale, getTranslations } from "next-intl/server";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import ShortTrips from "@/components/home/ShortTrips";
import { fetchWpImagesFromApiRoute } from "@/lib/wordpress-media";
import { getShortTripCards } from "@/lib/short-trip-cards";
import { decodeHtmlEntities } from "@/lib/wordpress-text";

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

function getRegionTerm(
  article: WordPressDestinationResponse,
): WordPressTerm | undefined {
  const terms = article._embedded?.["wp:term"]?.flat() ?? [];
  return terms.find((term) => term.taxonomy === "region");
}

async function getDestinationData(locale: string): Promise<{
  destinationList: SpeciesCardData[];
  filterOptions: { value: string; label: string }[];
}> {
  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/destinations?per_page=100&_embed`,
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

      return {
        id: article.id,
        name: decodeHtmlEntities(article.title.rendered),
        category: regionTerm?.slug || `unassigned-${article.id}`,
        categoryLabel: regionTerm?.name || "Other",
        link: `/destination/${article.slug}`,
        image:
          article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "/short-trip/image1.jpg",
      };
    });

    const filterOptions = Array.from(
      new Map(
        destinationList
          .filter((item) => !item.category.startsWith("unassigned-"))
          .map((item) => [
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

async function getDestinationHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  return fetchWpImagesFromApiRoute(
    `${baseUrl}/wp-json/wp/v2/hero-image?slug=destinations&_embed`,
  );
}

export default async function DestinationPage() {
  const locale = await getLocale();
  const t = await getTranslations("DestinationPage");
  const shortTripT = await getTranslations("ShortTrips");
  const [{ destinationList, filterOptions }, heroImages, shortTrips] = await Promise.all([
    getDestinationData(locale),
    getDestinationHeroImages(),
    getShortTripCards(locale, { limit: 3 }),
  ]);

  return (
    <main className="flex flex-col w-full bg-white">
      <SpeciesHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        backgroundImages={heroImages}
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
        stickyFilter={false}
      />

      <ContributeToConservation />
      <ShortTrips
        title={shortTripT("relatedShortTrip")}
        description={shortTripT("description")}
        trips={shortTrips}
      />
      <Support />
    </main>
  );
}
