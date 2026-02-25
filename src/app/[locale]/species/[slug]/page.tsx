import DetailHero from "@/components/ui/DetailHero";
import { notFound } from "next/navigation";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import ShortTrips from "@/components/home/ShortTrips";
import { getTranslations } from "next-intl/server";
import { getShortTripCards } from "@/lib/short-trip-cards";

interface WordPressTerm {
  name: string;
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
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: WordPressFeaturedMedia[];
    "wp:term"?: WordPressTerm[][];
  };
}

interface SpeciesDetail {
  name: string;
  category: string;
  heroImage: string;
  content: string;
}

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

function getSpeciesClass(article: WordPressSpeciesResponse): string {
  const terms = article._embedded?.["wp:term"]?.flat() ?? [];
  const speciesTerm = terms.find((term) => term.taxonomy === "species") ?? terms[0];
  return (speciesTerm?.name || "Species").toUpperCase();
}

async function getSpeciesDetail(
  slug: string,
  locale: string,
): Promise<SpeciesDetail | null> {
  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/key-species?slug=${encodeURIComponent(slug)}&_embed`,
      {
        // next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch species detail");
    }

    const data: WordPressSpeciesResponse[] = await res.json();
    const article =
      data.find((item) =>
        locale === "vi"
          ? item.link.indexOf("/vi/") !== -1
          : item.link.indexOf("/vi/") === -1,
      ) || data[0];

    if (!article) {
      return null;
    }

    return {
      name: article.title.rendered,
      category: getSpeciesClass(article),
      heroImage:
        article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/short-trip/image1.jpg",
      content: article.content.rendered,
    };
  } catch (error) {
    console.error("Error fetching species detail:", error);
    return null;
  }
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function SpeciesDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const species = await getSpeciesDetail(slug, locale);
  const t = await getTranslations("ShortTrips");
  const shortTrips = await getShortTripCards(locale, { limit: 3 });

  if (!species) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full bg-white">
      <DetailHero
        category={species.category}
        title={species.name}
        image={species.heroImage}
      />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <article
            className="prose prose-lg max-w-none text-branding-green"
            dangerouslySetInnerHTML={{ __html: species.content }}
          />
        </div>
        <ContributeToConservation />
        <ShortTrips
          title={t("relatedShortTrip")}
          description={t("description")}
          trips={shortTrips}
        />
        <Support />
      </div>
    </main>
  );
}
