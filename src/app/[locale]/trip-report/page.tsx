import Hero from "@/components/our-story/Hero";
import TripReportListing from "@/components/trip-report/TripReportListing";
import { getTranslations, getLocale } from "next-intl/server";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import { fetchWpImagesFromApiRoute } from "@/lib/wordpress-media";
import { getTailorTourCards } from "@/lib/tailor-tour-cards";

interface TripReportACF {
  title: string;
  trip_date: string;
  content: string;
  thumbnail: string;
  slug?: string; // Custom slug field
}

interface TripReportResponse {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  acf: TripReportACF;
}

interface TripReport {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  slug?: string;
}

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

async function getTripReports(locale: string): Promise<TripReport[]> {
  try {
    if (!WORDPRESS_BASE_URL) {
      throw new Error("Missing WORDPRESS_BASE_URL environment variable");
    }

    const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/trip-report`, {
      // next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch trip reports");
    }

    const data: TripReportResponse[] = await res.json();

    const filtered = data.filter((report) =>
      locale === "vi"
        ? report.link.indexOf("/vi/") !== -1
        : report.link.indexOf("/vi/") === -1,
    );

    return filtered.map((report) => {
      // Extract first paragraph from content as description
      // Remove HTML tags and get first 200 characters
      const contentWithoutTags = report.content.rendered
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const description = contentWithoutTags.substring(0, 200);

      // Format date
      const date = new Date(report.acf.trip_date);
      const formattedDate = date
        .toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
        .toUpperCase();

      return {
        id: report.id.toString(),
        title: report.title.rendered,
        description:
          description + (contentWithoutTags.length > 200 ? "..." : ""),
        date: formattedDate,
        image: report.acf.thumbnail, // Use ACF slug if available, otherwise use WordPress slugthumbnail,
        slug: report.slug,
      };
    });
  } catch (error) {
    console.error("Error fetching trip reports:", error);
    return [];
  }
}

async function getTripReportsHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  return fetchWpImagesFromApiRoute(
    `${baseUrl}/wp-json/wp/v2/hero-image?slug=trip-reports&_embed`,
  );
}

export default async function TripReportPage() {
  const locale = await getLocale();
  const t = await getTranslations("TripReport.Hero");
  const [tripReports, heroImages, tailorTours] = await Promise.all([
    getTripReports(locale),
    getTripReportsHeroImages(),
    getTailorTourCards(locale, { limit: 4 }),
  ]);

  return (
    <main className="w-full">
      <Hero
        title={t("title")}
        subtitle={t("description")}
        backgroundImages={heroImages}
        backgroundAlt="Trip Reports Background"
      />
      <TripReportListing reports={tripReports} />
      <ContributeToConservation />
      <TailorMadeTrips tours={tailorTours} />
      <Support />
    </main>
  );
}
