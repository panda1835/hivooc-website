"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HiVOOCStory() {
  const t = useTranslations("OurStory.Story");

  return (
    <section className="w-full py-16 md:py-24 bg-[#EFE9E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-[4px] overflow-hidden">
            <Image
              unoptimized
              src="/our-story/team.jpg"
              alt="HiVOOC Story"
              fill
              className="object-cover"
              quality={90}
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-medium text-[#00342B]">
              {t("title")}
            </h2>
            <div className="space-y-4 text-[#00342B] leading-relaxed">
              <p>{t("description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
