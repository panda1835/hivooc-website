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
              <p>
                Founded in 2023 by wildlife conservation experts with 10–15
                years of experience, HiVOOC bridges conservation and ecotourism.
                Our nature tours, developed with local communities, promote
                sustainability and inspire environmental stewardship.
                <br />
                <br />
                Specializing in premium conservation and primate photography
                tours, HiVOOC funds conservation by allocating revenue to
                community groups, langur- protecting patrols, and free education
                programs.
                <br />
                <br />
                With HiVOOC, experience is the perfect mix of adventure and
                conservation—where every journey creates unforgettable memories
                and helps preserve the planet’s natural beauty. Red-shanked Douc
                Langur – QUEEN of PRIMATES
              </p>
              <p className="text-[#00342B] font-bold">
                “Travel with us to create magical memories and support wildlife
                conservation projects together”
              </p>
            </div>
          </div>
          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-[4px] overflow-hidden md:col-span-2">
            <Image
              unoptimized
              src="/our-story/team.jpg"
              alt="HiVOOC Story"
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
