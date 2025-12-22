import type React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface MapLocation {
  name: string;
  lat: number;
  lng: number;
}

interface TripMapProps {
  locations: MapLocation[];
  mapImageUrl?: string;
}

export default function TripMap({ locations, mapImageUrl }: TripMapProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-[#192B28]">Map</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Map Image/Iframe */}
        <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
          {mapImageUrl ? (
            <Image
              src={mapImageUrl}
              alt="Trip location map"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <p>Map placeholder</p>
            </div>
          )}
        </div>

        {/* Locations List */}
        <div className="space-y-2">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-1 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <MapPin
                className="w-5 h-5 text-red-500 flex-shrink-0"
                fill="currentColor"
              />
              <span className="text-sm md:text-base text-[#192B28] font-[Inter]">
                {location.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
