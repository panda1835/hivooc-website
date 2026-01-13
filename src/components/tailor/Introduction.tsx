"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function Introduction() {
  const t = useTranslations("Tailor.Introduction");
  const videoRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPlay(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-[#F5F0E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-6 text-[#00342B]">
            {t("title")}
          </h2>
          <p className="text-[#00342B] mb-6 leading-relaxed">
            {t("description")}
          </p>
          <div
            ref={videoRef}
            className="w-full aspect-[16/10] rounded-lg overflow-hidden shadow-md mt-8"
          >
            {shouldPlay && (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/BglCfkf9fqk?autoplay=1&mute=1&modestbranding=1&rel=0"
                title="HIVOOC Tailor-Made Wildlife Experiences"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
            {!shouldPlay && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 bg-branding-orange rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
