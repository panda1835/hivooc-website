import Hero from "@/components/tailor/Hero";
import Introduction from "@/components/tailor/Introduction";
import Unique from "@/components/tailor/Unique";
import WhatToExpect from "@/components/tailor/WhatToExpect";
import Testimonials from "@/components/tailor/Testimonials";
import GetStarted from "@/components/home/GetStarted";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import { fetchWpImagesFromApiRoute } from "@/lib/wordpress-media";

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

async function getTailorTripHeroImages(): Promise<string[]> {
  if (!WORDPRESS_BASE_URL) {
    throw new Error("Missing WORDPRESS_BASE_URL environment variable");
  }

  const baseUrl = WORDPRESS_BASE_URL.replace(/\/$/, "");
  return fetchWpImagesFromApiRoute(
    `${baseUrl}/wp-json/wp/v2/hero-image?slug=tailor-trips&_embed`,
  );
}

export default async function TailorTripPage() {
  const heroImages = await getTailorTripHeroImages();

  return (
    <main className="w-full">
      <Hero backgroundImages={heroImages} />
      <Introduction />
      <Unique />
      <WhatToExpect />
      <Testimonials />
      <GetStarted />
      <TailorMadeTrips />
    </main>
  );
}
