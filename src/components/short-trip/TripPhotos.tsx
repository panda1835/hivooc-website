"use client";

import type React from "react";
import GalleryImage from "@/components/GalleryImage";

interface TripPhotosProps {
  images: string[];
}

export default function TripPhotos({ images }: TripPhotosProps) {
  return (
    <div className="space-y-6">
      {/* Gallery Grid - Same structure as home Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square bg-branding-green/10 rounded-[4px] overflow-hidden group"
          >
            {/* Placeholder gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-branding-green/20 to-branding-green/5" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-branding-green/0 group-hover:bg-branding-green/20 transition-colors duration-300" />

            {/* Gallery Image with Modal */}
            <GalleryImage
              images={images}
              initialIndex={index}
              className="relative w-full h-full"
              alt={`Trip photo ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
