"use client";

import Hero from "@/components/our-story/Hero";
import HiVOOCStory from "@/components/our-story/HiVOOCStory";
import Founder from "@/components/our-story/Founder";
import SellingPoint from "@/components/our-story/SellingPoints";
import Advisors from "@/components/our-story/Advisors";
import Tracker from "@/components/our-story/Tracker";
import Specialist from "@/components/our-story/Specialist";
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
      <SellingPoint />
      <Advisors />
      <Tracker />
      <Specialist />
      <GetStarted />
      <TailorMadeTrips />
    </main>
  );
}
