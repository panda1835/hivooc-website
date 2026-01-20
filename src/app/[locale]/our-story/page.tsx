"use client";

import Hero from "@/components/our-story/Hero";
import HiVOOCStory from "@/components/our-story/HiVOOCStory";
import Founder from "@/components/our-story/Founder";
import Testimonials from "@/components/tailor/Testimonials";
import GetStarted from "@/components/home/GetStarted";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import { useTranslations } from "next-intl";

export default function TailorTripPage() {
  const t = useTranslations("OurStory.Hero");

  return (
    <main className="w-full">
      <Hero title={t("title")} subtitle={t("description")} />
      <HiVOOCStory />
      <Founder />
      <Testimonials />
      <GetStarted />
      <TailorMadeTrips />
    </main>
  );
}
