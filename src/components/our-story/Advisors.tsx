"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

type AdvisorProfile = {
  name: string;
  image: string;
  imageAlt?: string;
  paragraphs: string[];
};

export default function Advisors() {
  const t = useTranslations("OurStory.Advisors");

  const advisors = (t.raw("members") as AdvisorProfile[] | undefined) ?? [
    {
      name: "Dr. Tilo Nadler",
      image: "/our-story/tilo.jpg",
      imageAlt: "Dr. Tilo Nadler",
      paragraphs: [
        "Dr. Tilo Nadler stands as a pivotal figure in conservation within Vietnam, widely known and respected for his unwavering dedication to primates and forest ecosystems.",
        "His remarkable life has become a source of inspiration for anyone fortunate enough to encounter him. His devotion to the old-growth forests of Vietnam has earned him the esteemed title of 'knight of the old forests of Vietnam,' a testament to his extensive conservation efforts that extend beyond the realm of primate research and protection.",
        "The affectionate moniker bestowed upon him by the Vietnamese people, 'Primate Lord,' carries profound significance, reflecting his central role in the preservation of the country's rare primate species. This title, translating to 'lord of the primates' or 'king of the primates', is not merely a name but a recognition of his vast knowledge, leadership in primate conservation endeavors, and likely the significant successes he has achieved in safeguarding these vulnerable animals. The use of this honorific highlights the deep admiration and respect held by the conservation community and the Vietnamese people for his contributions.",
        "Tilo Nadler's extensive experience and knowledge have made him a valuable advisor to government agencies and businesses on conservation issues. His advice has been instrumental in shaping our mission: Ecotourism for Conservation and Conservation for Ecotourism.",
      ],
    },
  ];

  return (
    <section className="w-full py-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-[32px] font-medium text-[#00342B]">
            {t("title")}
          </h2>
          <span className="hidden sm:block flex-1 border-t border-[#2F3F3B]" />
        </div>

        <div className="space-y-12">
          {advisors.map((advisor) => (
            <div
              key={advisor.name}
              className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-start"
            >
              <div className="relative md:col-span-2 h-full rounded-[6px] overflow-hidden shadow-sm">
                <Image
                  unoptimized
                  src="/our-story/tilo.jpg"
                  alt={advisor.imageAlt ?? advisor.name}
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 100vw"
                />
              </div>

              <div className="md:col-span-3 space-y-4 text-[#00342B] leading-relaxed">
                <h3 className="text-[26px] font-semibold text-[#192B28]">
                  {advisor.name}
                </h3>
                {advisor.paragraphs.map((paragraph, index) => (
                  <p key={`${advisor.name}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
