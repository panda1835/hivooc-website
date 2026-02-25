import SpeciesContent from "@/components/species/SpeciesContent";
import SpeciesHero from "@/components/species/SpeciesHero";
import SpeciesIntro from "@/components/species/SpeciesIntro";
import { type SpeciesCardData } from "@/components/species/SpeciesCard";
import { getLocale, getTranslations } from "next-intl/server";
import { getShortTripCards } from "@/lib/short-trip-cards";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import ShortTrips from "@/components/home/ShortTrips";
import { fetchWpImagesFromApiRoute } from "@/lib/wordpress-media";

interface WordPressTerm {
  name: string;
  slug: string;
  taxonomy?: string;
}

interface WordPressFeaturedMedia {
  source_url?: string;
}

interface WordPressSpeciesResponse {
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

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSpeciesTerm(article: WordPressSpeciesResponse): WordPressTerm | undefined {
  const terms = article._embedded?.["wp:term"]?.flat() ?? [];
  return terms.find((term) => term.taxonomy === "species") ?? terms[0];
}

async function getSpeciesData(): Promise<{
  speciesList: SpeciesCardData[];
  filterOptions: { value: string; label: string }[];
}> {
  const locale = await getLocale();

  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/key-species?per_page=100&_embed`,
      {
        // next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch species");
    }

    const data: WordPressSpeciesResponse[] = await res.json();

    const filtered = data.filter((article) =>
      locale === "vi"
        ? article.link.indexOf("/vi/") !== -1
        : article.link.indexOf("/vi/") === -1,
    );

    const speciesList: SpeciesCardData[] = filtered.map((article) => {
      const speciesTerm = getSpeciesTerm(article);
      const categoryValue = speciesTerm?.slug || toSlug(speciesTerm?.name || "other");
      const categoryLabel = speciesTerm?.name || "Other";

      return {
        id: article.id,
        name: article.title.rendered,
        category: categoryValue,
        categoryLabel,
        link: `/species/${article.slug}`,
        image:
          article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "/short-trip/image1.jpg",
      };
    });

    const filterOptions = Array.from(
      new Map(
        speciesList.map((item) => [item.category, { value: item.category, label: item.categoryLabel }]),
      ).values(),
    );

    return { speciesList, filterOptions };
  } catch (error) {
    console.error("Error fetching species:", error);
    return { speciesList: [], filterOptions: [] };
  }
}

async function getSpeciesHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  return fetchWpImagesFromApiRoute(
    `${baseUrl}/wp-json/wp/v2/hero-image?slug=species&_embed`,
  );
}

export default async function SpeciesPage() {
  const locale = await getLocale();
  const t = await getTranslations("SpeciesPage");
  const shortTripT = await getTranslations("ShortTrips");
  const [{ speciesList, filterOptions }, heroImages, shortTrips] = await Promise.all([
    getSpeciesData(),
    getSpeciesHeroImages(),
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
        species={speciesList}
        filterOptions={filterOptions}
        filterTitle={t("filterTitle")}
        filterSubtitle={t("filterSubtitle")}
        emptyStateText={t("emptyState")}
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
