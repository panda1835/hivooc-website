"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface ItineraryItem {
  time: string;
  title: string;
  description?: string;
  subItems?: string[];
  images?: string[];
}

interface TripItineraryProps {
  note: string;
  items: ItineraryItem[];
}

export default function TripItinerary({ note, items }: TripItineraryProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-[#192B28]">
        Sample Itineraries
      </h2>

      {/* Flexible timing note */}
      <div className="flex items-start gap-3 px-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0998 9.3L19.5998 6L15.4998 5.6C16.0998 6.1 16.5998 6.7 16.9998 7.5C17.2998 8.1 17.4998 8.6 17.6998 9.2C17.1998 9.1 16.5998 9 15.9998 9H15.5998C14.7998 7.2 13.0998 6 10.9998 6C8.1998 6 5.9998 8.2 5.9998 11C5.9998 13.1 7.1998 14.8 8.9998 15.6V16C8.9998 19.9 12.0998 23 15.9998 23C19.8998 23 22.9998 19.9 22.9998 16C22.9998 12.9 20.8998 10.2 18.0998 9.3ZM15.9998 21C13.1998 21 10.9998 18.8 10.9998 16C10.9998 13.2 13.1998 11 15.9998 11C18.7998 11 20.9998 13.2 20.9998 16C20.9998 18.8 18.7998 21 15.9998 21ZM16.4998 16.2L19.3998 17.9L18.5998 19.1L14.9998 17V12H16.4998V16.2ZM10.9998 4C10.1998 4 9.3998 4.2 8.5998 4.4L10.9998 1L13.3998 4.4C12.5998 4.2 11.7998 4 10.9998 4ZM4.8998 14.5C5.2998 15.2 5.8998 15.9 6.4998 16.4L2.3998 16L4.1998 12.2C4.2998 13 4.4998 13.8 4.8998 14.5ZM4.0998 9.8L2.2998 6L6.4998 5.7C5.8998 6.2 5.3998 6.8 4.8998 7.5C4.4998 8.2 4.1998 9 4.0998 9.8Z"
            fill="#00342B"
          />
        </svg>

        <p className="text-sm text-[#192B28] font-[Inter]">{note}</p>
      </div>

      {/* Itinerary Items */}
      <div className="">
        {items.map((item, index) => (
          <div key={index} className="border  border-gray-200 overflow-hidden">
            {/* Header */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full cursor-pointer flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-[#192B28]">
                  {item.time}
                </h3>
                <p className="text-sm text-[#192B28] font-[Inter] mt-1">
                  {item.title}
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedItems.has(index) ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Expanded Content */}
            {expandedItems.has(index) && (
              <div className="px-4 pb-4 bg-white border-t border-gray-100">
                <div className="pt-4 space-y-4">
                  {/* Description */}
                  {item.description && (
                    <p className="text-sm text-gray-700">{item.description}</p>
                  )}

                  {/* Sub Items */}
                  {item.subItems && item.subItems.length > 0 && (
                    <ul className="space-y-2 list-disc list-inside">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="text-sm text-gray-700">
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Images */}
                  {item.images && item.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {item.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative aspect-square rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`${item.title} ${imgIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
