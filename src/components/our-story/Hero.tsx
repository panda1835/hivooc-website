"use client";

import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundAlt?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage = "/hero/image3.jpg",
  backgroundAlt = "Hero Background",
}: HeroProps) {
  return (
    <section className="relative w-full h-[600px] md:h-[calc(100vh-64px)] overflow-hidden">
      {/* Background Image */}
      <Image
        unoptimized
        src={backgroundImage}
        alt={backgroundAlt}
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
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            {title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
