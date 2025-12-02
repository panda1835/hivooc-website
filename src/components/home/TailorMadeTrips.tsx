"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface TourCard {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function TailorMadeTrips() {
  const t = useTranslations("TailorMadeTrips");

  // Sample tour data - replace with actual data from CMS or API
  const tours: TourCard[] = [
    {
      id: 1,
      category: "VIETNAM PRIMATES",
      title: "15 Days | Vietnam Primate Photography Tour",
      description:
        "Encounter rare and endemic species such as the Red-shanked douc, pygmy loris, Hatinh langur, and more.",
      image: "/tailor-made-trip/image1.jpg",
      link: "/tours/15-days-vietnam-primate-photography",
    },
    {
      id: 2,
      category: "VIETNAM PRIMATES",
      title: "6 Days | Vietnam Primate Photography Tour",
      description:
        "In this tour, 99% you will be able to capture beautiful pictures of the Red- Shanked Douc Langur, Grey- Shanked Douc Langur, and Ha Tinh Langur.",
      image: "/tailor-made-trip/image2.png",
      link: "/tours/6-days-vietnam-primate-photography",
    },
    {
      id: 3,
      category: "VIETNAM PRIMATES",
      title: "3 Days | Vietnam Primate Photography Tour – Ha Tien, Kien Giang",
      description:
        "In this tour, 99% you will be able to capture beautiful pictures of the Indochinese Silver Langur",
      image: "/tailor-made-trip/image3.png",
      link: "/tours/3-days-vietnam-primate-photography",
    },
    {
      id: 4,
      category: "BIRDING HOTSPOTS",
      title: "2 Days | Birding Cat Tien National Park",
      description:
        "For photographers and nature lovers, Cat Tien offers the rare chance to observe endangered primates in the wild. Early mornings echo with the calls of gibbons swinging through the canopy.",
      image: "/tailor-made-trip/image4.JPG",
      link: "/tours/2-days-birding-cat-tien",
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
            href="/tours"
            className="inline-flex items-center gap-2 text-branding-green hover:text-branding-green/80 transition-colors group"
          >
            <span className="font-medium">{t("viewMore")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="group border flex flex-col bg-white rounded-[4px] overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Tour Image */}
              <div className="relative aspect-[3/4] bg-branding-green/10 overflow-hidden">
                {/* Placeholder gradient - replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-branding-green/20 to-branding-green/5" />

                {/* Uncomment when you have real images */}
                <Image
                  unoptimized
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Tour Info */}
              <div className="flex flex-col flex-grow p-6">
                {/* Category Tag */}
                <p className="text-xs font-medium text-branding-green/60 uppercase tracking-wider mb-3">
                  {tour.category}
                </p>

                {/* Title */}
                <h3 className="text-branding-green mb-3 line-clamp-2">
                  {tour.title}
                </h3>

                {/* Description */}
                <p className="text-branding-green/70  leading-relaxed mb-6 flex-grow line-clamp-4">
                  {tour.description}
                </p>

                {/* Explore Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a href={tour.link}>
                    {t("explore")}
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
