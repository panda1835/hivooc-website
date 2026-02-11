"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SpeciesHeroProps {
  title: string;
  subtitle: string;
  collageImages?: string[];
  backgroundImages?: string[];
}

export default function SpeciesHero({
  title,
  subtitle,
  collageImages,
  backgroundImages,
}: SpeciesHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!backgroundImages || backgroundImages.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (backgroundImages && backgroundImages.length > 0) {
    return (
      <section className="relative w-full h-[340px] md:h-[calc(100vh-64px)] overflow-hidden">
        <div className="relative w-full h-full">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                unoptimized
                src={image}
                alt={`Hero slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-7xl text-center text-white">
            <h1 className="text-white drop-shadow-md">{title}</h1>
            <p className="max-w-6xl mt-4 text-lg md:text-xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {backgroundImages.length > 1 && (
          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3">
            {backgroundImages.map((_, index) => (
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

  return (
    <section className="relative w-full h-[340px] md:h-[calc(100vh-64px)] overflow-hidden">
      <div className="grid h-full grid-cols-2 sm:grid-cols-3 grid-rows-2">
        {(collageImages ?? []).map((image, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              unoptimized
              src={image}
              alt={`Wildlife collage image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-7xl text-center text-white">
          <h1 className="text-white drop-shadow-md">{title}</h1>
          <p className="max-w-6xl mt-4 text-lg md:text-xl text-white/90 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
