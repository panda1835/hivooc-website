"use client";

import { Button } from "@/components/ui/button";
import TailorMyTripButton from "@/components/TailorMyTripButton";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Tailor.Hero");

  return (
    <section className="relative w-full h-[600px] md:h-[calc(100vh-64px)] overflow-hidden">
      {/* Background Image */}
      <Image
        unoptimized
        src="/news/image3.jpg"
        alt="Tailor-made wildlife experiences"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-branding-green font-sans"
            >
              {t("viewExamples")}
            </Button>
            <TailorMyTripButton />
          </div>
        </div>
      </div>
    </section>
  );
}
