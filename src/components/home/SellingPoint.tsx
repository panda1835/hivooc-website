"use client";

import { useTranslations } from "next-intl";
import { User, BookOpen, Camera, Shield } from "lucide-react";

export default function SellingPoint() {
  const t = useTranslations("SellingPoint");

  const features = [
    {
      icon: User,
      titleKey: "personalizedItineraries",
      descriptionKey: "personalizedItineraries",
    },
    {
      icon: BookOpen,
      titleKey: "expertGuides",
      descriptionKey: "expertGuides",
    },
    {
      icon: Camera,
      titleKey: "rareEncounters",
      descriptionKey: "rareEncounters",
    },
    {
      icon: Shield,
      titleKey: "responsibleTourism",
      descriptionKey: "responsibleTourism",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-branding-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 text-[#00342B]">
            <h2 className=" leading-tight">{t("title")}</h2>
            <p className=" leading-relaxed">{t("description")}</p>
          </div>

          {/* Right Column - Video */}
          <div className="relative aspect-4/3 rounded-lg overflow-hidden">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/XunwbOrbJqk"
              title="HiVOOC wildlife experiences"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 lg:mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00342B] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#1A4D2E] mb-3 leading-relaxed">
                  {t(`${feature.titleKey}.title`)}
                </h3>
                <p className="text-[#00342B]  leading-relaxed">
                  {t(`${feature.descriptionKey}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
