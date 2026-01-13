"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Founder() {
  const t = useTranslations("OurStory.Founder");

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:order-1 order-2">
            <h2 className="text-3xl md:text-4xl font-medium text-[#00342B]">
              {t("title")}
            </h2>
            <div className="space-y-4 text-[#00342B] leading-relaxed">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p>&quot;{t("quote")}&quot;</p>
              <div className="pt-4">
                <p className="font-semibold text-gray-900">
                  {t("founderName")}
                </p>
                <p className="text-gray-600">{t("founderTitle")}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-[4px] overflow-hidden lg:order-2 order-1">
            <Image
              unoptimized
              src="/our-story/founder.jpg"
              alt="HiVOOC Founder"
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
