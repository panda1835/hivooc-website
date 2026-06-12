"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HiVOOCStory() {
  const t = useTranslations("OurStory.Story");

  return (
    <section className="w-full py-16 md:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 md:col-span-3">
            <h2 className="text-3xl md:text-4xl font-medium text-[#00342B]">
              {t("title")}
            </h2>
            <div className="space-y-4 text-[#00342B] leading-relaxed">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p>{t("paragraph3")}</p>
              <p className="text-[#00342B] font-bold">{t("quote")}</p>
            </div>
          </div>
          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-[4px] overflow-hidden md:col-span-2">
            <Image
              unoptimized
              src="/our-story/team.jpg"
              alt={t("imageAlt")}
              fill
              className="object-cover"
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
