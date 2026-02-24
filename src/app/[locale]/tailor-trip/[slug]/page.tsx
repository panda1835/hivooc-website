import Hero from "@/components/tailor-trip/Hero";
import Introduction from "@/components/tailor-trip/Introduction";
import Support from "@/components/home/Support";
import ContributeToConservation from "@/components/short-trip/ContributeToConservation";
import ShortTrips from "@/components/home/ShortTrips";
import { getTranslations } from "next-intl/server";
import { type ShortTrip } from "@/components/home/ShortTrips";
import TripDetails from "@/components/tailor-trip/TripDetails";
import { type TripDetailsData } from "@/components/short-trip/TripDetails";
import Testimonials from "@/components/tailor/Testimonials";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";

export default async function ShortTripPage() {
  const t = await getTranslations();
  const tripDetailsData: TripDetailsData = {
    overview: {
      items: [
        {
          title: "START-FINISH",
          info: "Ha Noi - Ho Chi Minh",
          subtitle: "",
        },
        {
          title: "Schedule",
          info: "Max 6 paxs",
          subtitle: "",
        },
        {
          title: "GROUP SIZE",
          info: "4 years old",
          subtitle: "",
        },
        {
          title: "TRANSPORTATION",
          info: "Car",
          subtitle: "",
        },
        {
          title: "GUIDE",
          info: "Conservation/ English",
          subtitle: "",
        },
      ],
      description:
        "This experience is designed for those who are truly passionate, patient, and seeking a deep connection with the wild.",
    },
    highlights: {
      description:
        "Join us on a unique journey to observe and photograph wild primates in their natural habitats, from lush tropical forests to dramatic limestone mountains. This is your chance to:",
      items: [
        "Encounter rare and endemic species such as the Red-shanked douc, pygmy loris, Hatinh langur, and more",
        "Learn ethical wildlife photography techniques that respect animal behavior and habitat",
        "Connect with conservationists, rangers, and local communities protecting these species",
        "Share powerful stories of conservation through your lens and voice",
        "Observing the Red-shanked douc langurs with supports from local trackers.",
        "Experience the feeling of seeing the colorful details on the DOUC's beauty up close through high-end equipment.",
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
    notAllowed: [],
    itinerarySections: [
      {
        title: "Day 1: Hanoi Arrival",
        contentHtml:
          "<p>Welcome to Vietnam! We'll meet and welcome by Noi Bai Airport, Hanoi Capital. You will be transferred to the hotel, with the rest of the day at leisure. We will have a welcome dinner in the evening.</p>",
      },
      {
        title: "Day 2: Hanoi Capital – Van Long Nature Reserve",
        contentHtml:
          "<p>Today we will make an early start from your hotel at Hanoi Capital to Van Long Nature Reserve, located in Ninh Binh Province. This area is the largest wetland nature reserve in northern Vietnam. We will arrive in time to begin our exploration of this beautiful wetland.</p><ul><li>Including a presentation about overview of Son Tra's biodiversity and drive by JEEP to reach the first peak of the mountain</li><li>The route to Son Tra Peak is approximately 30-45 minutes depending on traffic and road conditions</li><li>The route to Son Tra Peak is highly scenic. As you ascend the mountain, you'll pass through lush forests, and as you get higher, you'll start seeing panoramic views of Da Nang City and the coastline. This twisting journey will make the ride even more adventurous</li><li>The Jeep will stop and park by our local tracker if he can find family of colorful Red-shanked Doucs</li></ul>",
      },
      {
        title: "Day 3: Van Long Nature Reserve",
        contentHtml:
          "<p>We will have a full day to explore Van Long Nature Reserve, the largest wetland nature reserve in northern Vietnam. We will have a full day to explore Van Long Nature Reserve, the largest wetland nature reserve in northern Vietnam.</p>",
      },
      {
        title: "Day 4: Van Long Nature Reserve – Cat Ba Island (Hai Phong)",
        contentHtml:
          "<p>After getting our main target in Van Long Nature Reserve, we will depart this beautiful place and drive to Cat Ba Island (Hai Phong), the biggest island in the whole of Halong Bay. It’s approximately 150 kilometers from Hanoi Capital, a trip which takes up to 2 hour to travel by car and 1 hour travel by speedboat. We will arrive in time to begin our exploration of this beautiful and unique Island.</p>",
      },
      {
        title: "Day 5: Cat Ba Island (Hai Phong)",
        contentHtml:
          "<p>We will have a full day to look for one of the top 25 most endangered primates in the world “Cat Ba Langur”, also called “Golden-headed Langur”. This species is endemic to Vietnam and only found on Cat Ba Island.</p>",
      },
      {
        title: "Day 6-7: Tuyen Hoa Nature Reserve (Quang Binh province)",
        contentHtml:
          "<p>We will have a full day to look for one of the top 25 most endangered primates in the world “Cat Ba Langur”, also called “Golden-headed Langur”. This species is endemic to Vietnam and only found on Cat Ba Island.</p>",
      },
    ],
    additionalInfoSections: [
      {
        title: "Physical difficulty",
        contentHtml:
          "<p>Mostly easy walking along tracks, roads, and trails, but there will be a few inclined sections in the mountains.</p>",
      },
      {
        title: "Common wildlife for observation",
        contentHtml:
          "<p>Broadleaved evergreen forest, Evergreen forest, Secondary forest, Dry dipterocarp forest, Wetland, Rice field, Mountain forest, Pine forest, Bamboo forest, Shoreline.</p>",
      },
      {
        title: "Accommodation",
        contentHtml:
          "<p>Comfortable hotel and Guesthouse at the Parks. All accommodations have hot water, free Wi-Fi and most have air-conditioning.</p>",
      },
      {
        title: "Key target primates and mammals",
        contentHtml:
          '<p>We will have a full day to look for one of the top 25 most endangered primates in the world "Cat Ba Langur", also called "Golden-headed Langur". This species is endemic to Vietnam and only found on Cat Ba Island.</p>',
      },
      {
        title: "Key target birds",
        contentHtml:
          '<p>We will have a full day to look for one of the top 25 most endangered primates in the world "Cat Ba Langur", also called "Golden-headed Langur". This species is endemic to Vietnam and only found on Cat Ba Island.</p>',
      },
      {
        title: "Key nature and historical places",
        contentHtml:
          '<p>We will have a full day to look for one of the top 25 most endangered primates in the world "Cat Ba Langur", also called "Golden-headed Langur". This species is endemic to Vietnam and only found on Cat Ba Island.</p>',
      },
      {
        title: "Culture and community’s involvements",
        contentHtml:
          '<p>We will have a full day to look for one of the top 25 most endangered primates in the world "Cat Ba Langur", also called "Golden-headed Langur". This species is endemic to Vietnam and only found on Cat Ba Island.</p>',
      },
      {
        title: "Contributions for Conservation",
        contentHtml:
          '<p>We will have a full day to look for one of the top 25 most endangered primates in the world "Cat Ba Langur", also called "Golden-headed Langur". This species is endemic to Vietnam and only found on Cat Ba Island.</p>',
      },
    ],
    policySections: [
      {
        title: "Cancellation policy",
        contentHtml:
          "<ul><li>Full refund: You can cancel at least 24 hours before the experience's start time.</li><li>If you cancel less than 24 hours before the experience's start time, the amount you paid will not be refunded.</li><li>All cancellation requests made less than 24 hours from the experience's start time will not be accepted.</li><li>Cut-off times are based on the experience's local time.</li></ul>",
      },
      {
        title: "Children policy",
        contentHtml:
          "<ul><li>Children under 3: free of charge (sharing meals with parents)</li><li>4-9 year-old children: 50% of the full adult price, including meals</li><li>10-year-old children: 80% of the full adult price, including meals</li><li>Above 16-year-old: full price, including meals.</li></ul>",
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
        subtitleTop="Tailor example itineraries - Vietnam primates"
        title="15 Days | Vietnam Primate Photography Tour"
        subtitleBottom="Cat Ba → Cat Tien → Cuc Phuong → Tam My Tay → Van Long"
      />
      <div className="mt-10">
        <Introduction
          title="Tracking Primates – Capturing the Wild Beauty of Vietnam"
          description="Are you a photographer in search of rare, untamed moments in nature? Or a nature enthusiast eager to understand Vietnam’s endangered primates more deeply?"
        />
      </div>

      <TripDetails tripData={tripDetailsData} />
      <div className="px-8 mb-10 rounded-lg">
        <Testimonials />
      </div>
      <ContributeToConservation />
      <TailorMadeTrips
      // title={t("ShortTrips.relatedShortTrip")}
      // description={t("ShortTrips.description")}
      // trips={customTripsArray}
      />
      <Support />
    </main>
  );
}
