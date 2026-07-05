import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import DetailHero from "@/components/ui/DetailHero";
import { notFound } from "next/navigation";
import BookConservationTourButton from "@/components/conservation-program/BookConservationTourButton";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import { getTailorTourCards } from "@/lib/tailor-tour-cards";
import { setRequestLocale } from "next-intl/server";
import { decodeHtmlEntities } from "@/lib/wordpress-text";

export const dynamic = "force-static";

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
  title: { rendered: string };
  content: { rendered: string };
  acf: ConservationProgramACF;
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url?: string;
      media_details?: {
        sizes?: {
          full?: { source_url?: string };
          large?: { source_url?: string };
          medium_large?: { source_url?: string };
          thumbnail?: { source_url?: string };
        };
      };
    }[];
  };
}

interface ConservationProgramDetail {
  title: string;
  date: string;
  heroImage: string;
  content: string;
}

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;
const DEFAULT_IMAGE = "/hero/image1.jpg";

function formatProgramDate(dateValue?: string): string {
  if (!dateValue) {
    return "Conservation Program";
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

function getFeaturedImageUrl(
  program: ConservationProgramResponse,
): string | null {
  const featuredMedia = program._embedded?.["wp:featuredmedia"]?.[0];

  return (
    featuredMedia?.media_details?.sizes?.full?.source_url ||
    featuredMedia?.media_details?.sizes?.large?.source_url ||
    featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
    featuredMedia?.source_url ||
    featuredMedia?.media_details?.sizes?.thumbnail?.source_url ||
    null
  );
}

async function getConservationProgram(
  slug: string,
): Promise<ConservationProgramDetail | null> {
  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/conservation-program?slug=${encodeURIComponent(slug)}&_embed`,
      {
        next: {
          revalidate: 3600,
          tags: ["wordpress", "conservation-programs"],
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch conservation programs");
    }

    const data: ConservationProgramResponse[] = await res.json();
    const program = data.find((item) => item.slug === slug);

    if (!program) {
      return null;
    }

    return {
      title: decodeHtmlEntities(program.title.rendered),
      date: formatProgramDate(
        program.acf.program_date || program.acf.trip_date,
      ),
      heroImage:
        getFeaturedImageUrl(program) ||
        program.acf.hero_image ||
        program.acf.thumbnail ||
        DEFAULT_IMAGE,
      content: program.content.rendered,
    };
  } catch (error) {
    console.error("Error fetching conservation program:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = await getConservationProgram(slug);
  if (!program) return {};
  const description =
    program.content
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160) || undefined;
  return {
    title: program.title,
    description: description ? decodeHtmlEntities(description) : undefined,
    openGraph: {
      type: "article",
      images: program.heroImage ? [{ url: program.heroImage }] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/conservation-programs/${slug}`,
    },
  };
}

export default async function ConservationProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const [program, tailorTours] = await Promise.all([
    getConservationProgram(slug),
    getTailorTourCards(locale, { limit: 4 }),
  ]);

  if (!program) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: program.title,
    description: decodeHtmlEntities(
      program.content
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160),
    ) || undefined,
    image: program.heroImage || undefined,
    url: `${SITE_URL}/${locale}/conservation-programs/${slug}`,
    organizer: {
      "@type": "Organization",
      name: "HiVOOC",
      url: SITE_URL,
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Vietnam",
      address: { "@type": "PostalAddress", addressCountry: "VN" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col w-full bg-white">
        <DetailHero
          category={program.date}
          title={program.title}
          image={program.heroImage}
        />

        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <article
              className="cms-body-normal max-w-none trip-report-content text-[#192B28] [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:leading-relaxed [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-[#192B28] [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-[#192B28]"
              dangerouslySetInnerHTML={{ __html: program.content }}
            />
          </div>
          <BookConservationTourButton programTitle={program.title} />
          <div className="mt-16">
            <ContributeToConservation />
            <TailorMadeTrips tours={tailorTours} />
            <Support />
          </div>
        </div>
      </main>
    </>
  );
}
