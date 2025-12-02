"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Gallery() {
  const t = useTranslations("Gallery");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  const openFullscreen = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeFullscreen = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === galleryImages.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  return (
    <>
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                onClick={() => openFullscreen(index)}
                className="relative aspect-square bg-branding-green/10 rounded-[4px] overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
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

      {/* Fullscreen Image Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed rounded-[4px] inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xl"
          onClick={closeFullscreen}
        >
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="cursor-pointer absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Fullscreen Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-4 md:p-8">
            <div className="relative w-full h-full rounded-[4px] overflow-hidden">
              <Image
                unoptimized
                src={galleryImages[selectedImageIndex]}
                alt="Fullscreen wildlife photo"
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
