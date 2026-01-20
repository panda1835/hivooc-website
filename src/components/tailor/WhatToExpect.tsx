"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WhatToExpect() {
  const t = useTranslations("Tailor.WhatToExpect");

  const expectations = [
    {
      titleKey: "expect1.title",
      descriptionKey: "expect1.description",
      image: "/tailor-made-trip/image5.jpg", // Placeholder - update with actual image path
    },
    {
      titleKey: "expect2.title",
      descriptionKey: "expect2.description",
      image: "/tailor-made-trip/image6.jpg", // Placeholder - update with actual image path
    },
    {
      titleKey: "expect3.title",
      descriptionKey: "expect3.description",
      image: "/tailor-made-trip/image7.jpg", // Placeholder - update with actual image path
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl uppercase font-medium mb-4 text-[#00342B]">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-[#012504] max-w-3xl">
            {t("description")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {expectations.map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Image */}
              <div className="relative w-full aspect-[3/4] mb-6 rounded-[4px] overflow-hidden bg-gray-200">
                <Image
                  src={item.image}
                  alt={t(item.titleKey)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium text-[#192B28] mb-4">
                {t(item.titleKey)}
              </h3>
              <p className="text-[#192B28] leading-relaxed">
                {t(item.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
