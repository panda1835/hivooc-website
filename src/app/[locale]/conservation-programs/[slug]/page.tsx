import DetailHero from "@/components/ui/DetailHero";
import { notFound } from "next/navigation";
import BookConservationTourButton from "@/components/conservation-program/BookConservationTourButton";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
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
  title: { rendered: string };
  content: { rendered: string };
  acf: ConservationProgramACF;
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

async function getConservationProgram(
  slug: string,
): Promise<ConservationProgramDetail | null> {
  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/conservation-program?slug=${encodeURIComponent(slug)}`,
      {
        // next: { revalidate: 3600 },
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
      title: program.title.rendered,
      date: formatProgramDate(
        program.acf.program_date || program.acf.trip_date,
      ),
      heroImage: program.acf.hero_image || program.acf.thumbnail || DEFAULT_IMAGE,
      content: program.content.rendered,
    };
  } catch (error) {
    console.error("Error fetching conservation program:", error);
    return null;
  }
}

export default async function ConservationProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const [program, tailorTours] = await Promise.all([
    getConservationProgram(slug),
    getTailorTourCards(locale, { limit: 4 }),
  ]);

  if (!program) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full bg-white">
      <DetailHero
        category={program.date}
        title={program.title}
        image={program.heroImage}
      />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <article
            className="prose prose-lg max-w-none trip-report-content font-sans text-[#192B28]"
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
  );
}
