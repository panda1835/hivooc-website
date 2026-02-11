import Hero from "@/components/home/Hero";
import SellingPoint from "@/components/home/SellingPoint";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import ShortTrips from "@/components/home/ShortTrips";
import DailyExperiences from "@/components/home/DailyExperiences";
import GetStarted from "@/components/home/GetStarted";
import Reviews from "@/components/home/Reviews";
import News from "@/components/home/News";
import Partners from "@/components/home/Partners";
import Support from "@/components/home/Support";
import Gallery from "@/components/home/Gallery";

import type { ShortTrip } from "@/components/home/ShortTrips";

import { getTranslations } from "next-intl/server";
import { fetchWpImagesFromApiRoute } from "@/lib/wordpress-media";

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

async function getHomeHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  return fetchWpImagesFromApiRoute(
    `${baseUrl}/wp-json/wp/v2/hero-image?slug=home&_embed`,
  );
}

export default async function Home() {
  const t = await getTranslations();
  const homeHeroImages = await getHomeHeroImages();
  const customTripsArray: ShortTrip[] = [
    {
      id: 1,
      category: "PRE-MADE TRIP",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/short-trip/image1.jpg",
      link: "/short-trip/vietnam-primate-photography",
      bestTimeToTravel: "APR - JUN",
      tripLength: "16 DAYS",
    },
    {
      id: 2,
      category: "PRE-MADE TRIP",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/short-trip/image2.JPG",
      link: "/short-trip/vietnam-primate-photography-2",
      bestTimeToTravel: "APR - JUN",
      tripLength: "16 DAYS",
    },
    {
      id: 3,
      category: "PRE-MADE TRIP",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/short-trip/image3.jpg",
      link: "/short-trip/vietnam-primate-photography-3",
      bestTimeToTravel: "APR - JUN",
      tripLength: "16 DAYS",
    },
  ];
  return (
    <main className="flex flex-col w-full">
      <Hero slideImages={homeHeroImages} />
      <SellingPoint />
      <TailorMadeTrips />
      <ShortTrips
        title={t("ShortTrips.title")}
        description={t("ShortTrips.description")}
        trips={customTripsArray}
      />
      <DailyExperiences />
      <GetStarted />
      <Reviews />
      <News />
      <Partners />
      <Support />
      <Gallery />
    </main>
  );
}
