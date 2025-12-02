"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ShortTrip {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
  bestTimeToTravel: string;
  tripLength: string;
}

export default function ShortTrips() {
  const t = useTranslations("ShortTrips");

  // Sample short trip data - replace with actual data from CMS or API
  const trips: ShortTrip[] = [
    {
      id: 1,
      category: "PRE-MADE TRIP",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/short-trip/image1.jpg",
      link: "/trips/vietnam-primate-photography",
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
      link: "/trips/vietnam-primate-photography-2",
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
      link: "/trips/vietnam-primate-photography-3",
      bestTimeToTravel: "APR - JUN",
      tripLength: "16 DAYS",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 md:mb-12">
          <div className="mb-6 md:mb-0 max-w-2xl">
            <h2 className="text-branding-green leading-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-branding-green/70 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* View More Link */}
          <a
            href="/short-trips"
            className="inline-flex items-center gap-2 text-branding-green hover:text-branding-green/80 transition-colors group"
          >
            <span className="font-medium">{t("viewMore")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="group border flex flex-col bg-white rounded-[4px] overflow-hidden border hover:shadow-lg transition-shadow"
            >
              {/* Trip Image */}
              <div className="relative aspect-[4/3] bg-branding-green/10 overflow-hidden">
                {/* Placeholder gradient - replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-branding-green/20 to-branding-green/5" />

                {/* Uncomment when you have real images */}
                <Image
                  unoptimized
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Trip Info */}
              <div className="flex flex-col flex-grow p-6">
                {/* Category Tag */}
                <p className="text-xs font-medium text-branding-green/60 uppercase tracking-wider mb-3">
                  {trip.category}
                </p>

                {/* Title */}
                <h3 className="text-branding-green mb-3">
                  {trip.title}
                </h3>

                {/* Description */}
                <p className="text-branding-green/70  leading-relaxed mb-6 flex-grow">
                  {trip.description}
                </p>

                {/* Explore Button */}
                <Button
                  variant="outline"
                  className="w-full mb-4"
                  asChild
                >
                  <a href={trip.link}>
                    {t("explore")}
                  </a>
                </Button>

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs text-branding-green/60 uppercase tracking-wider mb-1">
                      {t("bestTimeToTravel")}
                    </p>
                    <p className=" font-medium text-branding-green">
                      {trip.bestTimeToTravel}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-branding-green/60 uppercase tracking-wider mb-1">
                      {t("tripLength")}
                    </p>
                    <p className=" font-medium text-branding-green">
                      {trip.tripLength}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
