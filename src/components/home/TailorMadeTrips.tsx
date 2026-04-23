"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export interface TailorTourCard {
  id: number;
  category?: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface TailorMadeTripsProps {
  tours?: TailorTourCard[];
  title?: string;
  description?: string;
  viewMoreHref?: string;
}

export default function TailorMadeTrips({
  tours = [],
  title,
  description,
  viewMoreHref = "/tailor-trip",
}: TailorMadeTripsProps) {
  const t = useTranslations("TailorMadeTrips");
  const displayTitle = title || t("title");
  const displayDescription = description || t("description");

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 md:mb-12">
          <div className="mb-6 md:mb-0 max-w-6xl">
            <h2 className="text-branding-green leading-tight mb-4">
              {displayTitle}
            </h2>
            <p className="text-branding-green/70 leading-relaxed">
              {displayDescription}
            </p>
          </div>

          <Link
            href={viewMoreHref}
            className="inline-flex items-center gap-2 text-branding-green hover:text-branding-green/80 transition-colors group"
          >
            <span className="font-medium">{t("viewMore")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-4 border rounded-[4px] p-6 text-branding-green/80">
              No tailor-made tours are available right now.
            </div>
          )}

          {tours.map((tour) => (
            <div
              key={tour.id}
              className="group border flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[3/4] bg-branding-green/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-branding-green/20 to-branding-green/5" />

                <Image
                  unoptimized
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col flex-grow p-6">
                {tour.category && (
                  <p className="text-xs text-[#5A7363] font-medium uppercase tracking-wider mb-3">
                    {tour.category}
                  </p>
                )}

                <h3 className="text-[#1A4D2E] mb-3 line-clamp-2 leading-tight">
                  {tour.title}
                </h3>

                <p className="text-[#00342B] leading-relaxed mb-6 flex-grow line-clamp-4">
                  {tour.description}
                </p>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={tour.link}>{t("explore")}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
