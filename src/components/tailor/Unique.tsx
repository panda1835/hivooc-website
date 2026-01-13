"use client";

import { useTranslations } from "next-intl";
import { Camera, Shield } from "lucide-react";

export default function Unique() {
  const t = useTranslations("Tailor.Unique");

  const features = [
    {
      icon: Camera,
      titleKey: "feature1.title",
      descriptionKey: "feature1.description",
    },
    {
      icon: Shield,
      titleKey: "feature2.title",
      descriptionKey: "feature2.description",
    },
    {
      icon: Camera,
      titleKey: "feature3.title",
      descriptionKey: "feature3.description",
    },
    {
      icon: Shield,
      titleKey: "feature4.title",
      descriptionKey: "feature4.description",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-branding-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-6 text-[#F8F8F8]">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-[#F8F8F8] max-w-3xl">
            {t("description")}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-[#192B28] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-[#192B28] mb-3">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-[#00342B] text-base leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
