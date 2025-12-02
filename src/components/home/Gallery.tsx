"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Gallery() {
  const t = useTranslations("Gallery");

  // Real gallery images from public/gallery folder
  const galleryImages = [
    "/gallery/image1.jpg",
    "/gallery/image2.png",
    "/gallery/image3.jpg",
    "/gallery/image4.jpg",
    "/gallery/image5.JPG",
    "/gallery/image6.jpg",
    "/gallery/image7.JPG",
    "/gallery/image8.jpg",
    "/gallery/image9.JPG",
    "/gallery/image10.png",
    "/gallery/image11.png",
    "/gallery/image12.png",
    "/gallery/image13.jpg",
    "/gallery/image14.jpg",
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 md:mb-12">
          <div className="mb-6 md:mb-0 max-w-2xl">
            <h2 className="text-branding-green leading-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-branding-green/70 leading-relaxed">
              {t("description")}
            </p>
          </div>
          
          {/* View More Link */}
          <a
            href="#"
            className="inline-flex items-center gap-2 text-branding-green hover:text-branding-green/80 transition-colors group"
          >
            <span className="font-medium">{t("viewMore")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square bg-branding-green/10 rounded-[4px] overflow-hidden group cursor-pointer"
            >
              {/* Placeholder for actual images */}
              <div className="absolute inset-0 bg-gradient-to-br from-branding-green/20 to-branding-green/5" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-branding-green/0 group-hover:bg-branding-green/20 transition-colors duration-300" />
              
              {/* You can replace this with actual Image component when you have real images */}
              <Image
              unoptimized
                src={image}
                alt={`Wildlife photo ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
