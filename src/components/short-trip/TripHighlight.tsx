"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useState } from "react";

interface TripHighlightProps {
  highlights: {
    description: string;
    items: string[];
    highlightImages: string[];
  };
}

export default function TripHighlight({ highlights }: TripHighlightProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const images = highlights.highlightImages;
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const expandGallery = () => {
    setIsExpanded(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-[#192B28]">Highlight</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Highlights List */}
        <div className="space-y-3">
          <p className="md:text-base text-black font-[Inter] leading-relaxed">
            {highlights.description}
          </p>
          {highlights.items.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              <svg
                width="20"
                height="28"
                viewBox="0 0 20 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8"
              >
                <path
                  d="M10.3333 18.8084L15.4833 21.9167L14.1167 16.0584L18.6667 12.1167L12.675 11.6L10.3333 6.08337L7.99167 11.6L2 12.1167L6.54167 16.0584L5.18333 21.9167L10.3333 18.8084Z"
                  fill="#192B28"
                />
              </svg>

              <p className="text-sm md:text-base text-[#192B28]">{highlight}</p>
            </div>
          ))}
        </div>

        {/* Image Carousel */}
        {images.length > 0 && (
          <>
            <div className="relative aspect-auto rounded-lg overflow-hidden bg-gray-100 group">
              <Image
                src={images[currentImageIndex]}
                alt={`Highlight ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-transform duration-300"
              />

              {/* Expand Button */}
              <button
                onClick={expandGallery}
                className="absolute cursor-pointer top-4 right-4 z-10 bg-white hover:scale-110 rounded-[4px] p-1 shadow-lg transition-all duration-300"
                aria-label="Expand image"
              >
                <Maximize2 className="w-4 h-4 text-gray-800" />
              </button>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Fullscreen Gallery Modal */}
            {isExpanded && (
              <ExpandedGallery
                images={images}
                initialIndex={currentImageIndex}
                onClose={() => setIsExpanded(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Expanded Gallery Component
interface ExpandedGalleryProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

function ExpandedGallery({
  images,
  initialIndex,
  onClose,
}: ExpandedGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
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
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={images[currentIndex]}
            alt="Fullscreen highlight image"
            fill
            className="object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
