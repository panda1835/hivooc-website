"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import TripCard from "@/components/short-trip/TripCard";

export interface ShortTrip {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
  bestTimeToTravel: string;
  tripLength: string;
}

interface ShortTripsProps {
  title?: string;
  description?: string;
  trips: ShortTrip[];
}

export default function ShortTrips({ 
  title, 
  description, 
  trips 
}: ShortTripsProps) {
  const t = useTranslations("ShortTrips");

  // Use provided props or fall back to translations and default data
  const displayTitle = title || t("title");
  const displayDescription = description || t("description");
  
  return (
    <section className="w-full pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-gray-100">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 md:mb-12">
          <div className="mb-6 md:mb-0 max-w-6xl">
            <h2 className="text-branding-green leading-tight mb-4">
              {displayTitle}
            </h2>
            <p className="text-branding-green/70 leading-relaxed">
              {displayDescription}
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
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      </div>
    </section>
  );
}
