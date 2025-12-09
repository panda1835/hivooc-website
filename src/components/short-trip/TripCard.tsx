"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
interface TripCardProps {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
  bestTimeToTravel: string;
  tripLength: string;
}

export default function TripCard({
  category,
  title,
  description,
  image,
  link,
  bestTimeToTravel,
  tripLength,
}: TripCardProps) {
  const t = useTranslations("ShortTrips");

  return (
    <div className="group border flex flex-col bg-white rounded-[4px] overflow-hidden border hover:shadow-lg transition-shadow">
      {/* Trip Image */}
      <div className="relative aspect-[4/3] bg-branding-green/10 overflow-hidden">
        {/* Placeholder gradient - replace with actual image */}
        <div className="absolute inset-0 bg-gradient-to-br from-branding-green/20 to-branding-green/5" />

        {/* Uncomment when you have real images */}
        <Image
          unoptimized
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Trip Info */}
      <div className="flex flex-col flex-grow p-6">
        {/* Category Tag */}
        <p className="text-xs font-medium text-[#5A7363] uppercase tracking-wider mb-3">
          {category}
        </p>

        {/* Title */}
        <h3 className="text-[#1A4D2E] mb-3">{title}</h3>

        {/* Description */}
        <p className="text-[#00342B] leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Explore Button */}
        <Button variant="outline" className="w-full mb-4" asChild>
          <Link href={link}>{t("explore")}</Link>
        </Button>

        {/* Trip Details */}
        <div className="text-[14px] font-medium grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-[#5A7363]  uppercase tracking-wider mb-1">
              {t("bestTimeToTravel")}
            </p>
            <p className="">{bestTimeToTravel}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[#5A7363]  uppercase tracking-wider mb-1">
              {t("tripLength")}
            </p>
            <p className="">{tripLength}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
