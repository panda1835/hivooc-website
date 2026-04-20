import Hero from "@/components/our-story/Hero";
import BookConservationTourButton from "@/components/conservation-program/BookConservationTourButton";
import ConservationProgramListing from "@/components/conservation-program/ConservationProgramListing";
import { getTranslations, getLocale } from "next-intl/server";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import { fetchWpImagesFromApiRoute } from "@/lib/wordpress-media";
import { getTailorTourCards } from "@/lib/tailor-tour-cards";

interface ConservationProgramACF {
  title?: string;
  trip_date?: string;
  program_date?: string;
  content?: string;
  thumbnail?: string;
  hero_image?: string;
  slug?: string;
}

interface ConservationProgramResponse {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  acf: ConservationProgramACF;
}

interface ConservationProgram {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  slug?: string;
}

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;
const DEFAULT_IMAGE = "/hero/image1.jpg";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatProgramDate(dateValue?: string): string {
  if (!dateValue) {
    return "CONSERVATION PROGRAM";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue.toUpperCase();
  }

  return date
    .toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

async function getConservationPrograms(): Promise<ConservationProgram[]> {
  const locale = await getLocale();

  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/conservation-program`, {
      // next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch conservation programs");
    }

    const data: ConservationProgramResponse[] = await res.json();

    const filtered = data.filter((program) =>
      locale === "vi"
        ? program.link.indexOf("/vi/") !== -1
        : program.link.indexOf("/vi/") === -1,
    );

    return filtered.map((program) => {
      const contentWithoutTags = stripHtml(program.content.rendered);
      const description = contentWithoutTags.substring(0, 200);
      const date = formatProgramDate(
        program.acf.program_date || program.acf.trip_date,
      );

      return {
        id: program.id.toString(),
        title: program.title.rendered,
        description:
          description + (contentWithoutTags.length > 200 ? "..." : ""),
        date,
        image: program.acf.thumbnail || program.acf.hero_image || DEFAULT_IMAGE,
        slug: program.slug,
      };
    });
  } catch (error) {
    console.error("Error fetching conservation programs:", error);
    return [];
  }
}

async function getConservationProgramHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  return fetchWpImagesFromApiRoute(
    `${baseUrl}/wp-json/wp/v2/hero-image?slug=conservation-program&_embed`,
  );
}

export default async function ConservationProgramsPage() {
  const locale = await getLocale();
  const t = await getTranslations("ConservationProgram.Hero");
  const [programs, heroImages, tailorTours] = await Promise.all([
    getConservationPrograms(),
    getConservationProgramHeroImages(),
    getTailorTourCards(locale, { limit: 4 }),
  ]);

  return (
    <main className="w-full">
      <Hero
        title={t("title")}
        subtitle={t("description")}
        backgroundImages={heroImages}
        backgroundAlt="Conservation Programs Background"
      />
      <ConservationProgramListing programs={programs} />
      <BookConservationTourButton />
      <ContributeToConservation />
      <TailorMadeTrips tours={tailorTours} />
      <Support />
    </main>
  );
}
