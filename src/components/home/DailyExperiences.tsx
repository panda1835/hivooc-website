"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface TimeSlot {
  label: string;
  time: string;
}

interface DailyExperience {
  id: number;
  tourType: string;
  title: string;
  availabilityNotice: string;
  description: string;
  image: string;
  link: string;
  timeSlots: TimeSlot[];
}

export default function DailyExperiences() {
  const t = useTranslations("DailyExperiences");

  // Sample daily experience data - replace with actual data from CMS or API
  const experiences: DailyExperience[] = [
    {
      id: 1,
      tourType: "SHARED TOUR · FULL DAY",
      title: "Exploring Nature & Beauties of Son Tra - Ba Na",
      availabilityNotice: "ONLY 10 SLOTS PER DAY",
      description:
        "You will experience 2 of Da Nang's most amazing destinations: Ba Na and Son Tra. See many species of wildlife, including the iconic Red-shanked douc langur or 'The Queens of Primates'.",
      image: "/daily-experience/image1.png",
      link: "/experiences/son-tra-ba-na",
      timeSlots: [
        {
          label: "FULL DAY",
          time: "6 AM - 6:30 PM",
        },
      ],
    },
    {
      id: 2,
      tourType: "SHARED TOUR · FULL DAY",
      title: "Exploring Nature & Red-shanked Douc Langur in Son Tra Monkey Mountain",
      availabilityNotice: "ONLY 10 SLOTS PER DAY",
      description:
        "Our Share tours take place every day and guarantee the best quality of service for you. We will bring you satisfaction and comfort like your own family.",
      image: "/daily-experience/image2.jpg",
      link: "/experiences/son-tra-monkey-mountain",
      timeSlots: [
        {
          label: "MORNING",
          time: "5 AM - 11 AM",
        },
        {
          label: "AFTERNOON",
          time: "1:30 PM - 7:30 PM",
        },
      ],
    },
    {
      id: 3,
      tourType: "SHARED TOUR · FULL DAY",
      title: "Exploring Nature Son Tra - Hai Van Quan Nam O Fish Sauce Village",
      availabilityNotice: "ONLY 10 SLOTS PER DAY",
      description:
        "Our Share tours take place every day and guarantee the best quality of service for you. We will bring you satisfaction and comfort like your own family.",
      image: "/daily-experience/image3.jpg",
      link: "/experiences/son-tra-hai-van",
      timeSlots: [
        {
          label: "MORNING",
          time: "5 AM - 11 AM",
        },
        {
          label: "AFTERNOON",
          time: "1:30 PM - 7:30 PM",
        },
      ],
    },
  ];

  return (
    <section className="w-full pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-gray-100">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 md:mb-12">
          <div className="mb-6 md:mb-0 max-w-6xl">
            <h2 className="text-branding-green leading-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-branding-green/70 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* View More Link */}
          <a
            href="/daily-experiences"
            className="inline-flex items-center gap-2 text-branding-green hover:text-branding-green/80 transition-colors group"
          >
            <span className="font-medium">{t("viewMore")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="group flex flex-col bg-white rounded-[4px] overflow-hidden border hover:shadow-lg transition-shadow"
            >
              {/* Experience Image */}
              <div className="relative aspect-[4/3] bg-branding-green/10 overflow-hidden">
                {/* Placeholder gradient - replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-branding-green/20 to-branding-green/5" />

                {/* Uncomment when you have real images */}
                <Image
                  unoptimized
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Experience Info */}
              <div className="flex flex-col flex-grow p-6">
                {/* Tour Type Tag */}
                <p className="text-xs font-medium text-[#5A7363] uppercase tracking-wider mb-3">
                  {experience.tourType}
                </p>

                {/* Title */}
                <h3 className="text-[#1A4D2E] mb-3 line-clamp-2">
                  {experience.title}
                </h3>

                {/* Availability Notice */}
                <p className="text-sm font-bold text-branding-orange uppercase tracking-wider mb-3">
                  {experience.availabilityNotice}
                </p>

                {/* Description */}
                <p className="text-[#00342B]  leading-relaxed mb-6 flex-grow line-clamp-4">
                  {experience.description}
                </p>

                {/* Explore Button */}
                <Button
                  variant="outline"
                  className="w-full mb-4"
                  asChild
                >
                  <a href={experience.link}>
                    {t("explore")}
                  </a>
                </Button>

                {/* Time Slots */}
                <div
                  className={`grid ${
                    experience.timeSlots.length === 1
                      ? "grid-cols-1"
                      : "grid-cols-2"
                  } gap-4 pt-4 border-t border-gray-100`}
                >
                  {experience.timeSlots.map((slot, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs text-[#5A7363] uppercase tracking-wider mb-1">
                        {slot.label}
                      </p>
                      <p className=" font-medium text-branding-green">
                        {slot.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
