"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const t = useTranslations("Tailor.Testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      textKey: "text",
      authorKey: "author",
    },
    {
      textKey: "text",
      authorKey: "author",
    },
    {
      textKey: "text",
      authorKey: "author",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="w-full py-16 md:py-24 bg-[#EFE9E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonial Carousel */}
        <div className="flex items-center justify-center gap-6 md:gap-12">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="flex-shrink-0 p-2 md:p-3 hover:bg-white/50 rounded-full transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-[#00342B]" />
          </button>

          {/* Testimonial Content */}
          <div className="flex-1 text-center">
            <p className="text-2xl md:text-3xl italic text-[#00342B] leading-relaxed mb-6 font-['Instrument Serif']">
              &quot;{t(current.textKey)}&quot;
            </p>
            <div>
              <p className="font-semibold text-[#00342B] text-lg mb-1 font-['Instrument Serif']">
                {t(current.authorKey)}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 p-2 md:p-3 hover:bg-white/50 rounded-full transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#00342B]" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-[#00342B]"
                  : "w-2 bg-[#00342B]/30 hover:bg-[#00342B]/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
