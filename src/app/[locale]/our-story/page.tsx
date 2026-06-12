import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Hero from "@/components/our-story/Hero";
import HiVOOCStory from "@/components/our-story/HiVOOCStory";
import Founder, {
  type CoreMemberProfile,
} from "@/components/our-story/Founder";
import SellingPoint from "@/components/our-story/SellingPoints";
import Advisors from "@/components/our-story/Advisors";
import Tracker, { type LangurTracker } from "@/components/our-story/Tracker";
import Specialist from "@/components/our-story/Specialist";
import GetStarted from "@/components/home/GetStarted";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import { getTailorTourCards } from "@/lib/tailor-tour-cards";
import { getTranslations } from "next-intl/server";
import { extractWpImageUrl, type WPMedia } from "@/lib/wordpress-media";
import {
  extractFeaturedImage,
  getTermsByTaxonomy,
  type WPTerm,
} from "@/lib/wordpress-post-helpers";
import { decodeHtmlEntities } from "@/lib/wordpress-text";

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

export const dynamic = "force-static";

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

interface WPCoreMemberPost {
  id: number;
  link?: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    "job-title"?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
    image: extractWpImageUrl(post) || "/our-story/tracker.jpg",
    description: decodeHtmlEntities(stripHtml(post.content?.rendered || "")),
  };
}

async function getLangurTrackers(locale: string): Promise<LangurTracker[]> {
  const baseUrl = (WORDPRESS_BASE_URL || "https://hivooc.com").replace(
    /\/$/,
    "",
  );
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/langur-tracker?per_page=100&_embed`,
    {
      next: { revalidate: 3600, tags: ["wordpress", "langur-trackers"] },
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

async function getCoreMembers(locale: string): Promise<CoreMemberProfile[]> {
  const baseUrl = (WORDPRESS_BASE_URL || "https://hivooc.com").replace(
    /\/$/,
    "",
  );
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/core-member?per_page=100&orderby=date&order=asc&_embed`,
    {
      next: { revalidate: 3600, tags: ["wordpress", "core-members"] },
    },
  );

  if (!res.ok) {
    return [];
  }

  const data: WPCoreMemberPost[] = await res.json();

  return data
    .filter((member) =>
      locale === "vi"
        ? (member.link || "").includes("/vi/")
        : !(member.link || "").includes("/vi/"),
    )
    .map((member) => ({
      id: member.id,
      name: decodeHtmlEntities(member.title?.rendered || ""),
      title: decodeHtmlEntities(member.acf?.["job-title"] || ""),
      description: decodeHtmlEntities(
        stripHtml(member.content?.rendered || ""),
      ),
      image: extractFeaturedImage(member) || "/our-story/team.jpg",
    }));
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const [t, tHeader] = await Promise.all([
    getTranslations({ locale, namespace: "OurStory.Hero" }),
    getTranslations({ locale, namespace: "Header" }),
  ]);
  return {
    title: tHeader("aboutUs"),
    description: t("description"),
    openGraph: { url: `${SITE_URL}/${locale}/our-story` },
    alternates: {
      canonical: `${SITE_URL}/${locale}/our-story`,
      languages: {
        en: `${SITE_URL}/en/our-story`,
        vi: `${SITE_URL}/vi/our-story`,
        "x-default": `${SITE_URL}/en/our-story`,
      },
    },
  };
}

export default async function TailorTripPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("OurStory.Hero");
  const [coreMembers, trackers, tailorTours] = await Promise.all([
    getCoreMembers(locale),
    getLangurTrackers(locale),
    getTailorTourCards(locale, { limit: 4 }),
  ]);

  return (
    <main className="w-full">
      <Hero title={t("title")} subtitle={t("description")} />
      <HiVOOCStory />
      <Founder members={coreMembers} />
      <SellingPoint />
      <Advisors />
      <Tracker trackers={trackers} />
      {/* <Specialist /> */}
      <GetStarted />
      <TailorMadeTrips tours={tailorTours} />
    </main>
  );
}
