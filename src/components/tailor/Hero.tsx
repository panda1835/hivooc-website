"use client";

import { Button } from "@/components/ui/button";
import TailorMyTripButton from "@/components/TailorMyTripButton";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface HeroProps {
  backgroundImages?: string[];
}

export default function Hero({ backgroundImages }: HeroProps) {
  const t = useTranslations("Tailor.Hero");
  const [currentSlide, setCurrentSlide] = useState(0);
  const images =
    backgroundImages && backgroundImages.length > 0
      ? backgroundImages
      : ["/news/image3.jpg"];

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[calc(100vh-64px)] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              unoptimized
              src={image}
              alt="Tailor-made wildlife experiences"
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center pointer-events-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-auto">
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

      {images.length > 1 && (
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3 pointer-events-auto">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === index
                  ? "w-12 bg-branding-orange"
                  : "w-2.5 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
