"use client";

import type React from "react";
import { useState } from "react";
import TripOverview from "./TripOverview";
import TripHighlight from "./TripHighlight";
import TripMap from "./TripMap";
import IncludedExcluded from "./IncludedExcluded";
import TripItinerary from "./TripItinerary";
import TripPolicies from "./TripPolicies";
import TripPhotos from "./TripPhotos";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

type TabType = "overview" | "photos";

export default function TripDetails() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const t = useTranslations("ShortTrips");
  /* ---------------------------- COPY PROTECTION ---------------------------- */
  const handleCopy = (e: React.ClipboardEvent) => e.preventDefault();
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const handleDragStart = (e: React.DragEvent) => e.preventDefault();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const isMac =
      typeof navigator !== "undefined" &&
      navigator.platform.toLowerCase().includes("mac");

    const isCopyCombo =
      (isMac && event.metaKey && event.key.toLowerCase() === "c") ||
      (!isMac && event.ctrlKey && event.key.toLowerCase() === "c");

    if (isCopyCombo) event.preventDefault();
  };

  // Sample data - replace with actual data from props or API
  const tripData = {
    overview: {
      location: "Son Tra Peninsula, Da Nang",
      locationSubtitle: "Protected Primate Habitat",
      duration: "Half-Day (3 hours)",
      durationSubtitle: "Ideal for sighting",
      ages: "4 years old",
      agesSubtitle: "Protected Primate Habitat",
      guide: "Tour Guide",
      guideSubtitle: "1 speaking Eng, 1 speaking Viet",
      description:
        "All these stops are favourite perfect places for memorial photos. Our guides have been trained in the field of photography and always carry good gear for great shots. Don't hesitate to ask our Guides to help you capture artistic and cinematic photos, preserving magical moments of your journey.",
    },
    highlights: [
      "Admire the beauty of Son Tra at famous and beautiful view points",
      "Reach the foot of the mountain to the top of the Mountain",
      "Enjoy the full feeling of nature with Jeep",
      "Multiple stops and capture memorial pictures with professional cameras",
      "Learning about biodiversity of the Son Tra Mountain",
      "Observing the Red-shanked douc langers with supports from local trackers",
      "Experience the feeling of seeing the colorful details on the DOUCS beauty up close through high end equipment",
      "Potential to capture photos with supports from our guide and local trackers",
    ],
    highlightImages: [
      "/short-trip/image1.jpg",
      "/short-trip/image3.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image3.jpg",
    ],
    mapLocations: [
      { name: "Son Tra Peninsular", lat: 16.1, lng: 108.3 },
      { name: "Son Tra Peninsular", lat: 16.1, lng: 108.3 },
      { name: "Son Tra Peninsular", lat: 16.1, lng: 108.3 },
      { name: "Son Tra Peninsular", lat: 16.1, lng: 108.3 },
      { name: "Son Tra Peninsular", lat: 16.1, lng: 108.3 },
      { name: "Son Tra Peninsular", lat: 16.1, lng: 108.3 },
      { name: "Son Tra Peninsular", lat: 16.1, lng: 108.3 },
      { name: "Son Tra Peninsular", lat: 16.1, lng: 108.3 },
      { name: "Son Tra Peninsular", lat: 16.1, lng: 108.3 },
    ],
    included: [
      "US JEEP Car (All fuels and parking fee, with a slow and experienced driver)",
      "One unit of adventure break (mineral fresh water, Vietnamese coffee or a type of fruit juice, 01 refreshing snack)",
      "A special HIVOOCS gift per pax",
      "High-end binoculars and spotting scope with tripod",
      "Photography service with digital camera",
      "01 wildlife expert guide speaking English",
      "01 local tracker with his motorbike",
      "VAT and Red Invoice (It is required)",
    ],
    excluded: [
      "Tips (It is not required at all-HIVOOCS tours)",
      "Personal expenses",
      "Surcharge for Lunar new year/ National Holiday",
      "Additional service which is required by customers (ex. Paragliding experiences, picnic tee with snack for sunset enjoyment, picnic lunch or dinner)",
    ],
    itineraryNote:
      "Flexible between 7:00 - 8:00 AM for morning tour and 14:30 - 15:30 for the afternoon tour.",
    itineraryItems: [
      {
        time: "7:00 - 8:00",
        title:
          "Meeting up at HIVOOCS office - K39/21 Thanh Vinh 1, Tho Quang, Da Nang",
        description: "Start your day with a warm welcome at our office.",
      },
      {
        time: "8:00 - 9:00",
        title: "Greetings and briefing for Red-shanked Doucs",
        description:
          "Greetings and briefing for Red-shanked Doucs, including a presentation about overview of Son Tra's biodiversity and drive by JEEP to reach the first peak of the mountain.",
        subItems: [
          "Including a presentation about overview of Son Tra's biodiversity and drive by JEEP to reach the first peak of the mountain",
          "The route to Son Tra Peak is approximately 30-45 minutes depending on traffic and road conditions",
          "The route to Son Tra Peak is highly scenic. As you ascend the mountain, you'll pass through lush forests, and as you get higher, you'll start seeing panoramic views of Da Nang City and the coastline. This twisting journey will make the ride even more adventurous",
          "The Jeep will stop and park by our local tracker if he can find family of colorful Red-shanked Doucs",
        ],
        images: ["/short-trip/itinerary1.jpg", "/short-trip/itinerary2.jpg"],
      },
      {
        time: "9:00 - 9:20",
        title: "1st stop: Vong Canh Check-Point and Son Tra Radar Station",
      },
      {
        time: "9:20 - 9:40",
        title: "2nd stop: Son Tra Airport",
      },
      {
        time: "9:40 - 10:25",
        title: "3rd stop: to conquer Ban Co Peak and Paragliding Station",
      },
    ],
    additionalInfo: [
      "Overnight in our office is designed for wheelchair accessibility. If you request for it, we'll be happy to help. Just call the number xxxx",
      "We have pickup and drop off service with surcharge depending on distance from your hotel to our office. It always available upon on your request",
      "Destinations will be received at time of booking",
      "Most travelers can participate",
      "This is a private tour/activity. Only your group will participate",
    ],
    reserveNote:
      "After this step, our consultants will contact your directly via email to confirm it via email.",
    cancellationPolicy: {
      title: "Cancellation policy",
      items: [
        "Full refund: You can cancel at least 24 hours before the experience's start time.",
        "If you cancel less than 24 hours before the experience's start time, the amount you paid will not be refunded.",
        "All cancellation requests take less than 24 hours from the experience's start time will not be accepted.",
        "Cut-off times are based on the experience's local time.",
      ],
    },
    depositPolicy: {
      title: "Deposit policy",
      items: [
        "We always request 25% of deposits to secure your booking. Your reservation will be confirmed after deposit is confirmed. Please confirm it via email.",
      ],
    },
    kidsPolicy: {
      title: "Kid's policy",
      items: [
        "Children under 3: Free of Charge (sharing meals with parents)",
        "4-9 year-old children: 50% of full adults prices, including meals",
        "10-year-old children: 80% of full adults prices, including meals",
        "Above 16-year-old: Full of charge, including meals.",
      ],
    },
    photos: [
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
      "/short-trip/image1.jpg",
    ],
  };

  return (
    <main
    // tabIndex={0}
    // onCopy={handleCopy}
    // onContextMenu={handleContextMenu}
    // onKeyDown={handleKeyDown}
    // className="min-h-screen bg-white text-slate-900"
    // style={{
    //   userSelect: "none",
    //   WebkitUserSelect: "none",
    //   MozUserSelect: "none",
    //   msUserSelect: "none",
    // }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 px-2 cursor-pointer font-medium transition-colors relative ${
                activeTab === "overview"
                  ? "text-[#1A4D2E]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex gap-2 items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_171_6727)">
                    <path
                      d="M18.5913 11.5166L16.4246 6.10829C16.4052 6.05472 16.3739 6.00627 16.3329 5.96662L15.1496 4.78329L13.9329 1.53329C13.909 1.47764 13.8751 1.42682 13.8329 1.38329C13.4016 1.01958 12.8555 0.820101 12.2913 0.820101C11.727 0.820101 11.181 1.01958 10.7496 1.38329C10.6711 1.46022 10.6262 1.56505 10.6246 1.67496V5.83329H9.37461V1.66662C9.37304 1.55672 9.32811 1.45189 9.24961 1.37496C8.81824 1.01125 8.27217 0.811768 7.70794 0.811768C7.14371 0.811768 6.59764 1.01125 6.16627 1.37496C6.12413 1.41848 6.09024 1.46931 6.06627 1.52496L4.84961 4.78329L3.66627 5.96662C3.62535 6.00627 3.594 6.05472 3.57461 6.10829L1.40794 11.5166C0.909596 12.0671 0.552736 12.7306 0.368175 13.4499C0.183614 14.1691 0.1769 14.9225 0.348611 15.6449C0.520323 16.3674 0.865299 17.0371 1.35375 17.5964C1.8422 18.1557 2.45945 18.5877 3.1522 18.8551C3.84494 19.1225 4.59235 19.2172 5.32991 19.1312C6.06746 19.0451 6.77297 18.7808 7.38553 18.3611C7.99809 17.9414 8.49928 17.3789 8.84583 16.7221C9.19237 16.0654 9.37386 15.3342 9.37461 14.5916V9.99996C9.51336 9.99127 9.65252 9.99127 9.79127 9.99996C10.0713 9.99722 10.3507 10.0252 10.6246 10.0833V14.6333C10.6219 15.379 10.8011 16.1141 11.1468 16.7749C11.4925 17.4357 11.9942 18.0021 12.6084 18.425C13.2226 18.848 13.9307 19.1147 14.6713 19.202C15.4119 19.2893 16.1626 19.1946 16.8583 18.9261C17.554 18.6575 18.1737 18.2233 18.6636 17.661C19.1535 17.0988 19.4988 16.4255 19.6695 15.6996C19.8402 14.9737 19.8313 14.217 19.6434 13.4954C19.4555 12.7737 19.0943 12.1088 18.5913 11.5583V11.5166ZM7.70794 14.5916C7.70629 15.1681 7.53384 15.7312 7.21235 16.2098C6.89086 16.6883 6.43477 17.0608 5.90167 17.2803C5.36858 17.4998 4.7824 17.5564 4.21717 17.4429C3.65194 17.3294 3.13302 17.051 2.72595 16.6427C2.31888 16.2345 2.04192 15.7148 1.93006 15.1492C1.81819 14.5837 1.87643 13.9977 2.09743 13.4652C2.31843 12.9327 2.69227 12.4777 3.17173 12.1576C3.65119 11.8375 4.21477 11.6666 4.79127 11.6666C5.175 11.6666 5.55495 11.7423 5.90936 11.8894C6.26377 12.0365 6.58567 12.2521 6.85662 12.5238C7.12757 12.7956 7.34223 13.1181 7.48832 13.4729C7.6344 13.8277 7.70904 14.2079 7.70794 14.5916ZM15.2079 17.5083C14.6311 17.5083 14.0672 17.3372 13.5875 17.0167C13.1079 16.6963 12.734 16.2407 12.5133 15.7078C12.2925 15.1748 12.2348 14.5884 12.3473 14.0226C12.4599 13.4568 12.7376 12.9371 13.1455 12.5292C13.5534 12.1213 14.0732 11.8435 14.6389 11.731C15.2047 11.6185 15.7912 11.6762 16.3241 11.897C16.8571 12.1177 17.3126 12.4916 17.6331 12.9712C17.9535 13.4509 18.1246 14.0148 18.1246 14.5916C18.1224 15.3637 17.8141 16.1035 17.2674 16.6486C16.7207 17.1938 15.98 17.5 15.2079 17.5V17.5083Z"
                      fill={activeTab === "overview" ? "#1A4D2E" : "#666666"}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_171_6727">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                OVERVIEW
              </div>

              {activeTab === "overview" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-branding-green" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`pb-4 px-2 cursor-pointer font-medium transition-colors relative ${
                activeTab === "photos"
                  ? "text-[#1A4D2E]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex gap-2 items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.08333 11.25L9.16667 13.75L12.0833 10L15.8333 15H4.16667M17.5 15.8333V4.16667C17.5 3.72464 17.3244 3.30072 17.0118 2.98816C16.6993 2.67559 16.2754 2.5 15.8333 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333Z"
                    fill={activeTab === "photos" ? "#1A4D2E" : "#666666"}
                  />
                </svg>
                PHOTOS
              </div>

              {activeTab === "photos" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-branding-green" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {activeTab === "overview" ? (
            <>
              {/* Overview Section */}
              <TripOverview {...tripData.overview} />

              {/* Highlight Section */}
              <TripHighlight
                highlights={tripData.highlights}
                images={tripData.highlightImages}
              />

              {/* Map Section */}
              <TripMap locations={tripData.mapLocations} />

              {/* Included/Excluded Section */}
              <IncludedExcluded
                included={tripData.included}
                excluded={tripData.excluded}
              />

              {/* Itinerary Section */}
              <TripItinerary
                note={tripData.itineraryNote}
                items={tripData.itineraryItems}
              />

              {/* Policies Section */}
              <TripPolicies
                additionalInfo={tripData.additionalInfo}
                reserveNote={tripData.reserveNote}
                cancellationPolicy={tripData.cancellationPolicy}
                depositPolicy={tripData.depositPolicy}
                kidsPolicy={tripData.kidsPolicy}
              />

              <div className="flex justify-center gap-2 mt-6">
                <Button variant="outline" size="lg" className="bg-transparent">
                  {t("bookThisTrip")}
                </Button>
                <Button
                  variant="orange"
                  size="lg"
                  className="group font-sans cursor-pointer"
                >
                  {t("tailorThisTrip")}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Photos Section */}
              <TripPhotos images={tripData.photos} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
