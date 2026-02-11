import DetailHero from "@/components/ui/DetailHero";
import { notFound } from "next/navigation";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";

interface TripReportACF {
  title: string;
  trip_date: string;
  content: string;
  thumbnail: string;
  slug?: string;
}

interface TripReportResponse {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf: TripReportACF;
}

interface TripReportDetail {
  title: string;
  date: string;
  heroImage: string;
  content: string;
}

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

async function getTripReport(slug: string): Promise<TripReportDetail | null> {
  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/trip-report?slug=${slug}`,
      {
        // next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch trip reports");
    }

    const data: TripReportResponse[] = await res.json();

    // Find the report by slug (check both ACF slug and WordPress slug)
    const report = data.find((r) => r.slug === slug);

    if (!report) {
      return null;
    }

    // Format date
    const date = new Date(report.acf.trip_date);
    const formattedDate = date
      .toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
      .toUpperCase();

    return {
      title: report.title.rendered,
      date: formattedDate,
      heroImage: report.acf.thumbnail,
      content: report.content.rendered,
    };
  } catch (error) {
    console.error("Error fetching trip report:", error);
    return null;
  }
}

export default async function TripReportDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const report = await getTripReport(slug);

  if (!report) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full bg-white">
      <DetailHero
        category={report.date}
        title={report.title}
        image={report.heroImage}
      />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <article
            className="prose prose-lg max-w-none trip-report-content font-sans text-[#192B28]"
            dangerouslySetInnerHTML={{ __html: report.content }}
          />
        </div>
        <div className="mt-16">
          <ContributeToConservation />
          <TailorMadeTrips />
          <Support />
        </div>
      </div>
    </main>
  );
}
