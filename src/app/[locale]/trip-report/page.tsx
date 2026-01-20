"use client";

import Hero from "@/components/our-story/Hero";
import TripReportListing from "@/components/trip-report/TripReportListing";
import { useTranslations } from "next-intl";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import Support from "@/components/home/Support";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
// Mock data for trip reports - replace with actual data from your CMS/API
const mockTripReports = [
  {
    id: "1",
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    description:
      'Ninh Binh is a northern province of Vietnam, located on The Red River Delta, covering an area of 1,412 square kilometers. Its name, Ninh Binh, comes from the Sino-Vietnamese characters 寧平, meaning "peaceful and level".',
    date: "JAN, 2028",
    image: "/gallery/image1.jpg",
    slug: "ninh-binh-nature-enthusiast",
  },
  {
    id: "2",
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    description:
      'Ninh Binh is a northern province of Vietnam, located on The Red River Delta, covering an area of 1,412 square kilometers. Its name, Ninh Binh, comes from the Sino-Vietnamese characters 寧平, meaning "peaceful and level".',
    date: "JAN, 2028",
    image: "/gallery/image3.jpg",
    slug: "ninh-binh-nature-enthusiast-2",
  },
  {
    id: "3",
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    description:
      'Ninh Binh is a northern province of Vietnam, located on The Red River Delta, covering an area of 1,412 square kilometers. Its name, Ninh Binh, comes from the Sino-Vietnamese characters 寧平, meaning "peaceful and level".',
    date: "JAN, 2028",
    image: "/gallery/image4.jpg",
    slug: "ninh-binh-nature-enthusiast-3",
  },
  {
    id: "4",
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    description:
      'Ninh Binh is a northern province of Vietnam, located on The Red River Delta, covering an area of 1,412 square kilometers. Its name, Ninh Binh, comes from the Sino-Vietnamese characters 寧平, meaning "peaceful and level".',
    date: "JAN, 2028",
    image: "/gallery/image6.jpg",
    slug: "ninh-binh-nature-enthusiast-4",
  },
  {
    id: "5",
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    description:
      'Ninh Binh is a northern province of Vietnam, located on The Red River Delta, covering an area of 1,412 square kilometers. Its name, Ninh Binh, comes from the Sino-Vietnamese characters 寧平, meaning "peaceful and level".',
    date: "JAN, 2028",
    image: "/gallery/image8.jpg",
    slug: "ninh-binh-nature-enthusiast-5",
  },
  {
    id: "6",
    title: "Ninh Binh: A rendezvous of nature enthusiast",
    description:
      'Ninh Binh is a northern province of Vietnam, located on The Red River Delta, covering an area of 1,412 square kilometers. Its name, Ninh Binh, comes from the Sino-Vietnamese characters 寧平, meaning "peaceful and level".',
    date: "JAN, 2028",
    image: "/gallery/image13.jpg",
    slug: "ninh-binh-nature-enthusiast-6",
  },
];

export default function TripReportPage() {
  const t = useTranslations("TripReport.Hero");

  return (
    <main className="w-full">
      <Hero
        title={t("title")}
        subtitle={t("description")}
        backgroundImage="/hero/image1.jpg"
        backgroundAlt="Trip Reports Background"
      />
      <TripReportListing reports={mockTripReports} />
      <ContributeToConservation />
      <TailorMadeTrips />
      <Support />
    </main>
  );
}
