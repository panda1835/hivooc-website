"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

interface IntroductionProps {
  title: string;
  description: string;
}

export default function Introduction({
  title,
  description,
}: IntroductionProps) {
  const t = useTranslations("ShortTrips");
  return (
    <section className="w-full bg-[#F5F1E8] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Left Column - Title and Description */}
          <div className="space-y-4">
            <h2 className="text-[#00342B] text-[32px] font-medium leading-tight">
              {title}
            </h2>
            <p className="text-[#00342B] max-w-5xl leading-relaxed text-base md:text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
