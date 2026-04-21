import Hero from "@/components/our-story/Hero";
import HiVOOCStory from "@/components/our-story/HiVOOCStory";
import Founder from "@/components/our-story/Founder";
import SellingPoint from "@/components/our-story/SellingPoints";
import Advisors from "@/components/our-story/Advisors";
import Tracker, { type LangurTracker } from "@/components/our-story/Tracker";
import Specialist from "@/components/our-story/Specialist";
import GetStarted from "@/components/home/GetStarted";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import { getTranslations } from "next-intl/server";
import type { WPMedia } from "@/lib/wordpress-media";
import {
  extractFeaturedImage,
  getTermsByTaxonomy,
  type WPTerm,
} from "@/lib/wordpress-post-helpers";
import { decodeHtmlEntities } from "@/lib/wordpress-text";

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

interface WPLangurTrackerPost {
  id: number;
  link?: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toLangurTracker(post: WPLangurTrackerPost): LangurTracker {
  const topics = getTermsByTaxonomy(post, "topic");

  return {
    id: post.id,
    name: decodeHtmlEntities(post.title?.rendered || "Langur tracker"),
    title:
      topics.length > 0
        ? decodeHtmlEntities(topics.join(" / "))
        : "Langur tracker",
    image: extractFeaturedImage(post) || "/our-story/tracker.jpg",
    description: decodeHtmlEntities(stripHtml(post.content?.rendered || "")),
  };
}

async function getLangurTrackers(locale: string): Promise<LangurTracker[]> {
  const baseUrl = (WORDPRESS_BASE_URL || "https://hivooc.com").replace(/\/$/, "");
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/langur-tracker?per_page=100&_embed`,
    {
      // TEMP: Content initiation phase - enable fetch cache when content is stable.
      // next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    return [];
  }

  const data: WPLangurTrackerPost[] = await res.json();
  const filtered = data.filter((tracker) =>
    locale === "vi"
      ? (tracker.link || "").includes("/vi/")
      : !(tracker.link || "").includes("/vi/"),
  );

  return filtered.map(toLangurTracker);
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function TailorTripPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("OurStory.Hero");
  const trackers = await getLangurTrackers(locale);

  return (
    <main className="w-full">
      <Hero title={t("title")} subtitle={t("description")} />
      <HiVOOCStory />
      <Founder />
      <SellingPoint />
      <Advisors />
      <Tracker trackers={trackers} />
      <Specialist />
      <GetStarted />
      <TailorMadeTrips />
    </main>
  );
}
