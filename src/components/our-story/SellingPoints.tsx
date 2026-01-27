"use client";

import {
  ArrowRight,
  Binoculars,
  GraduationCap,
  HandCoins,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Card = {
  key: "investment" | "experiential" | "community" | "education";
  icon: typeof HandCoins;
};

export default function SellingPoints() {
  const t = useTranslations("OurStory.SellingPoints");

  const cards: Card[] = [
    { key: "investment", icon: HandCoins },
    { key: "experiential", icon: Binoculars },
    { key: "community", icon: Users },
    { key: "education", icon: GraduationCap },
  ];

  return (
    <section className="w-full md:py-12 bg-[#F5F0E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 text-[#00342B] max-w-7xl">
          <h2 className="text-[32px] font-medium leading-tight">
            {t("title")}
          </h2>
          <p className="text-base  leading-relaxed text-[#00342B]">
            {t("intro")} <span className="font-semibold">{t("cta")}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="bg-white rounded-[6px] p-6 md:p-7 shadow-sm border border-[#E3E0D8] flex flex-col gap-4 h-full"
            >
              <div className="w-12 h-12 rounded-[6px] bg-[#192B28] text-white flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="text-[24px] font-medium text-[#192B28]">
                  {t(`cards.${key}.title`)}
                </h3>
                <p className="text-base leading-relaxed text-[#00342B]">
                  {t(`cards.${key}.description`)}
                </p>
              </div>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#DC5C1C] hover:underline transition-colors">
                {t("viewMore")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-[#1F3C34] rounded-[4px] px-6 py-10 md:px-10 md:py-14 text-white text-center">
          <p className="text-2xl md:text-[32px] leading-snug italic font-instrument-serif">
            &quot;{t("quote")}&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
