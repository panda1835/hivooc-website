import Hero from "@/components/short-trip/Hero";
import Pricing from "@/components/short-trip/Pricing";
import Support from "@/components/home/Support";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import ShortTrips from "@/components/home/ShortTrips";
import { getTranslations } from "next-intl/server";
import { type ShortTrip } from "@/components/home/ShortTrips";
import TripDetails, {
  type TripDetailsData,
} from "@/components/short-trip/TripDetails";

export default async function ShortTripPage() {
  const t = await getTranslations();

  const tripDetailsData: TripDetailsData = {
    overview: {
      items: [
        {
          title: "Location",
          info: "Son Tra Peninsula, Da Nang",
          subtitle: "Protected Primate Habitat",
        },
        {
          title: "Duration",
          info: "Half-Day (3 hours)",
          subtitle: "Ideal for sighting",
        },
        {
          title: "Ages",
          info: "4 years old",
          subtitle: "Protected Primate Habitat",
        },
        {
          title: "Live Wildlife Expert Guide",
          info: "Tour Guide",
          subtitle: "1 speaking Eng, 1 speaking Viet",
        },
      ],
      description:
        "All these stops are favourite perfect places for memorial photos. Our guides have been trained in the field of photography and always carry good gear for great shots. Don't hesitate to ask our Guides to help you capture artistic and cinematic photos, preserving magical moments of your journey.",
    },
    highlights: {
      description: "",
      items: [
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
    },
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
      "One unit of adventure break (mineral fresh water, Vietnamese coffee or fruit juice, one refreshing snack)",
      "A special HIVOOCS gift per pax",
      "High-end binoculars and spotting scope with tripod",
      "Photography service with a digital camera",
      "One English-speaking wildlife expert guide",
      "01 local tracker with his motorbike",
      "VAT and red invoice (It is required)",
    ],
    excluded: [
      "Tips (not required on all HIVOOCS tours)",
      "Personal expenses",
      "Surcharge for Lunar New Year / national holidays",
      "Additional services requested by customers (ex. Paragliding experiences, picnic tea with snack for sunset enjoyment, picnic lunch or dinner)",
    ],
    itineraryNote:
      "Flexible between 7:00 - 8:00 AM for morning tour and 14:30 - 15:30 for the afternoon tour.",
    itineraryItems: [
      {
        title: "7:00 - 8:00",
        description:
          "Meeting up at HIVOOCS office - K39/21 Thanh Vinh 1, Tho Quang, Da Nang",
        detail: "Start your day with a warm welcome at our office.",
      },
      {
        title: "8:00 - 9:00",
        description: "Greetings and briefing for Red-shanked Doucs",
        detail:
          "Greetings and briefing for Red-shanked Doucs, including a presentation about overview of Son Tra's biodiversity and drive by JEEP to reach the first peak of the mountain.",
        subItems: [
          "Including a presentation about overview of Son Tra's biodiversity and drive by JEEP to reach the first peak of the mountain",
          "The route to Son Tra Peak is approximately 30-45 minutes depending on traffic and road conditions",
          "The route to Son Tra Peak is highly scenic. As you ascend the mountain, you'll pass through lush forests, and as you get higher, you'll start seeing panoramic views of Da Nang City and the coastline. This twisting journey will make the ride even more adventurous",
          "The Jeep will stop and park by our local tracker if he can find family of colorful Red-shanked Doucs",
        ],
        images: ["/short-trip/image1.jpg", "/short-trip/image1.jpg"],
      },
      {
        title: "9:00 - 9:20",
        description:
          "1st stop: Vong Canh Check-Point and Son Tra Radar Station",
      },
      {
        title: "9:20 - 9:40",
        description: "2nd stop: Son Tra Airport",
      },
      {
        title: "9:40 - 10:25",
        description: "3rd stop: to conquer Ban Co Peak and Paragliding Station",
      },
    ],
    additionalInfo: [
      "Overnight stay in our office is designed for wheelchair accessibility. If you request it, we'll be happy to help. Just call the number xxxx",
      "We have pickup and drop-off service with a surcharge depending on distance from your hotel to our office. It is always available upon request",
      "Destinations will be confirmed at time of booking",
      "Most travelers can participate",
      "This is a private tour/activity. Only your group will participate",
    ],
    policies: [
      {
        title: "Reserve now and pay later",
        items: [
          "Please reserve your booking by following the page",
          "Fill in the required information to complete your booking",
          "After this step, our consultants will contact you directly via email to confirm it via email.",
        ],
      },
      {
        title: "Deposit policy",
        items: [
          "We always request a 25% deposit to secure your booking. Your reservation will be confirmed after the deposit is confirmed. Please confirm it via email.",
        ],
      },
      {
        title: "Cancellation policy",
        items: [
          "Full refund: You can cancel at least 24 hours before the experience's start time.",
          "If you cancel less than 24 hours before the experience's start time, the amount you paid will not be refunded.",
          "All cancellation requests made less than 24 hours from the experience's start time will not be accepted.",
          "Cut-off times are based on the experience's local time.",
        ],
      },
      {
        title: "Kids' policy",
        items: [
          "Children under 3: free of charge (sharing meals with parents)",
          "4-9 year-old children: 50% of the full adult price, including meals",
          "10-year-old children: 80% of the full adult price, including meals",
          "Above 16-year-old: full price, including meals.",
        ],
      },
    ],
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

  const customTripsArray: ShortTrip[] = [
    {
      id: 1,
      category: "PRE-MADE TRIP",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/short-trip/image1.jpg",
      link: "/short-trip/vietnam-primate-photography",
      bestTimeToTravel: "APR - JUN",
      tripLength: "16 DAYS",
    },
    {
      id: 2,
      category: "PRE-MADE TRIP",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/short-trip/image2.JPG",
      link: "/short-trip/vietnam-primate-photography-2",
      bestTimeToTravel: "APR - JUN",
      tripLength: "16 DAYS",
    },
    {
      id: 3,
      category: "PRE-MADE TRIP",
      title: "Vietnam Primate Photography",
      description:
        "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
      image: "/short-trip/image3.jpg",
      link: "/short-trip/vietnam-primate-photography-3",
      bestTimeToTravel: "APR - JUN",
      tripLength: "16 DAYS",
    },
  ];
  return (
    <main className="flex flex-col w-full">
      <Hero
        title="Wildlife Adventure by Jeep in Son Tra Peninsula"
        timeSlots={[
          { label: "MORNING", time: "5AM - 11 AM" },
          { label: "AFTERNOON", time: "1:30 PM - 7:30 PM" },
        ]}
      />
      <Pricing
        title="Exploring the majestic geography of Son Tra Peninsula"
        description="Exploring the majestic geography of Son Tra Peninsula and its wildlife on a JEEP is an amazing experience; giving you real sense of adventure. You'll take in the vast green forests and immense sea while breathing in the fresh air. Say Hi to a family of the colorful Red-shanked Douc highlights your day."
        pricingTiers={[
          { pax: "1 pax", price: 224 },
          { pax: "2 pax", price: 134 },
          { pax: "3 pax", price: 137 },
          { pax: "4 pax", price: 114 },
        ]}
      />

      <TripDetails tripData={tripDetailsData} />
      <ContributeToConservation />
      <ShortTrips
        title={t("ShortTrips.relatedShortTrip")}
        description={t("ShortTrips.description")}
        trips={customTripsArray}
      />
      <Support />
    </main>
  );
}
