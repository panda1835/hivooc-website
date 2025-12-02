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
          <div className="space-y-6">
            <h2 className="text-branding-green leading-tight">{t("title")}</h2>
            <p className="text-branding-green/80 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Right Column - Video/Image Placeholder */}
          <div className="relative aspect-4/3 bg-branding-green/10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-branding-green border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
            {/* Placeholder for image/video */}
            <div className="w-full h-full bg-linear-to-br from-branding-green/20 to-branding-green/5"></div>
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
                <div className="w-12 h-12 rounded-lg bg-branding-green flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-branding-yellow" />
                </div>
                <h3 className="text-branding-green mb-3">
                  {t(`${feature.titleKey}.title`)}
                </h3>
                <p className="text-branding-green/70  leading-relaxed">
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
