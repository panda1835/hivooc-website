"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImageProps {
  images: string[];
  initialIndex?: number;
  className?: string;
  imageClassName?: string;
  alt?: string;
}

export default function GalleryImage({
  images,
  initialIndex = 0,
  className = "",
  imageClassName = "",
  alt = "Gallery image",
}: GalleryImageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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
        selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  return (
    <>
      {/* Thumbnail Image */}
      <div
        onClick={() => openFullscreen(initialIndex)}
        className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      >
        <Image
          unoptimized
          src={images[initialIndex]}
          alt={alt}
          fill
          className={`object-cover ${imageClassName}`}
        />
      </div>

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
          {images.length > 1 && (
            <button
              onClick={goToPrevious}
              className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={goToNext}
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Fullscreen Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-4 md:p-8">
            <div className="relative w-full h-full rounded-[4px] overflow-hidden">
              <Image
                unoptimized
                src={images[selectedImageIndex]}
                alt="Fullscreen gallery image"
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
