"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitleTop: string;
  subtitleBottom: string;
}

export default function Hero({
  title,
  subtitleTop,
  subtitleBottom,
}: HeroProps) {
  const t = useTranslations("Hero");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Number of slides
  const totalSlides = 3;

  // Background images for each slide
  const slideImages = [
    "/hero/image1.jpg",
    "/hero/image2.jpg",
    "/hero/image3.jpg",
  ];

  // Auto-play functionality - automatically scrolls
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
      {/* Carousel Slides */}
      <div className="relative w-full h-full">
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <Image
              unoptimized
              src={slideImages[index]}
              alt={`Hero slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content - Centered - Same text for all slides */}
            <div className="relative h-full flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-white mb-2 uppercase text-[20px] font-semibold">
                  {subtitleTop}
                </p>
                <h1 className="text-white text-[62px] mb-6 animate-fade-in-up">
                  {title}
                </h1>

                <p className="text-white text-[20px] font-medium">
                  {subtitleBottom}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {[...Array(totalSlides)].map((_, index) => (
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
    </section>
  );
}
